/**
 * Utilidad para gestionar overlays de desarrollo y prevenir interceptación de clicks
 * 
 * Problema: Los overlays de webpack-dev-server y otros overlays de error
 * tienen z-index muy altos y pueden interceptar clicks en elementos del menú mobile.
 * 
 * Solución: Ajustar z-index y cerrar overlays automáticamente cuando sea necesario.
 */

/**
 * Z-index estándares de la aplicación
 */
export const Z_INDEX = {
  DRAWER_MOBILE: 1100, // Drawer de navegación mobile
  HEADER: 1000, // Header principal
  MODAL: 1050, // Modales
  DROPDOWN: 1020, // Dropdowns
  TOOLTIP: 1030, // Tooltips
  OVERLAY_DEV: 2147483647, // Z-index típico de webpack-dev-server overlay
} as const;

/**
 * Selectores CSS para overlays de desarrollo comunes
 */
const OVERLAY_SELECTORS = [
  '[class*="webpack-dev-server"]',
  '[id*="webpack-dev-server"]',
  '[class*="error-overlay"]',
  '[id*="error-overlay"]',
  '[class*="react-error-overlay"]',
  '[id*="react-error-overlay"]',
];

/**
 * Detecta si hay un overlay de error visible
 */
export const detectErrorOverlay = (): HTMLElement | null => {
  for (const selector of OVERLAY_SELECTORS) {
    const element = document.querySelector(selector) as HTMLElement;
    if (element && element.offsetParent !== null) {
      // offsetParent !== null significa que el elemento es visible
      return element;
    }
  }
  return null;
};

/**
 * Cierra un overlay de error automáticamente
 */
export const closeErrorOverlay = (overlay: HTMLElement): boolean => {
  try {
    // Intentar encontrar y hacer clic en el botón de cerrar
    const closeButton = overlay.querySelector(
      'button[aria-label="Close"], button.close-button, .close, [class*="close"]'
    ) as HTMLButtonElement;

    if (closeButton) {
      closeButton.click();
      return true;
    }

    // Si no hay botón de cerrar, intentar remover el overlay directamente
    // (solo si estamos en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      overlay.style.display = 'none';
      return true;
    }

    return false;
  } catch (error) {
    console.warn('Error cerrando overlay:', error);
    return false;
  }
};

/**
 * Ajusta el z-index de overlays de desarrollo para que no intercepten clicks
 * en elementos de la aplicación (especialmente drawer mobile)
 */
export const adjustOverlayZIndex = (): void => {
  // En producción, no hay overlays de desarrollo
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  OVERLAY_SELECTORS.forEach((selector) => {
    const overlay = document.querySelector(selector) as HTMLElement;
    if (overlay) {
      // Reducir z-index solo si el drawer mobile está abierto
      // Esto permite que el drawer esté por encima del overlay
      const drawer = document.querySelector('[class*="ant-drawer"]') as HTMLElement;
      if (drawer && drawer.offsetParent !== null) {
        // Si el drawer está abierto, ajustar el overlay para que no interfiera
        overlay.style.zIndex = `${Z_INDEX.DRAWER_MOBILE - 1}`;
      }
    }
  });
};

/**
 * Inicializa el gestor de overlays
 * Debe llamarse al montar la aplicación
 */
export const initOverlayManager = (): (() => void) => {
  // Solo activar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return () => {}; // No-op cleanup
  }

  let intervalId: NodeJS.Timeout | null = null;
  let observer: MutationObserver | null = null;

  // Función para verificar y ajustar overlays periódicamente
  const checkAndAdjustOverlays = () => {
    adjustOverlayZIndex();
    
    // Opcional: cerrar overlays automáticamente después de un tiempo
    // (descomentar si se desea comportamiento automático)
    /*
    const overlay = detectErrorOverlay();
    if (overlay) {
      // Esperar 5 segundos antes de cerrar automáticamente
      setTimeout(() => {
        closeErrorOverlay(overlay);
      }, 5000);
    }
    */
  };

  // Configurar observer para detectar cuando se agregan overlays al DOM
  observer = new MutationObserver(() => {
    checkAndAdjustOverlays();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class'],
  });

  // Verificar periódicamente (cada 2 segundos)
  intervalId = setInterval(checkAndAdjustOverlays, 2000);

  // Verificación inicial
  checkAndAdjustOverlays();

  // Función de limpieza
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (observer) {
      observer.disconnect();
    }
  };
};

