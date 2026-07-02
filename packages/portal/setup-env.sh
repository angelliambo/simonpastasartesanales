#!/bin/bash

# Script para recrear archivos .env del backend
# Uso: ./setup-env.sh

echo "🔧 Configurando archivos de entorno del backend..."

cd backend

if [ ! -f "env.example" ]; then
    echo "❌ Error: No se encontró env.example"
    exit 1
fi

# Crear archivos .env si no existen
if [ ! -f "env.development" ]; then
    echo "📝 Creando env.development..."
    cp env.example env.development
fi

if [ ! -f "env.production" ]; then
    echo "📝 Creando env.production..."
    cp env.example env.production
fi

echo "✅ Archivos de entorno configurados correctamente"
echo "📁 Archivos creados:"
ls -la env.*

echo ""
echo "🚀 Para iniciar el backend:"
echo "   cd backend && yarn dev"
echo ""
echo "🔍 Para verificar que funciona:"
echo "   curl http://localhost:5000/"
