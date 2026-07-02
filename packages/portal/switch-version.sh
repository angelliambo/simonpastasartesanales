#!/bin/bash

# Script para cambiar entre versión completa y mínima de Simón App
# Uso: ./switch-version.sh [full|minimal]

VERSION=${1:-full}

echo "🔄 Cambiando a versión: $VERSION"

if [ "$VERSION" = "minimal" ]; then
    echo "📱 Configurando versión mínima..."
    
    # Copiar archivos de configuración mínima
    cp frontend/config-overrides-minimal.js frontend/config-overrides.js
    
    # Cambiar el manifest
    cp frontend/public/manifest-minimal.json frontend/public/manifest.json
    
    # Cambiar el service worker
    cp frontend/public/service-worker-minimal.js frontend/public/service-worker.js
    
    # Cambiar el HTML
    cp frontend/public/index-minimal.html frontend/public/index.html
    
    echo "✅ Versión mínima configurada"
    echo "📋 Funcionalidades disponibles:"
    echo "   - Pizarra Mágica"
    echo "   - Canciones (offline)"
    echo "   - Configuración"
    echo ""
    echo "🚀 Para iniciar: yarn start"
    
elif [ "$VERSION" = "full" ]; then
    echo "🌐 Configurando versión completa..."
    
    # Restaurar archivos originales
    git checkout frontend/public/manifest.json
    git checkout frontend/public/service-worker.js
    git checkout frontend/public/index.html
    
    # Restaurar config-overrides original
    if [ -f "frontend/config-overrides.js.backup" ]; then
        cp frontend/config-overrides.js.backup frontend/config-overrides.js
    else
        echo "⚠️  No se encontró backup de config-overrides.js"
        echo "   Puede que necesites restaurar manualmente"
    fi
    
    echo "✅ Versión completa configurada"
    echo "📋 Todas las funcionalidades disponibles"
    echo ""
    echo "🚀 Para iniciar: yarn start"
    
else
    echo "❌ Versión no válida: $VERSION"
    echo "Uso: ./switch-version.sh [full|minimal]"
    exit 1
fi

echo ""
echo "📝 Nota: Los cambios son temporales hasta el próximo commit"
