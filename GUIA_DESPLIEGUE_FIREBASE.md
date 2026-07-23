# Guía de Despliegue en Firebase & Google Cloud Run

Esta guía detalla los pasos para migrar y desplegar el frontend de la plataforma en **Firebase Hosting** y el backend en **Google Cloud Run**, logrando una arquitectura desacoplada, escalable y neutra.

---

## 1. Reemplazo de Placeholders Neutros

Antes de realizar el despliegue, debes configurar tus propios datos y credenciales. El boilerplate utiliza placeholders únicos para facilitar este proceso mediante un simple "Buscar y Reemplazar" en tu editor:

| Placeholder | Descripción | Ejemplo de Reemplazo |
|-------------|-------------|----------------------|
| `__BRAND_NAME__` | El nombre comercial de tu plataforma. | `SpartaForge` |
| `__DOMAIN_NAME__` | El dominio web donde correrá el portal. | `spartaforge.com` |
| `__FIREBASE_PROJECT_ID__` | El ID de tu proyecto de Firebase. | `spartaforge` |
| `__BACKEND_SERVICE_NAME__` | El nombre del servicio de Cloud Run para el backend. | `spartaforge-backend` |
| `__INSTAGRAM_USERNAME__` | Usuario por defecto para el feed de Instagram. | `spartaforge_ok` |

> [!TIP]
> En VS Code o cualquier IDE, presiona `Ctrl + Shift + F` (o `Cmd + Shift + F` en macOS), introduce el placeholder y reemplázalo en todo el repositorio con su valor correspondiente.

---

## 2. Preparación de Google Cloud & Firebase

### Paso 2.1: Crear el proyecto
1. Ve a [Firebase Console](https://console.firebase.google.com/) y crea un proyecto nuevo (anota el ID asignado para reemplazarlo en `__FIREBASE_PROJECT_ID__`).
2. Habilita Google Analytics si deseas rastrear métricas.

### Paso 2.2: Habilitar facturación y APIs en Google Cloud
Cloud Run requiere que la facturación esté habilitada en Google Cloud Platform (GCP).
1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Selecciona tu proyecto y habilita la facturación.
3. Habilita las siguientes APIs:
   - Cloud Run API
   - Artifact Registry API
   - Cloud Build API

### Paso 2.3: Instalar y autenticar CLIs
Asegúrate de tener instalados los CLIs oficiales en tu máquina de desarrollo o entorno de CI/CD:
- **Firebase CLI**: `npm install -g firebase-tools` (luego ejecuta `firebase login`).
- **Google Cloud CLI (gcloud)**: Sigue la [guía de instalación de gcloud](https://cloud.google.com/sdk/docs/install) (luego ejecuta `gcloud auth login` y `gcloud config set project NOMBRE_DEL_PROYECTO`).

---

## 3. Despliegue del Backend en Cloud Run

El backend Express corre dentro de un contenedor Docker optimizado que expone el puerto 5000.

### Paso 3.1: Compilar y subir la imagen Docker a Google Artifact Registry

1. **Crea un repositorio de Artifact Registry** (reemplaza `us-central1` con tu región preferida):
   ```bash
   gcloud artifacts repositories create app-repository \
     --repository-format=docker \
     --location=us-central1 \
     --description="Repositorio de Docker para MERN SaaS"
   ```

2. **Autentica Docker con Google Cloud**:
   ```bash
   gcloud auth configure-docker us-central1-docker.pkg.dev
   ```

3. **Construye la imagen usando el Dockerfile de backend**:
   Desde la raíz del monorepo ejecuta:
   ```bash
   docker build -t us-central1-docker.pkg.dev/__FIREBASE_PROJECT_ID__/app-repository/backend:latest -f Dockerfile.backend .
   ```

4. **Sube la imagen al registro**:
   ```bash
   docker push us-central1-docker.pkg.dev/__FIREBASE_PROJECT_ID__/app-repository/backend:latest
   ```

### Paso 3.2: Desplegar en Cloud Run

1. **Lanza el servicio en Cloud Run**:
   ```bash
   gcloud run deploy __BACKEND_SERVICE_NAME__ \
     --image=us-central1-docker.pkg.dev/__FIREBASE_PROJECT_ID__/app-repository/backend:latest \
     --platform=managed \
     --region=us-central1 \
     --allow-unauthenticated \
     --port=5000 \
     --set-env-vars="MONGODB_URI=tu_conexion_mongodb,JWT_SECRET=tu_jwt_secret,NODE_ENV=production,FRONTEND_URL=https://__DOMAIN_NAME__"
   ```

2. Al terminar, la terminal te dará una Service URL de Cloud Run (ej: `https://__BACKEND_SERVICE_NAME__-xyz.a.run.app`). **Guarda esta URL**, es la URL directa de tu API.

---

## 4. Despliegue del Frontend en Firebase Hosting

Firebase Hosting servirá los archivos estáticos de tu SPA y redirigirá de manera transparente las peticiones `/api/*` al backend en Cloud Run.

### Paso 4.1: Configuración de Variables de Entorno del Frontend
Crea tu archivo `.env.production` en `packages/portal/frontend/.env.production` (o pídele al administrador que defina estas variables en tu entorno de integración continua) con las credenciales correspondientes:

```env
# URL de la API (debe apuntar al dominio final de Firebase/Producción, ej: https://__DOMAIN_NAME__)
REACT_APP_API_URL=https://__DOMAIN_NAME__/api

# Credenciales de Google OAuth (GIS)
REACT_APP_GOOGLE_CLIENT_ID=tu_google_client_id

# Credenciales Neutras de Firebase
REACT_APP_FIREBASE_API_KEY=tu_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=__FIREBASE_PROJECT_ID__.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=__FIREBASE_PROJECT_ID__
REACT_APP_FIREBASE_STORAGE_BUCKET=__FIREBASE_PROJECT_ID__.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=tu_firebase_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

### Paso 4.2: Compilar y desplegar
Desde la raíz del monorepo, ejecuta los comandos del pipeline:

1. **Compilar el frontend**:
   ```bash
   yarn firebase:build
   ```

2. **Desplegar en Firebase**:
   ```bash
   yarn firebase:deploy
   ```

Una vez finalizado, tu sitio estará disponible en `https://__FIREBASE_PROJECT_ID__.web.app` y `https://__DOMAIN_NAME__`. Firebase Hosting rutea internamente `/api/*` a Cloud Run sin problemas de CORS.
