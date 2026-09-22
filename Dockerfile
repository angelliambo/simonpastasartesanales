# 1. Instalar dependencias del monorepo en la raíz con pnpm
FROM node:20-alpine AS base-dependencies
WORKDIR /app
RUN npm install -g pnpm@latest
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./
COPY packages/shared/package*.json ./packages/shared/
COPY packages/portal/package*.json ./packages/portal/
COPY packages/portal/backend/package*.json ./packages/portal/backend/
COPY packages/portal/frontend/package*.json ./packages/portal/frontend/
RUN pnpm install --frozen-lockfile

# 2. Compilar paquete compartido (@factory/shared)
FROM base-dependencies AS shared-builder
WORKDIR /app
COPY packages/shared ./packages/shared
RUN pnpm --filter @factory/shared build

# 3. Compilar backend
FROM shared-builder AS backend-builder
WORKDIR /app
COPY packages/portal/backend ./packages/portal/backend
RUN touch packages/portal/backend/env.production
RUN pnpm --filter @factory/backend build

# 4. Compilar frontend con Vite
FROM shared-builder AS frontend-builder
WORKDIR /app
COPY packages/portal/frontend ./packages/portal/frontend
ARG VITE_API_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_GA_MEASUREMENT_ID
ARG VITE_GOOGLE_ADSENSE_CLIENT_ID
ARG VITE_ADS_ENABLED
ARG VITE_ADSENSE_SLOT_SUBHERO
ARG VITE_ADSENSE_SLOT_FOOTER

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID
ENV VITE_GOOGLE_ADSENSE_CLIENT_ID=${VITE_GOOGLE_ADSENSE_CLIENT_ID:-ca-pub-6167435415786243}
ENV VITE_ADS_ENABLED=${VITE_ADS_ENABLED:-true}
ENV VITE_ADSENSE_SLOT_SUBHERO=$VITE_ADSENSE_SLOT_SUBHERO
ENV VITE_ADSENSE_SLOT_FOOTER=$VITE_ADSENSE_SLOT_FOOTER
RUN pnpm --filter @factory/frontend build

# 5. Imagen final de Nginx + Node Backend
FROM nginx:alpine
RUN apk add --no-cache nodejs npm wget
RUN npm install -g pnpm@latest
WORKDIR /app

# Copiar la estructura del monorepo necesaria para producción
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./
COPY packages/shared/package*.json ./packages/shared/
COPY packages/portal/package*.json ./packages/portal/
COPY packages/portal/backend/package*.json ./packages/portal/backend/
COPY packages/portal/frontend/package*.json ./packages/portal/frontend/
COPY --from=shared-builder /app/packages/shared /app/packages/shared

# Instalar dependencias de producción en la raíz
RUN pnpm install --prod --frozen-lockfile

# Copiar el backend compilado y los estáticos del frontend
COPY --from=backend-builder /app/packages/portal/backend/dist ./packages/portal/backend/dist
COPY --from=backend-builder /app/packages/portal/backend/env.production ./packages/portal/backend/env.production
COPY --from=frontend-builder /app/packages/portal/frontend/dist /usr/share/nginx/html
COPY packages/portal/nginx.conf /etc/nginx/conf.d/default.conf

# Script de arranque
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'set -e' >> /start.sh && \
    echo 'echo "🚀 Iniciando backend..."' >> /start.sh && \
    echo 'cd /app/packages/portal/backend' >> /start.sh && \
    echo 'if [ ! -f dist/server.js ]; then' >> /start.sh && \
    echo '  echo "❌ ERROR: dist/server.js no existe!"' >> /start.sh && \
    echo '  ls -la dist/ || echo "dist/ no existe"' >> /start.sh && \
    echo '  exit 1' >> /start.sh && \
    echo 'fi' >> /start.sh && \
    echo 'if [ ! -f dist/routes/index.js ]; then' >> /start.sh && \
    echo '  echo "❌ ERROR: dist/routes/index.js no existe!"' >> /start.sh && \
    echo '  ls -la dist/routes/ || echo "dist/routes/ no existe"' >> /start.sh && \
    echo '  exit 1' >> /start.sh && \
    echo 'fi' >> /start.sh && \
    echo 'echo "✅ Archivos verificados, iniciando servidor..."' >> /start.sh && \
    echo 'NODE_ENV=production npx tsx dist/server.js &' >> /start.sh && \
    echo 'BACKEND_PID=$!' >> /start.sh && \
    echo 'echo "⏳ Esperando a que el backend esté listo..."' >> /start.sh && \
    echo 'MAX_WAIT=60' >> /start.sh && \
    echo 'WAIT_TIME=0' >> /start.sh && \
    echo 'while [ $WAIT_TIME -lt $MAX_WAIT ]; do' >> /start.sh && \
    echo '  if wget -q --spider http://localhost:5000/ 2>/dev/null; then' >> /start.sh && \
    echo '    echo "✅ Backend está listo!"' >> /start.sh && \
    echo '    break' >> /start.sh && \
    echo '  fi' >> /start.sh && \
    echo '  if ! kill -0 $BACKEND_PID 2>/dev/null; then' >> /start.sh && \
    echo '    echo "❌ Backend se detuvo inesperadamente"' >> /start.sh && \
    echo '    exit 1' >> /start.sh && \
    echo '  fi' >> /start.sh && \
    echo '  echo "⏳ Esperando... ($WAIT_TIME/$MAX_WAIT)"' >> /start.sh && \
    echo '  sleep 1' >> /start.sh && \
    echo '  WAIT_TIME=$((WAIT_TIME + 1))' >> /start.sh && \
    echo 'done' >> /start.sh && \
    echo 'if [ $WAIT_TIME -ge $MAX_WAIT ]; then' >> /start.sh && \
    echo '  echo "❌ Backend no respondió después de $MAX_WAIT segundos"' >> /start.sh && \
    echo '  kill $BACKEND_PID 2>/dev/null || true' >> /start.sh && \
    echo '  exit 1' >> /start.sh && \
    echo 'fi' >> /start.sh && \
    echo 'echo "🌐 Iniciando nginx..."' >> /start.sh && \
    echo 'exec nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

EXPOSE 80
CMD ["/start.sh"]
