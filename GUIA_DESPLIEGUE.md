# Guía de Configuración y Despliegue en Producción (MERN SaaS Factory)

Esta guía documenta paso a paso el flujo completo para configurar, preparar y desplegar tu portal SaaS basado en este framework monorepo. Los pasos son genéricos para que puedas replicar este proceso en el boilerplate original o en futuros desarrollos.

---

## 📋 Índice

1. [Configuración de Marca en Código (Shared)](#1-configuración-de-marca-en-código-shared)
2. [Configuración de Variables de Entorno (.env)](#2-configuración-de-variables-de-entorno-env)
3. [Creación de la App en Fly.io](#3-creación-de-la-app-en-flyio)
4. [Reserva de IPs Gratuitas (Fly.io)](#4-reserva-de-ips-gratuitas-flyio)
5. [Configuración de la Zona DNS en DonWeb (u otros proveedores)](#5-configuración-de-la-zona-dns-en-donweb-u-otros-proveedores)
6. [Vinculación de Dominio y Certificados SSL (HTTPS)](#6-vinculación-de-dominio-y-certificados-ssl-https)
7. [Compilación y Despliegue (Deploy)](#7-compilación-y-despliegue-deploy)
8. [Verificación y Mantenimiento](#8-verificación-y-mantenimiento)

---

## 1. Configuración de Marca en Código (Shared)

Antes de cualquier compilación, debes definir los metadatos y flags de características de tu proyecto en el paquete compartido `packages/shared/src/config/`.

### 📄 `brand.ts`

Establece la identidad visual y SEO de tu aplicación:

```typescript
const DOMAIN = '<tu-dominio-registrado>'; // Ej. 'sogasalejandro.com.ar'

export const BRAND_CONFIG = {
  siteName: '<Nombre de tu Sitio>', // Ej. 'Sogas Alejandro'
  domain: DOMAIN,
  logoUrl: '/assets/images/logo.png', // Ruta al logo en public
  supportEmail: 'info@' + DOMAIN,
  whatsappUrl: 'https://wa.me/<numero-telefono-con-codigo-pais>',
  seoTitle: '<Título SEO Principal>',
  seoDescription: '<Descripción del sitio para los buscadores>',
  seoKeywords: '<palabra-clave-1>, <palabra-clave-2>, <palabra-clave-3>'
};
```

### 📄 `features.ts`

Activa o desactiva los módulos de negocio según el alcance inicial:

```typescript
export const FEATURES = {
  ENABLE_GOOGLE_AUTH: false,      // Login/registro por código manual de email (sin Google OAuth)
  ENABLE_TICKETING_SYSTEM: true, // Habilita el módulo de soporte y tickets de clientes
  ENABLE_BILLING_LEMON: false,   // Integra o desactiva la facturación de Lemon Squeezy
  DEFAULT_LOCALE: 'es',          // Idioma principal por defecto ('es', 'en')
};
```

### 📄 `urls.ts` y `contact.ts`

Configura los endpoints globales y el email de soporte general:

* **`urls.ts`**: Configura `PORTAL_URL = 'https://<tu-dominio-registrado>'` y las redes sociales si están habilitadas.
* **`contact.ts`**: Configura el `CONTACT_EMAIL` por defecto para recibir alertas del sistema.

---

## 2. Configuración de Variables de Entorno (.env)

> [!WARNING]
> Nunca guardes credenciales o tokens reales en el repositorio de Git. Copia las plantillas `.example` y configura las variables reales localmente.

### 💻 Backend (`packages/portal/backend/`)

Crea `.env.development` (para desarrollo local) y `.env.production` (como referencia, aunque en producción se configuran mediante Secrets de Fly.io):

```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://<tu-dominio-registrado>
BBD=mongodb+srv://<usuario>:<password>@<host>/<database-name> # Conexión a MongoDB Atlas
JWT_SECRET_KEY=<tu-clave-secreta-jwt-super-segura>
MAILSENDER_API_KEY=<tu-api-key-de-mail-sender>
GOD_MODE_SECRET=<tu-hash-de-seguridad-para-admin>
```

### 🖥️ Frontend (`packages/portal/frontend/`)

Crea `.env` (desarrollo) y `.env.production` (producción):

```env
REACT_APP_API_URL=https://<tu-dominio-registrado>/api
GENERATE_SOURCEMAP=false
NODE_ENV=production
```

---

## 3. Creación de la App en Fly.io

1. **Instala y autentica el CLI de Fly.io** (sigue las instrucciones oficiales de [fly.io](https://fly.io)).
2. **Inicia sesión** en tu terminal:

    ```bash
    fly auth login
    ```

3. **Crea la aplicación** usando el nombre deseado (debe coincidir con la variable `app` en tu `packages/portal/fly.toml`):

    ```bash
    fly apps create <nombre-de-tu-app> # Ej. fly apps create sogasalejandro
    ```

---

## 4. Reserva de IPs Gratuitas (Fly.io)

Para que tu dominio apunte a Fly.io sin cargos adicionales, debes configurar una **IPv4 Compartida** y una **IPv6 Dedicada** (ambas son 100% gratuitas en el plan de Fly.io):

1. **Asignar una IPv4 Compartida (Gratis):**

    ```bash
    fly ips allocate-v4 --shared --app <nombre-de-tu-app>
    ```

2. **Asignar una IPv6 Dedicada (Gratis):**

    ```bash
    fly ips allocate-v6 --app <nombre-de-tu-app>
    ```

3. **Obtener las direcciones IP:**
    Ejecuta el siguiente comando para ver la IPv4 e IPv6 asignadas que colocarás en tu proveedor DNS:

    ```bash
    fly ips list --app <nombre-de-tu-app>
    ```

    *Copia la IP tipo `v6` (IPv6 Dedicada) y la IP tipo `shared` (IPv4 Compartida).*

---

## 5. Configuración de la Zona DNS en DonWeb (u otros proveedores)

Accede al panel de control de tu dominio (ej. DonWeb, Nic.ar, GoDaddy, Cloudflare) y ve a la sección de **Nameservers y Zona DNS**.

Si es la primera vez, haz clic en **"Crear zona DNS"** y añade/edita exactamente estos 3 registros:

| Tipo | Nombre / Host | Contenido / Destino / Apunta a | Notas |
|---|---|---|---|
| **`A`** | `@` (o en blanco) | `<tu-ipv4-compartida>` (Ej. `66.241.124.71`) | Dirección IPv4 de Fly.io |
| **`AAAA`** | `@` (o en blanco) | `<tu-ipv6-dedicada>` (Ej. `2a09:8280:1::13e:4f57:0`) | Dirección IPv6 de Fly.io |
| **`CNAME`** | `www` | `<nombre-de-tu-app>.fly.dev` (Ej. `sogasalejandro.fly.dev`) | Apunta el subdominio www al servidor de Fly |

> [!TIP]
> Apuntar el subdominio `www` mediante un `CNAME` a `<app>.fly.dev` es una buena práctica. Si Fly.io llega a cambiar la IPv4 compartida de sus balanceadores de carga por mantenimiento, el subdominio se actualizará de forma automática y tu web no sufrirá caídas.

---

## 6. Vinculación de Dominio y Certificados SSL (HTTPS)

Una vez guardados los cambios en tu proveedor de dominio, debes indicararle a Fly.io que emita los certificados de seguridad SSL para que tu sitio cargue de forma segura (HTTPS):

1. **Agregar el dominio base:**

    ```bash
    fly certs add <tu-dominio-registrado> --app <nombre-de-tu-app>
    # Ej: fly certs add sogasalejandro.com.ar --app sogasalejandro
    ```

2. **Agregar el subdominio WWW:**

    ```bash
    fly certs add www.<tu-dominio-registrado> --app <nombre-de-tu-app>
    # Ej: fly certs add www.sogasalejandro.com.ar --app sogasalejandro
    ```

3. **Monitorear el estado de verificación:**
    El proceso de validación por DNS puede tardar de 5 minutos a un par de horas. Verifica el estado corriendo:

    ```bash
    fly certs show <tu-dominio-registrado> --app <nombre-de-tu-app>
    ```

    *Cuando la validación termine, verás el estado como `Active` para el certificado SSL.*

---

## 7. Compilación y Despliegue (Deploy)

### 🔑 Configurar Secrets en Producción

Antes de subir el código, debes configurar las credenciales y variables de entorno del backend en la máquina de producción usando los Secrets de Fly:

```bash
fly secrets set \
  BBD="mongodb+srv://<usuario>:<password>@<host>/<database-name>" \
  JWT_SECRET_KEY="<tu-clave-secreta-jwt>" \
  MAILSENDER_API_KEY="<tu-key-de-mail-sender>" \
  GOD_MODE_SECRET="<clave-de-god-mode>" \
  --app <nombre-de-tu-app>
```

### 🚀 Lanzar el Deploy (Pipeline automatizada)

El monorepo cuenta con un script preparado para compilar el paquete compartido, el backend, compilar el frontend estático y subir todo de forma ordenara a Fly.io.

Ejecuta el siguiente comando en la raíz del proyecto:

```bash
yarn rollout
```

*Este comando ejecutará internamente la compilación de todos los paquetes y lanzará `flyctl deploy` usando la configuración de `packages/portal/fly.toml` y el `Dockerfile` raíz.*

---

## 8. Verificación y Mantenimiento

### 🩺 Ver logs de la aplicación en tiempo real

Si tienes problemas de conexión con la base de datos o quieres depurar errores en vivo en los servidores de producción, ejecuta:

```bash
fly logs --app <nombre-de-tu-app>
```

### 👤 Sembrar Base de Datos Inicial (Seeder)

Si necesitas crear los usuarios iniciales y de prueba de tu SaaS en la base de datos de producción directamente desde tu entorno local:

1. Asegúrate de que tu archivo `.env` local esté apuntando temporalmente a la URI de la base de datos de producción.
2. Configura la variable de entorno temporal de permisos y ejecuta el script:

   ```bash
   ALLOW_SEED=true yarn workspace @factory/backend seed
   ```

### ⚙️ Actualizaciones de SEO y Metadatos (Mantenimiento Posterior)

Si en el futuro necesitas editar el archivo `brand.ts` o cambiar títulos SEO con la aplicación ya en producción, el flujo correcto de actualización es:

1. Modifica los valores en `packages/shared/src/config/brand.ts`.
2. Ejecuta el comando de automatización para refrescar físicamente los archivos del directorio `public/` en el frontend:

   ```bash
   yarn update-seo
   ```

3. Lanza nuevamente el pipeline de despliegue para subir los cambios a los servidores de Fly.io:

   ```bash
   yarn rollout
   ```
