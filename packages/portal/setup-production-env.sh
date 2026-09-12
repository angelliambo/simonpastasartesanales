#!/bin/bash

# Script para configurar variables de entorno para producción
echo "🚀 Configurando variables de entorno para producción..."

# Crear archivo .env.production en frontend
cat > frontend/.env.production << EOF
# Configuración para producción
VITE_API_URL=https://simon-app.fly.dev/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
NODE_ENV=production
EOF

# Crear archivo .env.example en frontend
cat > frontend/.env.example << EOF
# Configuración de ejemplo para desarrollo y producción
# Copiar a .env.local para desarrollo local
# Copiar a .env.production para producción

# URL del backend API
VITE_API_URL=http://localhost:5000/api

# Google Sign-In Client ID
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here

# Configuración de build
NODE_ENV=production
EOF

echo "✅ Archivos de configuración creados:"
echo "   - frontend/.env.production"
echo "   - frontend/.env.example"
echo ""
echo "📝 Para usar en producción:"
echo "   1. Actualiza VITE_API_URL si tu backend está en otra URL"
echo "   2. Configura VITE_GOOGLE_CLIENT_ID con tu Client ID de Google"
echo "   3. Ejecuta 'pnpm build' para generar el build de producción"
echo ""
echo "🔧 Para desarrollo local:"
echo "   cp frontend/.env.example frontend/.env.local"
echo "   # Edita frontend/.env.local con tus valores locales"
