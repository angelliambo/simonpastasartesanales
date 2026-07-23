# MERN SaaS Portal - Frontend

Este es el portal frontend del monorepo MERN SaaS Factory Framework.

## Configuración del Mapa Estático (100% Gratis e Ilimitado)

Para evitar la necesidad de configurar claves API de Google Maps de pago y registrar tarjetas de crédito en Google Cloud Console, este portal utiliza por defecto un componente de **Mapa Estático Enlazado**. Esto es ideal para sitios de producción de alto tráfico ya que es 100% gratuito de por vida, ultra rápido en carga y libre de puntos de interés comerciales (POIs).

### Pasos para personalizar el mapa para un cliente:

1. **Obtener la captura de pantalla del mapa:**
   * Abre un mapa en tu navegador (puedes usar Google Maps o Leaflet de forma interactiva).
   * Dibuja o posiciona el pin con el isologo de la marca de tu cliente sobre su ubicación exacta.
   * Asegúrate de limpiar o recortar cualquier marca comercial distractora.
   * Toma una captura de pantalla del área del mapa.

2. **Formato y dimensiones sugeridas:**
   * **Formato:** `.webp` (es el estándar moderno recomendado por su compresión y rendimiento).
   * **Dimensiones recomendadas:** **1200 x 675 píxeles** (relación de aspecto responsiva 16:9). Esto asegura excelente definición en dispositivos retina (HiDPI) y escalamiento fluido.

3. **Reemplazar el archivo de imagen:**
   * Guarda tu imagen optimizada con el nombre `map.webp` en la siguiente ruta:
     `packages/portal/frontend/public/assets/images/map.webp`
   * Si usas otra extensión (como `.png` o `.jpg`), asegúrate de actualizar la extensión en la configuración.

4. **Configurar el enlace a Google Maps:**
   * Abre el archivo de configuración global del proyecto en:
     `packages/shared/src/config/brand.ts`
   * Actualiza el valor de `mapLinkUrl` con el enlace directo para que el usuario pueda navegar (ej. el enlace de "Cómo llegar" de Google Maps de tu cliente):
     ```typescript
     mapImageUrl: '/assets/images/map.webp',
     mapLinkUrl: 'https://www.google.com/maps/search/?api=1&query=LATITUD,LONGITUD',
     ```
