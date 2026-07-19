# 1. Instalar dependencias del monorepo en la raíz
FROM node:22-alpine AS base-dependencies
WORKDIR /app
COPY package.json yarn.lock* ./
COPY packages/shared/package*.json ./packages/shared/
COPY packages/portal/package*.json ./packages/portal/
COPY packages/portal/backend/package*.json ./packages/portal/backend/
COPY packages/portal/frontend/package*.json ./packages/portal/frontend/
RUN yarn config set network-timeout 600000 && \
    for i in 1 2 3 4 5; do \
        yarn install --frozen-lockfile && break; \
        if [ $i -eq 5 ]; then exit 1; fi; \
        sleep 10; \
    done

# 2. Compilar paquete compartido (@factory/shared)
FROM base-dependencies AS shared-builder
WORKDIR /app
COPY packages/shared ./packages/shared
RUN yarn workspace @factory/shared build

# 3. Compilar backend
FROM shared-builder AS backend-builder
WORKDIR /app
COPY packages/portal/backend ./packages/portal/backend
RUN touch packages/portal/backend/env.production
RUN yarn workspace @factory/backend build

# 4. Compilar frontend
FROM shared-builder AS frontend-builder
WORKDIR /app
COPY packages/portal/frontend ./packages/portal/frontend
ARG REACT_APP_API_URL
ARG REACT_APP_GOOGLE_CLIENT_ID
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID
RUN yarn workspace @factory/frontend build

# 5. Imagen final de Nginx + Node Backend
FROM nginx:alpine
RUN apk add --no-cache nodejs npm yarn wget
WORKDIR /app

# Copiar la estructura del monorepo necesaria para producción
COPY package.json yarn.lock* ./
COPY packages/shared/package*.json ./packages/shared/
COPY packages/portal/package*.json ./packages/portal/
COPY packages/portal/backend/package*.json ./packages/portal/backend/
COPY packages/portal/frontend/package*.json ./packages/portal/frontend/
COPY --from=shared-builder /app/packages/shared /app/packages/shared

# Instalar dependencias de producción en la raíz
RUN yarn config set network-timeout 600000 && \
    for i in 1 2 3 4 5; do \
        yarn install --production --frozen-lockfile && break; \
        if [ $i -eq 5 ]; then exit 1; fi; \
        sleep 10; \
    done

# Copiar el backend compilado y los estáticos del frontend
COPY --from=backend-builder /app/packages/portal/backend/dist ./packages/portal/backend/dist
COPY --from=backend-builder /app/packages/portal/backend/env.production ./packages/portal/backend/env.production
COPY --from=frontend-builder /app/packages/portal/frontend/build /usr/share/nginx/html
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
