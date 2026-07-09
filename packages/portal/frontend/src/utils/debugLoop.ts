/**
 * Utilidad para detectar y debuggear loops infinitos en useEffect
 *
 * Esta utilidad proporciona un sistema centralizado para detectar
 * cuando un useEffect se ejecuta demasiadas veces, lo que puede indicar
 * un loop infinito.
 *
 * @author SaaS Boilerplate Team
 * @version 1.0.0
 */

// Contador global para rastrear ejecuciones de useEffect
const useEffectCounters: { [key: string]: number } = {};

// Configuración por defecto
const DEFAULT_CONFIG = {
  maxCount: 5, // Número máximo de ejecuciones antes de activar debugger
  enableLogging: false, // Por defecto sin logging para producción
  enableDebugger: false, // DESACTIVADO - No pausar el navegador
};

/**
 * Configuración global del sistema de debugging
 */
let globalConfig = { ...DEFAULT_CONFIG };

/**
 * Configura el sistema de debugging globalmente
 * @param config - Configuración del sistema
 */
export const configureLoopDebugger = (
  config: Partial<typeof DEFAULT_CONFIG>
) => {
  globalConfig = { ...globalConfig, ...config };
};

/**
 * Detecta si un efecto se está ejecutando en loop
 * @param effectName - Nombre único del efecto para identificar
 * @param customConfig - Configuración específica para este efecto
 * @returns true si se detectó un loop, false en caso contrario
 */
export const checkLoop = (
  effectName: string,
  customConfig: Partial<typeof DEFAULT_CONFIG> = {}
): boolean => {
  const config = { ...globalConfig, ...customConfig };

  // Incrementar contador
  useEffectCounters[effectName] = (useEffectCounters[effectName] || 0) + 1;

  // Logging si está habilitado
  if (config.enableLogging) {
    console.log(
      `🔄 ${effectName}: ejecutándose por ${useEffectCounters[effectName]} vez`
    );
  }

  // Verificar si se superó el límite
  if (useEffectCounters[effectName] > config.maxCount) {
    console.error(
      `🚨 LOOP DETECTADO en ${effectName}! Ejecutándose ${useEffectCounters[effectName]} veces`
    );

    if (config.enableDebugger) {
      console.log(
        `🔍 DEBUGGING: ${effectName} está causando el loop infinito. Pausando navegador para inspección...`
      );
      debugger; // Pausará el navegador
    }

    return true;
  }

  return false;
};

/**
 * Reinicia el contador para un efecto específico
 * @param effectName - Nombre del efecto a reiniciar
 */
export const resetLoopCounter = (effectName: string): void => {
  delete useEffectCounters[effectName];
};

/**
 * Reinicia todos los contadores
 */
export const resetAllLoopCounters = (): void => {
  Object.keys(useEffectCounters).forEach((key) => {
    delete useEffectCounters[key];
  });
};

/**
 * Obtiene el estado actual de todos los contadores
 * @returns Objeto con todos los contadores activos
 */
export const getLoopCounters = (): { [key: string]: number } => {
  return { ...useEffectCounters };
};

/**
 * Obtiene el contador de un efecto específico
 * @param effectName - Nombre del efecto
 * @returns Número de ejecuciones o 0 si no existe
 */
export const getLoopCounter = (effectName: string): number => {
  return useEffectCounters[effectName] || 0;
};

/**
 * Hook para usar en componentes React
 * @param effectName - Nombre único del efecto
 * @param customConfig - Configuración específica
 * @returns Función checkLoop configurada
 */
export const useLoopDebugger = (
  effectName: string,
  customConfig: Partial<typeof DEFAULT_CONFIG> = {}
) => {
  return (additionalName?: string) => {
    const fullName = additionalName
      ? `${effectName}: ${additionalName}`
      : effectName;
    return checkLoop(fullName, customConfig);
  };
};

// Exportar configuración por defecto para referencia
export { DEFAULT_CONFIG };
