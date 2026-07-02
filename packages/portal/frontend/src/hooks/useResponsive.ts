import { useResponsiveContext } from "../contexts/ResponsiveContext";

/**
 * Hook para responsive design - Versión unificada
 * 
 * Ahora usa ResponsiveContext para evitar múltiples listeners y estados inconsistentes.
 * Esto resuelve el problema del parpadeo mobile/desktop.
 * 
 * @returns {Object} Objeto con windowSize, isMobile, isTablet, isDesktop
 */
export const useResponsive = () => {
  try {
    // Intentar usar el contexto si está disponible
    return useResponsiveContext();
  } catch (error) {
    // Fallback para componentes fuera del ResponsiveProvider (legacy support)
    // Esto no debería pasar en producción, pero mantenemos compatibilidad
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      return {
        windowSize: { width, height },
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      };
    }
    
    // SSR fallback
    return {
      windowSize: { width: 1024, height: 768 },
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    };
  }
};

