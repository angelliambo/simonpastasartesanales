/**
 * Utilidad para obtener la ruta optimizada de un video si existe
 * Si existe versión comprimida, retorna esa; si no, retorna la original
 * 
 * @param originalPath - Ruta original del video (ej: /assets/videos/webm/video.webm)
 * @returns Ruta optimizada si existe, o ruta original si no
 */
export const getOptimizedVideoPath = (originalPath: string): string => {
  // Solo procesar si es una ruta de video webm
  if (!originalPath.includes('/videos/webm/')) {
    return originalPath;
  }

  // Convertir ruta original a ruta comprimida
  const compressedPath = originalPath.replace(
    /\/videos\/webm\//,
    '/videos/compressed/'
  );

  // En tiempo de ejecución, el navegador intentará cargar la versión comprimida primero
  // Si falla (404), el componente VideoPlayer manejará el fallback a la original
  // Esto permite usar videos comprimidos cuando están disponibles sin romper funcionalidad
  
  return compressedPath;
};

/**
 * Hook para verificar si debería usar versión comprimida de un video
 * @param originalPath - Ruta original del video
 * @returns true si debería intentar usar versión comprimida
 */
export const shouldUseCompressedVideo = (originalPath: string): boolean => {
  // Solo intentar usar comprimida si es una ruta de video webm
  return originalPath.includes('/videos/webm/');
};

