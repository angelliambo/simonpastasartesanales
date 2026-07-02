/**
 * Tests para errorHandling.ts
 * Valida manejo de errores de API, normalización, mensajes amigables y utilidades
 */

import {
  ApiErrorType,
  getErrorType,
  getUserFriendlyMessage,
  normalizeError,
  extractErrorMessage,
  extractValidationErrors,
  isRecoverableError,
  requiresAuth,
  logError,
  handleApiError,
  createErrorHandler,
  withErrorHandling,
  retryOnError,
} from '../errorHandling';

// Mock console.error para evitar logs en tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('errorHandling', () => {
  describe('getErrorType', () => {
    it('debe retornar SERVER para códigos 500+', () => {
      expect(getErrorType(500)).toBe(ApiErrorType.SERVER);
      expect(getErrorType(503)).toBe(ApiErrorType.SERVER);
    });

    it('debe retornar UNAUTHORIZED para código 401', () => {
      expect(getErrorType(401)).toBe(ApiErrorType.UNAUTHORIZED);
    });

    it('debe retornar FORBIDDEN para código 403', () => {
      expect(getErrorType(403)).toBe(ApiErrorType.FORBIDDEN);
    });

    it('debe retornar NOT_FOUND para código 404', () => {
      expect(getErrorType(404)).toBe(ApiErrorType.NOT_FOUND);
    });

    it('debe retornar VALIDATION para códigos 400 y 422', () => {
      expect(getErrorType(400)).toBe(ApiErrorType.VALIDATION);
      expect(getErrorType(422)).toBe(ApiErrorType.VALIDATION);
    });

    it('debe retornar UNKNOWN para código desconocido', () => {
      expect(getErrorType(418)).toBe(ApiErrorType.UNKNOWN);
    });

    it('debe retornar UNKNOWN para undefined', () => {
      expect(getErrorType(undefined)).toBe(ApiErrorType.UNKNOWN);
    });
  });

  describe('getUserFriendlyMessage', () => {
    it('debe retornar mensaje amigable para NETWORK', () => {
      const message = getUserFriendlyMessage(ApiErrorType.NETWORK);
      expect(message).toContain('conectar');
    });

    it('debe retornar mensaje amigable para TIMEOUT', () => {
      const message = getUserFriendlyMessage(ApiErrorType.TIMEOUT);
      expect(message).toContain('tardó');
    });

    it('debe retornar mensaje amigable para UNAUTHORIZED', () => {
      const message = getUserFriendlyMessage(ApiErrorType.UNAUTHORIZED);
      expect(message).toContain('sesión');
    });

    it('debe retornar mensaje amigable para FORBIDDEN', () => {
      const message = getUserFriendlyMessage(ApiErrorType.FORBIDDEN);
      expect(message).toContain('permisos');
    });

    it('debe retornar mensaje amigable para NOT_FOUND', () => {
      const message = getUserFriendlyMessage(ApiErrorType.NOT_FOUND);
      expect(message).toContain('encontrado');
    });

    it('debe retornar mensaje amigable para VALIDATION', () => {
      const message = getUserFriendlyMessage(ApiErrorType.VALIDATION);
      expect(message).toContain('válidos');
    });

    it('debe retornar mensaje amigable para SERVER', () => {
      const message = getUserFriendlyMessage(ApiErrorType.SERVER);
      expect(message).toContain('servidor');
    });

    it('debe usar mensaje original si se proporciona para VALIDATION', () => {
      const originalMessage = 'Campo requerido';
      const message = getUserFriendlyMessage(ApiErrorType.VALIDATION, originalMessage);
      expect(message).toBe(originalMessage);
    });
  });

  describe('normalizeError', () => {
    it('debe devolver ApiError directamente si ya es uno', () => {
      const error: any = {
        type: ApiErrorType.NETWORK,
        message: 'Network error',
        userMessage: 'No se pudo conectar',
      };
      const result = normalizeError(error);
      expect(result.type).toBe(ApiErrorType.NETWORK);
      expect(result.userMessage).toBe('No se pudo conectar');
    });

    it('debe normalizar TypeError de fetch a NETWORK', () => {
      const error = new TypeError('Failed to fetch');
      const result = normalizeError(error);
      expect(result.type).toBe(ApiErrorType.NETWORK);
      expect(result.userMessage).toContain('conectar');
    });

    it('debe normalizar error de RTK Query con status', () => {
      const error = {
        status: 404,
        data: { message: 'Not found' },
      };
      const result = normalizeError(error);
      expect(result.type).toBe(ApiErrorType.NOT_FOUND);
      expect(result.statusCode).toBe(404);
      expect(result.message).toBe('Not found');
    });

    it('debe normalizar Error con timeout a TIMEOUT', () => {
      const error = new Error('Request timeout');
      const result = normalizeError(error);
      expect(result.type).toBe(ApiErrorType.TIMEOUT);
    });

    it('debe normalizar Error genérico a UNKNOWN', () => {
      const error = new Error('Generic error');
      const result = normalizeError(error);
      expect(result.type).toBe(ApiErrorType.UNKNOWN);
      expect(result.message).toBe('Generic error');
    });

    it('debe normalizar error con response HTTP', () => {
      const error = {
        response: {
          status: 500,
          data: { message: 'Server error' },
        },
      };
      const result = normalizeError(error);
      expect(result.type).toBe(ApiErrorType.SERVER);
      expect(result.statusCode).toBe(500);
    });

    it('debe normalizar string a UNKNOWN', () => {
      const error = 'Error string';
      const result = normalizeError(error);
      expect(result.type).toBe(ApiErrorType.UNKNOWN);
      expect(result.message).toBe('Error string');
    });
  });

  describe('extractErrorMessage', () => {
    it('debe extraer mensaje amigable de error normalizado', () => {
      const error = { status: 404, data: { message: 'Not found' } };
      const message = extractErrorMessage(error);
      expect(message).toContain('encontrado');
    });
  });

  describe('extractValidationErrors', () => {
    it('debe extraer errores de validación cuando el tipo es VALIDATION', () => {
      const error = {
        status: 422,
        data: {
          errors: {
            email: ['Email inválido'],
            password: ['Contraseña muy corta'],
          },
        },
      };
      const result = extractValidationErrors(error);
      expect(result).toEqual({
        email: ['Email inválido'],
        password: ['Contraseña muy corta'],
      });
    });

    it('debe retornar null para error que no es de validación', () => {
      const error = { status: 404, data: { message: 'Not found' } };
      const result = extractValidationErrors(error);
      expect(result).toBeNull();
    });

    it('debe retornar null cuando no hay errores de validación', () => {
      const error = {
        status: 422,
        data: { message: 'Validation error' },
      };
      const result = extractValidationErrors(error);
      expect(result).toBeNull();
    });
  });

  describe('isRecoverableError', () => {
    it('debe retornar true para errores recuperables', () => {
      const networkError: any = {
        type: ApiErrorType.NETWORK,
        message: 'Network error',
        userMessage: 'Network error',
      };
      const timeoutError: any = {
        type: ApiErrorType.TIMEOUT,
        message: 'Timeout',
        userMessage: 'Timeout',
      };
      const serverError: any = {
        type: ApiErrorType.SERVER,
        message: 'Server error',
        userMessage: 'Server error',
      };
      expect(isRecoverableError(networkError)).toBe(true);
      expect(isRecoverableError(timeoutError)).toBe(true);
      expect(isRecoverableError(serverError)).toBe(true);
    });

    it('debe retornar false para errores no recuperables', () => {
      const unauthorizedError: any = {
        type: ApiErrorType.UNAUTHORIZED,
        message: 'Unauthorized',
        userMessage: 'Unauthorized',
      };
      const forbiddenError: any = {
        type: ApiErrorType.FORBIDDEN,
        message: 'Forbidden',
        userMessage: 'Forbidden',
      };
      const notFoundError: any = {
        type: ApiErrorType.NOT_FOUND,
        message: 'Not found',
        userMessage: 'Not found',
      };
      expect(isRecoverableError(unauthorizedError)).toBe(false);
      expect(isRecoverableError(forbiddenError)).toBe(false);
      expect(isRecoverableError(notFoundError)).toBe(false);
    });

    it('debe normalizar error antes de verificar', () => {
      const error = { status: 500 };
      expect(isRecoverableError(error)).toBe(true);
    });
  });

  describe('requiresAuth', () => {
    it('debe retornar true para error UNAUTHORIZED', () => {
      const error: any = {
        type: ApiErrorType.UNAUTHORIZED,
        message: 'Unauthorized',
        userMessage: 'Unauthorized',
      };
      expect(requiresAuth(error)).toBe(true);
    });

    it('debe retornar false para otros tipos de error', () => {
      const networkError: any = {
        type: ApiErrorType.NETWORK,
        message: 'Network',
        userMessage: 'Network',
      };
      const forbiddenError: any = {
        type: ApiErrorType.FORBIDDEN,
        message: 'Forbidden',
        userMessage: 'Forbidden',
      };
      expect(requiresAuth(networkError)).toBe(false);
      expect(requiresAuth(forbiddenError)).toBe(false);
    });

    it('debe normalizar error antes de verificar', () => {
      const error = { status: 401 };
      expect(requiresAuth(error)).toBe(true);
    });
  });

  describe('logError', () => {
    it('debe loggear error en desarrollo', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      const error = { type: ApiErrorType.NETWORK, message: 'Test error' };
      logError(error, 'test-context');
      
      expect(console.error).toHaveBeenCalled();
      
      process.env.NODE_ENV = originalEnv;
    });

    it('debe loggear error en producción con formato reducido', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      const error = { type: ApiErrorType.NETWORK, message: 'Test error' };
      logError(error, 'test-context');
      
      expect(console.error).toHaveBeenCalled();
      
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('handleApiError', () => {
    const originalLocation = window.location;
    const originalSessionStorage = sessionStorage;

    beforeEach(() => {
      // Mock window.location
      delete (window as any).location;
      (window as any).location = {
        pathname: '/test',
        href: '',
      };
      // Mock sessionStorage
      const sessionStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn(),
      };
      Object.defineProperty(window, 'sessionStorage', {
        value: sessionStorageMock,
        writable: true,
      });
    });

    afterEach(() => {
      (window as any).location = originalLocation;
      Object.defineProperty(window, 'sessionStorage', {
        value: originalSessionStorage,
        writable: true,
      });
    });

    it('debe retornar mensaje amigable para mostrar al usuario', () => {
      const error = { status: 404 };
      const message = handleApiError(error, 'test-context', true);
      expect(message).toContain('encontrado');
    });

    it('debe retornar string vacío si showToUser es false', () => {
      const error = { status: 404 };
      const message = handleApiError(error, 'test-context', false);
      expect(message).toBe('');
    });

    it('debe redirigir a login para error UNAUTHORIZED', () => {
      const error = { status: 401 };
      handleApiError(error, 'test-context');
      expect(sessionStorage.setItem).toHaveBeenCalledWith('redirectAfterLogin', '/test');
    });

    it('no debe redirigir si ya está en login', () => {
      (window as any).location.pathname = '/login';
      const error = { status: 401 };
      handleApiError(error, 'test-context');
      expect(sessionStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('createErrorHandler', () => {
    it('debe crear handler que maneja errores con contexto', () => {
      const handler = createErrorHandler('test-context');
      const error = { status: 404 };
      const message = handler(error);
      expect(message).toContain('encontrado');
    });
  });

  describe('withErrorHandling', () => {
    it('debe ejecutar función y retornar resultado si no hay error', async () => {
      const fn = jest.fn().mockResolvedValue('success');
      const result = await withErrorHandling(fn, 'test-context');
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalled();
    });

    it('debe retornar null y llamar onError si hay error', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('Test error'));
      const onError = jest.fn();
      const result = await withErrorHandling(fn, 'test-context', onError);
      expect(result).toBeNull();
      expect(onError).toHaveBeenCalled();
    });

    it('debe retornar null sin onError si hay error', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('Test error'));
      const result = await withErrorHandling(fn, 'test-context');
      expect(result).toBeNull();
    });
  });

  describe('retryOnError', () => {
    it('debe retornar resultado en primer intento exitoso', async () => {
      const fn = jest.fn().mockResolvedValue('success');
      const result = await retryOnError(fn, 3, 100);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('debe reintentar en errores recuperables', async () => {
      const fn = jest
        .fn()
        .mockRejectedValueOnce({ status: 500 })
        .mockResolvedValueOnce('success');
      
      const result = await retryOnError(fn, 3, 100);
      
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(2);
    }, 10000);

    it('debe lanzar error después de maxRetries', async () => {
      const fn = jest.fn().mockRejectedValue({ status: 500 });
      
      await expect(retryOnError(fn, 2, 100)).rejects.toEqual({ status: 500 });
      expect(fn).toHaveBeenCalledTimes(2);
    }, 10000);

    it('no debe reintentar en errores no recuperables', async () => {
      const fn = jest.fn().mockRejectedValue({ status: 401 });
      
      await expect(retryOnError(fn, 3, 100)).rejects.toEqual({ status: 401 });
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});

