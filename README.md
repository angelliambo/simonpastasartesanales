# MERN SaaS Factory Framework

¡Bienvenido al **MERN SaaS Factory Framework**! Este monorepo modular de alto rendimiento está diseñado para servir como boilerplate/plantilla base para crear múltiples proyectos derivados ("hijitos") de manera ágil, limpia y extensible. 

Incluye autenticación unificada (correo/código y Google OAuth), panel de control para administración y usuarios, sistema de soporte por tickets, facturación nativa mediante Lemon Squeezy y control dinámico mediante Feature Flags.

---

## 🛠️ Estructura del Monorepo

El proyecto está organizado como un monorepo utilizando Yarn Workspaces:

```
mern-saas-factory-framework/
├── packages/
│   ├── portal/            # Aplicación web MERN (Frontend en React + Backend en Express)
│   │   ├── frontend/      # React SPA (CRA + react-app-rewired)
│   │   └── backend/       # Node.js + Express API Server con Mongoose
│   └── shared/            # Configuración, constantes y sistema de diseño compartidos
│       └── src/
│           ├── config/    # brand.ts (marca), plans.ts (precios), urls.ts
│           └── design-sys/# Temas de Styled Components, mixins y componentes reutilizables
└── scripts/               # Scripts de automatización y auditoría global
```

---

## 🚀 Guía Técnica: Cómo crear y mantener proyectos derivados ("hijitos")

La técnica recomendada para crear un nuevo proyecto a partir de este boilerplate consiste en configurar **dos remotos en Git**. Esto te permitirá desarrollar tu lógica personalizada en el proyecto derivado y, al mismo tiempo, heredar mejoras, correcciones y nuevas funcionalidades del boilerplate base cuando se actualice.

### Paso 1: Crear el repositorio del proyecto hijo
Crea un repositorio nuevo y vacío en tu proveedor de Git (GitHub, GitLab, etc.). Por ejemplo: `https://github.com/tu-usuario/mi-nuevo-saas-hijo.git`.

### Paso 2: Clonar el boilerplate y preparar el nuevo proyecto
Clona este framework base en una nueva carpeta local con el nombre de tu nuevo proyecto:
```bash
git clone https://github.com/tu-usuario/mern-saas-factory-framework.git mi-nuevo-saas-hijo
cd mi-nuevo-saas-hijo
```

### Paso 3: Configurar los remotos de Git (Técnica Upstream)
Para poder heredar cambios del boilerplate base en el futuro, renombrará el remote original a `upstream` y agregará tu nuevo repositorio como `origin`:

```bash
# 1. Renombrar el origen actual (boilerplate) a 'upstream'
git remote rename origin upstream

# 2. Agregar tu nuevo repositorio vacío como 'origin'
git remote add origin https://github.com/tu-usuario/mi-nuevo-saas-hijo.git

# 3. Subir el código inicial del boilerplate a tu nuevo repositorio
git push -u origin master
```

A partir de este momento:
- `origin` apunta a tu repositorio personalizado (donde subirás tus cambios).
- `upstream` apunta al boilerplate original (desde donde traerás actualizaciones).

---

## 🔄 Cómo heredar actualizaciones desde el Boilerplate Base

Si en el futuro agregamos nuevas optimizaciones, dependencias, fixes o módulos en este boilerplate original, puedes integrarlos a tus proyectos hijos sin perder tu personalización siguiendo estos pasos:

```bash
# 1. Traer los cambios actualizados del boilerplate original
git fetch upstream

# 2. Asegúrate de estar en tu rama principal (master/main)
git checkout master

# 3. Combinar los cambios del upstream en tu proyecto personalizado
git merge upstream/master

# 4. Resolver conflictos (en caso de que existan)
# Si has modificado archivos comunes como la configuración de marca, es posible que tengas que
# resolver algún conflicto menor. Luego de resolverlos, realiza el commit correspondiente.

# 5. Probar que todo compile y funcione perfectamente
yarn install
yarn build

# 6. Subir los cambios actualizados a tu repositorio
git push origin master
```

---

## 🎨 Personalización Básica de tu Proyecto Hijo

Para personalizar el nombre del SaaS, logo, emails y colores sin romper la compatibilidad con el monorepo base, realiza estos pasos iniciales:

1. **Configurar la Marca**:
   Edita [packages/shared/src/config/brand.ts](file:///home/aliambo/git/mern-saas-factory-framework/packages/shared/src/config/brand.ts) para cambiar el nombre, dominio, email de soporte y descripción SEO de tu producto:
   ```typescript
   export const BRAND_CONFIG = {
     siteName: 'Mi Nuevo SaaS',
     domain: 'minuevosaas.com',
     logoUrl: '/assets/images/logo.png',
     supportEmail: 'soporte@minuevosaas.com',
     // ...
   };
   ```

2. **Ejecutar el Script de SEO**:
   Una vez configurado `brand.ts`, corre el generador estático para inyectar automáticamente tu marca y metadatos en todos los HTML y archivos públicos del frontend:
   ```bash
   yarn update-seo
   ```

3. **Variables de Entorno**:
   Crea y configura los archivos `.env` en `packages/portal/frontend` y `packages/portal/backend` a partir de sus respectivos ejemplos (como se detalla en la [GUIA_DESPLIEGUE.md](file:///home/aliambo/git/mern-saas-factory-framework/GUIA_DESPLIEGUE.md)).

4. **Configurar Google Analytics (GA4)**:
   Para activar la medición de analíticas automáticamente en tu proyecto hijo:
   - Agrega la siguiente variable de entorno en el `.env` del frontend (`packages/portal/frontend/.env`):
     ```env
     REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
     ```
   - El boilerplate inicializará GA4 y registrará las visitas a páginas (Pageviews) automáticamente al cambiar de ruta gracias al hook `usePageTracking`.
   - Para registrar eventos de clics o CTAs personalizados, importa y envuelve cualquier botón, enlace o elemento interactivo con el componente wrapper `TrackedClick`:
     ```tsx
     import TrackedClick from "../../components/TrackedClick";

     <TrackedClick label="Hero - Comenzar Gratis" action="click_cta" category="marketing">
       <button>Comenzar</button>
     </TrackedClick>
     ```

---

## 📦 Comandos de Desarrollo del Monorepo

- `yarn install`: Instala todas las dependencias del monorepo.
- `yarn build`: Compila el paquete `shared` y el portal frontend.
- `yarn update-seo`: Genera dinámicamente los archivos SEO estáticos en `/public`.
- `yarn cleanup`: Limpia todos los archivos compilados, builds y `node_modules` en todos los packages.
- `yarn portal:build`: Ejecuta la compilación de producción del backend y frontend.
- `yarn portal:cleanup`: Limpia únicamente el portal.
