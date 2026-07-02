/**
 * Utilidades para verificar consentimiento de cookies antes de ejecutar código de tracking
 * y guardar preferencias en localStorage.
 *
 * Funcionalidades que requieren consentimiento:
 * - Analytics y tracking de eventos
 * - Guardar preferencias de personalización en localStorage
 * - Guardar preferencias de accesibilidad en localStorage (si no está logueado)
 * - Cualquier funcionalidad que use cookies o localStorage para tracking
 */

const COOKIE_CONSENT_KEY = "zn-portal-cookie-consent";

/**
 * Verifica si el usuario ha aceptado las cookies
 * @returns true si las cookies fueron aceptadas, false en caso contrario
 */
export const hasCookieConsent = (): boolean => {
  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    return consent === "accepted";
  } catch (error) {
    console.error("Error verificando consentimiento de cookies:", error);
    return false;
  }
};

/**
 * Verifica si se puede guardar en localStorage según consentimiento de cookies
 * @param key - Clave del localStorage a guardar
 * @param isEssential - Si es true, siempre permite guardar (funcionalidad esencial)
 * @returns true si se puede guardar, false en caso contrario
 */
export const canSaveToLocalStorage = (
  key: string,
  isEssential: boolean = false
): boolean => {
  // Funcionalidades esenciales siempre se pueden guardar
  if (isEssential) {
    return true;
  }

  // Lista de claves esenciales que siempre se pueden guardar
  const essentialKeys = [
    "zn-portal-cookie-consent",
    "zn-portal-cookie-consent-timestamp",
    "auth-token",
    "refresh-token",
    "user-session",
  ];

  if (essentialKeys.includes(key)) {
    return true;
  }

  // Para otras claves, verificar consentimiento
  return hasCookieConsent();
};

/**
 * Guarda un valor en localStorage solo si hay consentimiento de cookies
 * @param key - Clave del localStorage
 * @param value - Valor a guardar
 * @param isEssential - Si es true, siempre guarda (funcionalidad esencial)
 * @returns true si se guardó exitosamente, false en caso contrario
 */
export const safeSetItem = (
  key: string,
  value: string,
  isEssential: boolean = false
): boolean => {
  if (!canSaveToLocalStorage(key, isEssential)) {
    console.warn(
      `No se puede guardar "${key}" en localStorage sin consentimiento de cookies`
    );
    return false;
  }

  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error guardando "${key}" en localStorage:`, error);
    return false;
  }
};

/**
 * Obtiene un valor de localStorage
 * @param key - Clave del localStorage
 * @param defaultValue - Valor por defecto si no existe
 * @returns Valor guardado o defaultValue
 */
export const safeGetItem = (
  key: string,
  defaultValue: string | null = null
): string | null => {
  try {
    return localStorage.getItem(key) || defaultValue;
  } catch (error) {
    console.error(`Error obteniendo "${key}" de localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Verifica si se puede ejecutar código de analytics/tracking
 * @returns true si se puede trackear, false en caso contrario
 */
export const canTrackAnalytics = (): boolean => {
  return hasCookieConsent();
};

/**
 * Verifica si se pueden guardar preferencias de personalización
 * @returns true si se pueden guardar, false en caso contrario
 */
export const canSavePersonalization = (): boolean => {
  return hasCookieConsent();
};

/**
 * Verifica si se pueden guardar preferencias de accesibilidad
 * @param isAuthenticated - Si el usuario está autenticado
 * @returns true si se pueden guardar, false en caso contrario
 */
export const canSaveAccessibility = (isAuthenticated: boolean): boolean => {
  // Si está autenticado, siempre puede guardar (se guarda en backend)
  if (isAuthenticated) {
    return true;
  }

  // Si no está autenticado, requiere consentimiento de cookies
  return hasCookieConsent();
};

/**
 * Documentación de funcionalidades deshabilitadas sin cookies:
 *
 * FUNCIONALIDADES DESHABILITADAS SIN CONSENTIMIENTO DE COOKIES:
 *
 * 1. Analytics y Tracking:
 *    - useAdvancedAnalytics: No trackea eventos, sesiones ni métricas
 *    - PWA Install Analytics: No guarda datos de intentos de instalación
 *    - Performance Metrics: No guarda métricas de rendimiento
 *
 * 2. Personalización:
 *    - Preferencias de usuario: No se guardan en localStorage
 *    - Temas personalizados: No se guardan en localStorage
 *    - Configuraciones de usuario: No se persisten localmente
 *
 * 3. Accesibilidad (solo para usuarios no autenticados):
 *    - Preferencias de accesibilidad: No se guardan en localStorage
 *    - Configuración de alto contraste: No se persiste localmente
 *    - Configuración de texto grande: No se persiste localmente
 *    - Nota: Si el usuario está autenticado, las preferencias se guardan en backend
 *
 * FUNCIONALIDADES QUE SIEMPRE FUNCIONAN (ESENCIALES):
 *
 * - Autenticación y sesión de usuario
 * - Funcionalidad básica del portal
 * - Navegación y rutas
 * - Comunicación con backend
 * - Funcionalidades críticas para el uso del portal
 */
