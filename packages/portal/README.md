# Template App - Plataforma Web Base

## 🚀 Quick Start

### Prerrequisitos

- Node.js 20+
- Yarn 1.22+
- MongoDB 6+

### Instalación Rápida

```bash
# Clonar el repositorio
git clone <repository-url>
cd template-app

# Instalar dependencias
yarn install

# Configurar variables de entorno
cp backend/env.example backend/env.development
# Editar backend/env.development con tus configuraciones

# Iniciar en modo desarrollo
yarn dev
```

### Variables de Entorno Mínimas

```env
# Backend
JWT_SECRET_KEY=tu-clave-secreta-jwt
MONGODB_URI=mongodb://localhost:27017/template-app
NODE_ENV=development
PORT=5000
```

## 🎯 Características Principales

### 🏗️ Arquitectura Moderna

- **Monorepo**: Workspaces con Yarn
- **TypeScript**: Tipado fuerte en frontend y backend
- **React 19**: Framework moderno con mejores prácticas
- **Redux Toolkit**: Gestión de estado global
- **Styled Components**: Sistema de estilos centralizado

### 🔐 Autenticación Robusta

- **Sesión persistente**: Sistema mejorado que evita cierres inesperados
- **Cookies HTTP-only**: Máxima seguridad en el manejo de tokens
- **Refresh tokens**: Renovación automática de sesiones
- **Validación automática**: Verificación periódica

### 📱 Experiencia PWA

- **Instalación offline**: Funciona sin conexión a internet
- **Notificaciones push**: Sistema de notificaciones
- **Sincronización inteligente**: Datos actualizados automáticamente
- **Responsive design**: Optimizado para móviles, tablets y desktop

### ♿ Accesibilidad

- **Temas adaptativos**: Colores y contrastes optimizados
- **Accesibilidad completa**: Soporte para daltonismo, alto contraste y texto grande
- **Configuración de voz**: Velocidad, volumen y efectos de sonido personalizables

## 🏗️ Arquitectura Técnica

### Frontend (React + TypeScript)

- **Framework**: React 19 con TypeScript
- **Estado**: Redux Toolkit para gestión global
- **Estilos**: Styled Components con sistema de temas dinámico
- **UI**: Ant Design con componentes personalizados
- **PWA**: Service Worker con estrategias de caché avanzadas

### Backend (Node.js + Express)

- **Runtime**: Node.js con Express.js
- **Base de datos**: MongoDB con Mongoose ODM
- **Autenticación**: JWT con refresh tokens
- **Seguridad**: Cookies HTTP-only, CORS configurado
- **API**: RESTful

### Características Técnicas Avanzadas

- **Monorepo**: Workspaces con Yarn
- **TypeScript**: Tipado fuerte en frontend y backend
- **Testing**: Jest con cobertura de tests
- **Linting**: ESLint configurado
- **CI/CD**: Configuración para despliegue automático

## 📦 Scripts Disponibles

### Desarrollo

```bash
yarn dev          # Iniciar frontend y backend en modo desarrollo
yarn start        # Solo frontend
yarn start:b      # Solo backend
```

### Producción

```bash
yarn build        # Build de producción del frontend
yarn build:all    # Build de todos los workspaces (shared, backend, frontend)
```

### QA y Validación

```bash
# Validación completa de frontend (linting + tests + build)
yarn qa:frontend

# Validación completa de backend (tests + build)
yarn qa:backend

# Validación completa del proyecto
yarn qa:check
```

## 🧪 Testing

```bash
# Ejecutar tests del frontend
cd frontend && yarn test

# Ejecutar tests del backend
cd backend && yarn test

# Tests con cobertura
yarn test:coverage
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- Usar TypeScript en todo el código
- Seguir las convenciones de ESLint
- Escribir tests para nuevas funcionalidades
- Mantener cobertura de tests > 60%

---

**Versión actual**: 1.0.0  
**Estado**: Template base listo para personalización
