# Plan de Trabajo Unificado: Purga Profunda y Unificación de Variables

Este documento detalla las fases y tareas de refactorización para lograr una purga profunda de la marca ZenithNexus, la eliminación de código muerto de la extensión, la simplificación del sistema de traducciones y la unificación de la variable de marca a `siteName` en todo el proyecto.

---

## 📋 Resumen del Plan
1.  **Unificación de Variables**: Reemplazar todas las variantes (`name`, `appName`, `nombreSitio`) por la variable unificada `siteName` (en configuraciones) y `{{siteName}}` (en traducciones).
2.  **Configuración del Motor de i18n**: Configurar el traductor común para inyectar automáticamente `siteName` de `BRAND_CONFIG` por defecto en todas las interpolaciones de i18n.
3.  **Purga de Componentes y Lógica**:
    -   Eliminar componentes de shared exclusivos de la extensión de Chrome (`PricingModal`, `SpeedSlider`).
    -   Mover `ContactForm` al frontend del portal (`packages/portal/frontend/src/components/ContactForm`) para que el paquete `shared` sea 100% libre de lógica de negocio ("mudo").
4.  **Purga de Traducciones Muertas (Dead Keys)**:
    -   Eliminar archivos de locales sin uso en el portal (`install.ts`, `welcome.ts`, `license.ts`, `accessibility.ts`, `theme.ts`, `offline.ts`).
    -   Simplificar y reescribir los archivos de traducción restantes con contenidos genéricos.
5.  **Dinamización de Páginas Legales**:
    -   Reescribir `PrivacyContent` y `TermsContent` con textos genéricos y adaptados para consumir `BRAND_CONFIG.siteName` dinámicamente.

---

## 🛠️ Fases y Tareas

### Fase 1: Unificación de Variable Global y Configuración de Marca [COMPLETADA]
*   `[x]` Renombrar `name` a `siteName` en `packages/shared/src/config/brand.ts`.
*   `[x]` Cambiar `BRAND_CONFIG.name` a `BRAND_CONFIG.siteName` en `globals.ts`, `Layout.tsx` y `HomePage/index.tsx`.

### Fase 2: Configuración del Motor de i18n [COMPLETADA]
*   `[x]` Modificar `packages/shared/src/i18n/t.ts` para inyectar `siteName: BRAND_CONFIG.siteName` por defecto en `mergedParams` de la función `translate`.

### Fase 3: Purga de Componentes de Shared y Reubicación [COMPLETADA]
*   `[x]` Borrar carpeta `PricingModal` en `packages/shared/src/design-sys/organisms/PricingModal`.
*   `[x]` Borrar carpeta `SpeedSlider` en `packages/shared/src/design-sys/atoms/SpeedSlider`.
*   `[x]` Mover la carpeta del componente `ContactForm` de `packages/shared/src/design-sys/organisms/LegalPages/ContactForm` a `packages/portal/frontend/src/components/ContactForm`.
*   `[x]` Actualizar importación de `ContactForm` en `packages/portal/frontend/src/pages/SupportPage/index.tsx`.

### Fase 4: Purga de Traducciones y Dead Keys (i18n) [COMPLETADA]
*   `[x]` Borrar archivos de traducciones de la extensión (`install.ts`, `welcome.ts`, `license.ts`, `accessibility.ts`, `theme.ts`, `offline.ts`) de `packages/shared/src/i18n/pages/portal/`.
*   `[x]` Modificar `portal/index.ts` para remover sus exportaciones.
*   `[x]` Modificar `locales/es/index.ts` y `locales/en/index.ts` en shared para quitar dependencias de `extPages`.
*   `[x]` Reemplazar todas las ocurrencias de "ZenithNexus" y de variables antiguas (`nombreSitio`, `appName`) por `{{siteName}}` en todos los archivos de traducción que se quedan.

### Fase 5: Páginas Legales Dinámicas y Genéricas [COMPLETADA]
*   `[x]` Actualizar `PrivacyContent` y `TermsContent` en shared para consumir `BRAND_CONFIG.siteName` dinámicamente y hacer sus textos genéricos para cualquier SaaS.

### Fase 6: Verificación y Compilación [COMPLETADA]
*   `[x]` Compilar shared (`yarn shared:build`) y frontend (`yarn workspace @factory/frontend build`) para asegurar que no hay fallos de TypeScript o de dependencias.
