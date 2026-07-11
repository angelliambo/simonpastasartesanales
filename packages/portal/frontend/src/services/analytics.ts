/**
 * Servicio centralizado de Google Analytics (GA4)
 * Permite inicializar el script de tracking de forma dinámica y registrar pageviews y eventos (CTAs).
 */

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-CSZZEJ6KG5';

// Extender la interfaz global de Window para TypeScript
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Inicializa GA4 en la aplicación inyectando el script de gtag.js dinámicamente.
 * Solo se ejecuta si el REACT_APP_GA_MEASUREMENT_ID está configurado en las variables de entorno.
 */
export const initGA = (): void => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    return;
  }

  // Evitar doble inicialización si ya existe gtag
  if (window.gtag) {
    return;
  }

  // Inyectar el script de Google Tag Manager
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Inicializar dataLayer y la función gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    if (window.dataLayer) {
      window.dataLayer.push(arguments);
    }
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // Desactivamos el pageview automático para manejarlo por código en React
  });
}

/**
 * Registra una vista de página (Pageview).
 * @param path Ruta de la página (ej: '/pricing')
 * @param title Título de la página (ej: 'Planes')
 */
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) {
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
  });
};

/**
 * Registra un evento personalizado (por ejemplo, clics en CTAs).
 * @param action Acción del evento (ej: 'click_cta')
 * @param category Categoría del evento (ej: 'marketing')
 * @param label Etiqueta descriptiva (ej: 'Comenzar Gratis - Hero')
 * @param value Valor numérico opcional (ej: precio de un plan)
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
