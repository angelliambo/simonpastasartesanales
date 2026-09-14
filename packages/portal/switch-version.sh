#!/bin/bash

# Script para cambiar entre versión completa y mínima de Simón App
# Uso: ./switch-version.sh [full|minimal]

VERSION=${1:-full}

echo "🔄 Cambiando a versión: $VERSION"

if [ "$VERSION" = "minimal" ]; then
    echo "📱 Configurando versión mínima..."
    
    echo "🚀 Para iniciar: pnpm dev"
    
elif [ "$VERSION" = "full" ]; then
    echo "🌐 Configurando versión completa..."
    
    # Restaurar archivos originales
    git checkout frontend/public/manifest.json
    git checkout frontend/public/service-worker.js
    git checkout frontend/public/index.html
    
    echo "✅ Versión completa configurada"
    echo "📋 Todas las funcionalidades disponibles"
    echo ""
    echo "🚀 Para iniciar: pnpm dev"
    
else
    echo "❌ Versión no válida: $VERSION"
    echo "Uso: ./switch-version.sh [full|minimal]"
    exit 1
fi

echo ""
echo "📝 Nota: Los cambios son temporales hasta el próximo commit"
