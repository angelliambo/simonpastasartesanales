# Factory — AGENTS.md

Monorepo: `packages/portal` (MERN), `packages/shared` (config + types + design-sys).

## .env files — DO NOT TOUCH

.env, .env.* files are never to be read, created, or modified by the agent. If a task requires changing an .env file, ask the user to do it.

## Google OAuth (GIS) — auto-login en portal

Para activar el login automático con Google en el portal web:

1. Ir a <https://console.cloud.google.com> → APIs & Services → Credentials
2. Crear OAuth 2.0 Client ID (tipo "Web application")
3. Agregar origen: `http://localhost:3000` y `https://<domain>`
4. Agregar redirect URI: `http://localhost:3000` y `https://<domain>`
5. Copiar el Client ID

Setear en ambos `.env`:

- `packages/portal/frontend/.env`: `REACT_APP_GOOGLE_CLIENT_ID=<client_id>`
- `packages/portal/backend/.env`: `GOOGLE_CLIENT_ID=<client_id>`

Sin Client ID, el portal funciona con email+código manual.

## Email service (MailSender)

El servicio de email usa MailSender por defecto. Configurar:

- `packages/portal/backend/.env`: `MAILSENDER_API_KEY=<key>`

En desarrollo usar: `mlsn.4bb633feab403e93829bcd242c3de2e24fe1574d4d002fa4e7306754ad919999`

Los templates de email están en `packages/portal/backend/email-templates/base.html`.

Set matching secrets in `.env` files to unlock all premium features:

- `packages/portal/backend/.env`: `GOD_MODE_SECRET=<secret>`

The backend validates `X-God-Mode` header → returns `plan: god_mode`.

| Env | Secret |
|-----|--------|
| Local | `local-god-mode-2022` |
| Prod | `fly secrets set GOD_MODE_SECRET=<hash>` |

```bash
yarn build                  # shared → portal (full pipeline)
yarn shared:build           # tsc -> dist/
yarn portal:build           # react-app-rewired (CRA, ForkTsChecker disabled)

yarn cleanup                # borra dist, build, node_modules en TODOS los packages
yarn portal:cleanup         # portal + backend + frontend
yarn shared:cleanup         # solo shared

yarn install                # reinstala todo después de cleanup
```

## Architecture

| Package | Build | Aliases |
|---------|-------|---------|
| `packages/shared` | tsc → `dist/` | — |
| `packages/portal/frontend` | CRA + react-app-rewired | `@design-sys` → `@factory/shared/design-sys`<br>`@shared` → `@factory/shared` |
| `packages/portal/backend` | tsc → `dist/` | Express + Mongoose + JWT |

## Shared package (`packages/shared/`)

```
packages/shared/src/
├── design-sys/          # UI theme, atoms, mixins, organisms
│   ├── theme/           # types.ts, light.ts, dark.ts
│   ├── atoms/           # Button, Card, Badge, etc.
│   ├── mixins/          # cards, buttons, text, effects, keyframes
│   └── organisms/       # PageLayout
├── config/              # Shared constants
│   ├── plans.ts         # Plan definitions, pricing, variant IDs
│   └── urls.ts          # API URLs
└── types/               # Shared TypeScript types
    ├── plan.ts
    └── license.ts
```

**No barrel exports** (index.ts re-exporting) anywhere in the project. Import directly from the source file.

In design-sys:

```typescript
import lightTheme from '@design-sys/theme/light';
import { Button } from '@design-sys/atoms/Button';
```

```typescript
import lightTheme from '@design-sys/theme/light';
import { Button } from '@design-sys/atoms/Button';
```

**Shared config/types** import via `@shared`:

```typescript
import { PLANS } from '@shared/config/plans';
import type { PlanId } from '@shared/types/plan';
```

**Theme types** come from `@design-sys/theme/types` (styled-components module augmentation).

## Reglas del Sistema de Diseño (design-sys) y Maquetación

Aquí tienes las reglas, criterios e instrucciones obligatorias para trabajar con el sistema de diseño (design-sys) y la maquetación del proyecto.

### 1. Estructura y Arquitectura de design-sys

El sistema de diseño reside en `packages/shared/src/design-sys/` y se organiza así:
- `theme/`: Tipos, tema claro (`light.ts`) y tema oscuro (`dark.ts`).
- `atoms/`: Componentes básicos (`Button`, `Card`, `Badge`, etc.).
- `mixins/`: Estilos reutilizables (efectos, botones, textos, animaciones).
- `organisms/`: Estructuras complejas (layouts de página).

#### 🚫 Sin Importaciones de Barril (Barrel Exports)
Está estrictamente prohibido el uso de archivos `index.ts` que re-exporten otros archivos. Importa siempre desde la fuente:

```typescript
// ✅ CORRECTO
import lightTheme from '@design-sys/theme/light';
import { Button } from '@design-sys/atoms/Button';

// ❌ INCORRECTO
import { Button, lightTheme } from '@design-sys';
```

### 2. Creación de Componentes y Props

Cada nuevo componente debe ir en su propia carpeta con esta estructura exacta:
- `index.tsx`: Solo la estructura del componente (JSX/TSX).
- `<Component>.styles.ts`: Todos los styled-components.
- `<Component>.types.ts`: Interfaces y tipos de TypeScript.

#### 🧬 Props Transitorias (Transient Props)
Usa siempre el prefijo `$` para las props personalizadas en styled-components. Así evitamos que se filtren al HTML nativo:

```tsx
// ✅ CORRECTO
const StyledDiv = styled.div<{ $isActive?: boolean }>`
  background: ${props => props.$isActive ? props.theme.colors.primary : 'transparent'};
`;
```

### 3. Arquitectura CSS y Buenas Prácticas

- **Prohibido el anidamiento excesivo**: No concatenes selectores CSS nativos (ej. `& .content-card > div:first-child`). Si un elemento necesita estilos propios, crea un nuevo componente estilizado secundario (ej. `const CardIcon = styled.div...`) dentro del archivo `.styles.ts`.
- **Prohibido el uso de `!important`**: El código debe respetar la especificidad natural. Si necesitas usar `!important`, significa que la estructura de tus componentes está mal planteada.
- **Prohibido el uso de estilos en línea**: Nunca uses `style={{ ... }}` en el JSX.

#### 🎨 Gestión de Colores y Tokens
- **Origen de datos**: Todos los colores deben provenir estrictamente de `props.theme.colors.*`.
- **Formato**: Los colores del tema deben estar definidos como valores hexadecimales (ej. `#FFFFFF`).
- **Evitar RGBA**: Evita el uso de funciones `rgba()` hardcodeadas. Si necesitas opacidad, utiliza tokens de color que ya la incluyan o propiedades de CSS como `opacity`.
- **Espaciados**: Usa siempre `props.theme.spacing.*`. No hardcodees valores numéricos (ej. `12px`).

### 4. Layout, Maquetación y Diseño Responsivo

Adoptamos una filosofía Mobile-First estricta. Todo se diseña pensando primero en pantallas pequeñas y se adapta a pantallas grandes mediante media-queries.

#### 📐 Filosofía de Maquetación: Simple y Limpia
Para construir cualquier portal de nuestra plataforma MERN SaaS, solo necesitas estas herramientas básicas. No uses soluciones complejas.
- **Display Grid (`display: grid`)**: Se reserva únicamente para la estructura del Layout General de la página (la rejilla global). No lo uses dentro de tarjetas (cards), formularios ni componentes internos.
- **Display Flex (`display: flex`)**: Es la herramienta principal para el contenido interno de las páginas y componentes. Usa `align-items` y `justify-content` para alinear.
- **Distribución de espacio (`gap`)**: Utiliza exclusivamente la propiedad `gap` combinada con Flexbox para separar elementos hermanos.
- **Otros Displays Permitidos**: `block`, `relative`, `absolute`, `sticky`. Son más que suficientes para resolver cualquier interfaz.

#### 📏 Reglas Semánticas de Dimensiones y Espacios
- **Alturas Dinámicas**: Nunca fuerces la altura de tarjetas o contenedores con un `height` estático. La altura debe estar determinada de forma natural por el contenido que lleva dentro.
- **Márgenes Exteriores (`margin`)**: Úsalo exclusivamente para separar contenedores independientes entre sí.
- **Espaciado Interior (`padding`)**: Úsalo exclusivamente para separar el borde interno de un contenedor y su contenido.

### 5. Iconos, Emojis e Internacionalización

- **Usa `<ZnIcon>`**: Importa siempre desde `@design-sys/atoms/ZnIcon`.
- **Prohibido hardcodear**: No pongas caracteres de emojis (`🎤`, `✅`), SVG crudos o iconos de texto directamente inline en el JSX.
- **Traducciones (i18n)**: Los iconos y emojis no se traducen. Pásalos en el JSX del componente, a menos que uses llaves específicas con el sufijo `Icon`.

### 6. Tipado Estricto en TypeScript

- **No usar `any`**: Totalmente prohibido. Si algo es difícil de tipar, usa `unknown` y aplica Type Guards.
- **No usar `as unknown as`**: Evita los castings dobles e innecesarios.
- **Exportaciones**: Exporta siempre de manera explícita (`export const MyComponent...`). No uses `export *`.

## Portal-specific quirks

- **MongoDB retry**: `config/db.ts` retries 3× max, then throws. Server won't start without DB.
- **ESLint in portal frontend**: disables `react-hooks/exhaustive-deps` and `react-hooks/rules-of-hooks`.
- **Portal frontend ThemeProvider** wraps design-sys's `getCombinedTheme` with Redux integration (`hooks/useAccessibilityRedux`).
- Portal's `colors.ts` has portal-only functions (`getDynamicGradient`, `getHeroGradient`) not in shared.

## i18n

- Source language: `es`. Add keys in `packages/shared/src/i18n/pages/<domain>/<page>.ts`.
- **Estructura y Herencia Dialéctica**: Las variantes regionales (`es-MX`, `es-ES`, `en-US`, `en-GB`) heredan automáticamente de las bases de idioma común (`es` y `en`). Sus carpetas locales solo deben almacenar archivos `index.ts` vacíos (`export const pages = {}; export default pages;`) a menos que requieran sobreescrituras (overrides) regionales explícitas.
- Sync auto-translates to 7 locales. Always add text in `es` first.
- In React: `{t('pages.page.key')}` (MANDATORIO: nunca uses fallbacks con `|| "texto"` ya que silencia errores de claves i18n inexistentes).
### i18n rule: icons never in translations

Icons/emojis (`🎤`, `✍️`, `✅`, `❌`, etc.) → **NO** van en los values de traducción.
Van en el JSX del componente o se pasan como parámetro `{{icon}}` en casos excepcionales.

**Bien** (icono en JSX, texto puro en traducción):

```tsx
// options.ts (source)
demoTTS: 'Prueba de Lectura'

// DemoSection.tsx
🎤 {t('pages.options.demoTTS')}
```

**Mal** (icono en traducción + posible duplicación en JSX):

```tsx
// options.ts (source)
demoTTS: '🎤 Prueba de Lectura'  // ← NO

// DemoSection.tsx
🎤 {t('pages.options.demoTTS')}  // ← renderiza 🎤 🎤 Prueba de Lectura
```

Excepción: keys con sufijo `Icon` (`sectionIdiomasNoteIcon`) cuyo único propósito es proveer el carácter del ícono. Esas sí pueden tener emoji.



## Versioning

Per-environment SEMVER. Bump by plan phase, not by commit.

| File | Field |
|------|-------|
| `packages/portal/package.json` | `version` |
| `packages/portal/backend/package.json` | `version` |
| `packages/portal/frontend/package.json` | `version` |

See `PLAN_DE_TRABAJO_UNIFICADO.md` → "Tabla de Versiones por Fase".

### Regla Obligatoria de Control de Versionado por Package

- Ante **cualquier** cambio, corrección o nueva funcionalidad implementada en un package del monorepo, el agente **debe obligatoriamente** incrementar la versión correspondiente en su archivo de configuración (`package.json` o `manifest.json`).
- **Límite de incrementos**: El incremento del versionado se realiza **una única vez por branch** de desarrollo (es decir, por fase o tarea del plan). No se deben iterar o acumular incrementos de versión en commits sucesivos dentro de la misma rama.
- Solo se debe incrementar la versión de los packages del monorepo que hayan recibido modificaciones reales en su código o archivos de configuración. Si un package (por ejemplo, `backend`) no sufre cambios en la rama actual, no se debe actualizar su versión.
- Si los cambios impactan al portal web (`packages/portal` o sus sub-packages `frontend` / `backend`), se deben incrementar las versiones únicamente en los `package.json` de aquellos packages específicos que hayan percibido modificaciones.
- Los incrementos deben seguir el versionado semántico (SEMVER), comúnmente aumentando el dígito de "patch" (ej. de `x.y.z` a `x.y.z+1`) para correcciones o mejoras menores dentro de la fase actual.

## Git rules for AI agent

### Branch naming

- Every branch created by the AI **MUST** use prefix `ia/` — e.g. `ia/fix-login`, `ia/feat-storage`.
- Never modify, merge, delete, or create branches without explicit user authorization.
- Never switch branches unless the user explicitly requests it.

### Single-branch rule (CRITICAL)

- **ALL** work across ALL phases MUST be done in the SAME branch. Never create a new branch for a different phase.
- The current branch is the ONE AND ONLY branch for all ongoing work. No exceptions.
- Before starting any work, verify you are in the correct branch with `git branch`.
- If you are asked to work on something that would normally warrant a new branch, do it in the current branch.

### Git Restrictions & Commit Authority

- **No Master Commits**: Never commit directly to `master`. All development must be done on the current AI branch.
- **No PRs or Merges**: Never open Pull Requests or perform merges. The user handles integration.
- **Explicit Authorization Only**: Commits can only be performed when explicitly requested by the user. Once the commit is completed, the agent no longer has write permission to git until re-authorized.
- Never use `git clean -fd` — it destroys untracked files irreversibly.
- If a merge has conflicts, ask the user how to resolve them unless the resolution is trivial.

### Before branching

- Always start from `master` unless the user specifies otherwise.
- Run `git status` and `git branch` to understand the current state before any git operation.
- If there are uncommitted changes, ask the user what to do — never stash or reset without asking.

### Verification checklist (Pre-commit / Pre-turn exit)

- Run `yarn build` and `yarn type-check` to verify the monorepo passes all compilations.
- Run linters to check for code issues (specifically unused variables or import errors):
  `yarn workspace @factory/portal-frontend lint` (or relevant workspace lint command).
- Ensure the tree is completely clean and consistent.

## Idioma y Comunicación

- El agente DEBE comunicarse siempre con el usuario en castellano (español).
- Todos los planes de implementación, bitácoras de tareas, reportes y walkthroughs deben estar redactados en castellano.


