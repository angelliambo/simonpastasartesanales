/**
 * Logger utilitario para frontend
 * Reemplaza console.log/warn/debug con logging condicional
 * En producción solo muestra errores críticos para reducir overhead
 */

const isProduction = process.env.NODE_ENV === "production";

// Log level desde variable de entorno (opcional, por defecto 'info' en dev, 'error' en prod)
const LOG_LEVEL =
  process.env.REACT_APP_LOG_LEVEL ||
  (isProduction ? "error" : "info");

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLogLevel = LOG_LEVELS[LOG_LEVEL as keyof typeof LOG_LEVELS] || LOG_LEVELS.info;

export const logger = {
  /**
   * Debug logging - solo en desarrollo
   */
  debug: (message: string, ...args: any[]) => {
    if (!isProduction && currentLogLevel <= LOG_LEVELS.debug) {
      console.log(`🐛 [DEBUG] ${message}`, ...args);
    }
  },

  /**
   * Info logging - solo en desarrollo
   */
  info: (message: string, ...args: any[]) => {
    if (!isProduction && currentLogLevel <= LOG_LEVELS.info) {
      console.log(`ℹ️ [INFO] ${message}`, ...args);
    }
  },

  /**
   * Warning logging - solo en desarrollo
   */
  warn: (message: string, ...args: any[]) => {
    if (!isProduction && currentLogLevel <= LOG_LEVELS.warn) {
      console.warn(`⚠️ [WARN] ${message}`, ...args);
    }
  },

  /**
   * Error logging - siempre se muestra (crítico para debugging)
   */
  error: (message: string, ...args: any[]) => {
    // Errores siempre se loguean - críticos para debugging
    console.error(`💥 [ERROR] ${message}`, ...args);
  },

  /**
   * Logging condicional según nivel
   */
  log: (level: "debug" | "info" | "warn" | "error", message: string, ...args: any[]) => {
    switch (level) {
      case "debug":
        logger.debug(message, ...args);
        break;
      case "info":
        logger.info(message, ...args);
        break;
      case "warn":
        logger.warn(message, ...args);
        break;
      case "error":
        logger.error(message, ...args);
        break;
    }
  },
};

export default logger;

