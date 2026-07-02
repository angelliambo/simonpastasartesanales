/**
 * Utilidades centralizadas para manejo de errores de API
 * 
 * Este módulo proporciona funciones helper para manejar errores de API
 * de forma consistente en toda la aplicación.
 * 
 * Principios:
 * - Consistencia: Mismo formato de error en toda la aplicación
 * - Type Safety: Tipos TypeScript para todos los errores
 * - User-Friendly: Mensajes de error amigables para usuarios
 * - Logging: Logging consistente de errores para debugging
 */

/**
 * Tipos de error de API
 */
export enum ApiErrorType {
  NETWORK = 'network',
  TIMEOUT = 'timeout',
  UNAUTHORIZED = 'unauthorized',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  VALIDATION = 'validation',
  SERVER = 'server',
  UNKNOWN = 'unknown',
}

/**
 * Estructura estándar de error de API
 */
export interface ApiError {
  type: ApiErrorType;
  message: string;
  userMessage: string; // Mensaje amigable para el usuario
  statusCode?: number;
  originalError?: any;
  details?: Record<string, any>;
}

/**
 * Determina el tipo de error basado en el código de estado HTTP
 */
export function getErrorType(statusCode?: number): ApiErrorType {
  if (!statusCode) return ApiErrorType.UNKNOWN;

  if (statusCode >= 500) return ApiErrorType.SERVER;
  if (statusCode === 401) return ApiErrorType.UNAUTHORIZED;
  if (statusCode === 403) return ApiErrorType.FORBIDDEN;
  if (statusCode === 404) return ApiErrorType.NOT_FOUND;
  if (statusCode === 422 || statusCode === 400) return ApiErrorType.VALIDATION;
  
  return ApiErrorType.UNKNOWN;
}

/**
 * Genera un mensaje amigable para el usuario basado en el tipo de error
 */
export function getUserFriendlyMessage(
  type: ApiErrorType,
  originalMessage?: string
): string {
  switch (type) {
    case ApiErrorType.NETWORK:
      return 'No se pudo conectar al servidor. Por favor, verifica tu conexión a internet e intenta nuevamente.';
    case ApiErrorType.TIMEOUT:
      return 'La solicitud tardó demasiado tiempo. Por favor, intenta nuevamente.';
    case ApiErrorType.UNAUTHORIZED:
      return 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
    case ApiErrorType.FORBIDDEN:
      return 'No tienes permisos para realizar esta acción.';
    case ApiErrorType.NOT_FOUND:
      return 'El recurso solicitado no fue encontrado.';
    case ApiErrorType.VALIDATION:
      return originalMessage || 'Los datos proporcionados no son válidos. Por favor, verifica la información e intenta nuevamente.';
    case ApiErrorType.SERVER:
      return 'Ocurrió un error en el servidor. Por favor, intenta más tarde o contacta al soporte si el problema persiste.';
    default:
      return originalMessage || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
  }
}

/**
 * Normaliza un error a la estructura estándar ApiError
 */
export function normalizeError(error: any): ApiError {
  // Si ya es un ApiError, devolverlo directamente
  if (error && typeof error === 'object' && error.type && error.userMessage) {
    return error as ApiError;
  }

  // Error de fetch/network
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      type: ApiErrorType.NETWORK,
      message: error.message,
      userMessage: getUserFriendlyMessage(ApiErrorType.NETWORK),
      originalError: error,
    };
  }

  // Error de RTK Query
  if (error && typeof error === 'object' && 'status' in error) {
    const statusCode = error.status as number;
    const errorData = error.data || {};
    const errorMessage = errorData.message || errorData.error || error.message || 'Error desconocido';
    
    return {
      type: getErrorType(statusCode),
      message: errorMessage,
      userMessage: getUserFriendlyMessage(getErrorType(statusCode), errorMessage),
      statusCode,
      originalError: error,
      details: errorData,
    };
  }

  // Error estándar de JavaScript
  if (error instanceof Error) {
    // Detectar timeout
    if (error.message.includes('timeout') || error.message.includes('Timeout')) {
      return {
        type: ApiErrorType.TIMEOUT,
        message: error.message,
        userMessage: getUserFriendlyMessage(ApiErrorType.TIMEOUT),
        originalError: error,
      };
    }

    return {
      type: ApiErrorType.UNKNOWN,
      message: error.message,
      userMessage: getUserFriendlyMessage(ApiErrorType.UNKNOWN, error.message),
      originalError: error,
    };
  }

  // Error de respuesta HTTP
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as any).response;
    const statusCode = response?.status;
    const errorData = response?.data || {};
    const errorMessage = errorData.message || errorData.error || 'Error desconocido';

    return {
      type: getErrorType(statusCode),
      message: errorMessage,
      userMessage: getUserFriendlyMessage(getErrorType(statusCode), errorMessage),
      statusCode,
      originalError: error,
      details: errorData,
    };
  }

  // Error genérico
  const errorMessage = typeof error === 'string' ? error : 'Error desconocido';
  return {
    type: ApiErrorType.UNKNOWN,
    message: errorMessage,
    userMessage: getUserFriendlyMessage(ApiErrorType.UNKNOWN, errorMessage),
    originalError: error,
  };
}

/**
 * Extrae mensaje de error de una respuesta de API
 */
export function extractErrorMessage(error: any): string {
  const normalized = normalizeError(error);
  return normalized.userMessage;
}

/**
 * Extrae detalles de validación de un error
 */
export function extractValidationErrors(error: any): Record<string, string[]> | null {
  const normalized = normalizeError(error);
  
  if (normalized.type !== ApiErrorType.VALIDATION) {
    return null;
  }

  // Intentar extraer errores de validación de diferentes formatos
  if (normalized.details?.errors) {
    return normalized.details.errors;
  }

  if (normalized.details?.validation) {
    return normalized.details.validation;
  }

  if (normalized.originalError?.data?.errors) {
    return normalized.originalError.data.errors;
  }

  return null;
}

/**
 * Verifica si un error es recuperable (el usuario puede intentar nuevamente)
 */
export function isRecoverableError(error: ApiError | any): boolean {
  const normalized = normalizeError(error);
  
  return [
    ApiErrorType.NETWORK,
    ApiErrorType.TIMEOUT,
    ApiErrorType.SERVER,
  ].includes(normalized.type);
}

/**
 * Verifica si un error requiere autenticación
 */
export function requiresAuth(error: ApiError | any): boolean {
  const normalized = normalizeError(error);
  return normalized.type === ApiErrorType.UNAUTHORIZED;
}

/**
 * Logging consistente de errores
 */
export function logError(
  error: ApiError | any,
  context?: string,
  additionalInfo?: Record<string, any>
): void {
  const normalized = normalizeError(error);
  
  const logData = {
    type: normalized.type,
    message: normalized.message,
    userMessage: normalized.userMessage,
    statusCode: normalized.statusCode,
    context,
    ...additionalInfo,
    timestamp: new Date().toISOString(),
  };

  // En desarrollo, log completo
  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 [API Error]', logData);
    if (normalized.originalError) {
      console.error('Original error:', normalized.originalError);
    }
  } else {
    // En producción, solo log esencial
    console.error(`[API Error] ${normalized.type}: ${normalized.message}`, {
      context,
      statusCode: normalized.statusCode,
    });
  }

  // Aquí se podría integrar con un servicio de logging externo
  // Ejemplo: Sentry, LogRocket, etc.
}

/**
 * Maneja errores de forma consistente y devuelve mensaje para mostrar al usuario
 */
export function handleApiError(
  error: any,
  context?: string,
  showToUser: boolean = true
): string {
  const normalized = normalizeError(error);
  
  // Log del error
  logError(normalized, context);

  // Si requiere autenticación, redirigir al login
  if (requiresAuth(normalized)) {
    // Esto se puede hacer desde el componente que llama a esta función
    // o desde un interceptor global
    if (typeof window !== 'undefined') {
      // Solo redirigir si no estamos ya en la página de login
      if (!window.location.pathname.includes('/login')) {
        // Guardar la ruta actual para redirigir después del login
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = '/login';
      }
    }
  }

  // Retornar mensaje para mostrar al usuario
  return showToUser ? normalized.userMessage : '';
}

/**
 * Crea un handler de error para RTK Query
 */
export function createErrorHandler(context?: string) {
  return (error: any) => {
    return handleApiError(error, context);
  };
}

/**
 * Wrapper para manejar errores en funciones async
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  context?: string,
  onError?: (error: ApiError) => void
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    const normalized = normalizeError(error);
    logError(normalized, context);
    
    if (onError) {
      onError(normalized);
    }
    
    return null;
  }
}

/**
 * Retry logic para errores recuperables
 */
export async function retryOnError<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
  context?: string
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const normalized = normalizeError(error);
      
      // Si no es recuperable, no reintentar
      if (!isRecoverableError(normalized)) {
        throw error;
      }
      
      // Si es el último intento, lanzar el error
      if (attempt === maxRetries) {
        logError(normalized, context, { attempts: attempt });
        throw error;
      }
      
      // Esperar antes de reintentar
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
      
      logError(normalized, context, { attempt, retrying: true });
    }
  }
  
  throw lastError;
}

