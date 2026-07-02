/**
 * Utilidades centralizadas para mapeo consistente de datos de API
 * 
 * Este módulo proporciona funciones helper para transformar respuestas del backend
 * a estructuras de datos consistentes en el frontend.
 * 
 * Principios:
 * - Consistencia: Misma estructura de respuesta en toda la aplicación
 * - Type Safety: Tipos TypeScript para todas las transformaciones
 * - Error Handling: Manejo seguro de respuestas inesperadas
 * - Normalización: Normalización de fechas, IDs, y otros tipos comunes
 */

/**
 * Estructura estándar de respuesta del backend
 */
export interface StandardApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

/**
 * Estructura estándar de respuesta paginada
 */
export interface PaginatedApiResponse<T = any> {
  success: boolean;
  data?: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  total?: number;
  page?: number;
  pages?: number;
}

/**
 * Extrae datos de una respuesta estándar del backend
 * Maneja diferentes formatos de respuesta de forma segura
 */
export function extractData<T = any>(
  response: StandardApiResponse<T> | any,
  fallback?: T
): T | undefined {
  // Si la respuesta ya es el tipo esperado, devolverla directamente
  if (response && !response.success && !response.data && !response.error) {
    return response as T;
  }

  // Si tiene estructura estándar
  if (response?.success && response?.data) {
    return response.data;
  }

  // Si tiene data directamente (sin success)
  if (response?.data && !response.success) {
    return response.data;
  }

  // Si la respuesta es directamente el dato
  if (response && typeof response === 'object' && !response.success) {
    return response as T;
  }

  // Fallback
  return fallback;
}

/**
 * Extrae array de datos de una respuesta
 */
export function extractArray<T = any>(
  response: StandardApiResponse<T[]> | PaginatedApiResponse<T> | any,
  fallback: T[] = []
): T[] {
  const data = extractData<T[]>(response);
  
  if (Array.isArray(data)) {
    return data;
  }

  // Si la respuesta tiene estructura paginada
  if (response?.data && Array.isArray(response.data)) {
    return response.data;
  }

  return fallback;
}

/**
 * Extrae datos paginados de una respuesta
 */
export function extractPaginated<T = any>(
  response: PaginatedApiResponse<T> | any
): {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
} {
  const data = extractArray<T>(response, []);
  
  // Intentar extraer paginación de diferentes formatos
  const pagination = response?.pagination || {
    page: response?.page || 1,
    limit: response?.limit || data.length,
    total: response?.total || data.length,
    pages: response?.pages || 1,
  };

  return {
    data,
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || data.length,
      total: pagination.total || data.length,
      pages: pagination.pages || 1,
    },
  };
}

/**
 * Normaliza un ID (convierte _id a id si es necesario)
 */
export function normalizeId(item: any): string {
  if (!item) return '';
  return item.id || item._id || item.userId || String(item);
}

/**
 * Normaliza una fecha a string ISO
 */
export function normalizeDate(date: string | Date | undefined | null): string | undefined {
  if (!date) return undefined;
  if (typeof date === 'string') return date;
  if (date instanceof Date) return date.toISOString();
  return undefined;
}

/**
 * Normaliza un objeto con fechas comunes
 */
export function normalizeDates<T extends Record<string, any>>(
  item: T,
  dateFields: string[] = ['createdAt', 'updatedAt', 'completedAt', 'lastLogin', 'timestamp']
): T {
  const normalized = { ...item } as any;
  
  dateFields.forEach(field => {
    if (normalized[field]) {
      normalized[field] = normalizeDate(normalized[field]);
    }
  });

  return normalized as T;
}

/**
 * Mapea un usuario del backend al formato del frontend
 */
export function mapUser(user: any): any {
  if (!user) return null;

  return {
    id: normalizeId(user),
    ...user,
    _id: user._id || user.id,
    lastLogin: normalizeDate(user.lastLogin),
    createdAt: normalizeDate(user.createdAt),
    updatedAt: normalizeDate(user.updatedAt),
  };
}

/**
 * Mapea una lista de usuarios
 */
export function mapUsers(users: any[]): any[] {
  if (!Array.isArray(users)) return [];
  return users.map(mapUser);
}

/**
 * Mapea una actividad del backend al formato del frontend
 */
export function mapActivity(activity: any): any {
  if (!activity) return null;

  return {
    id: normalizeId(activity),
    ...activity,
    _id: activity._id || activity.id,
    ...normalizeDates(activity, ['createdAt', 'updatedAt', 'completedAt']),
  };
}

/**
 * Mapea una lista de actividades
 */
export function mapActivities(activities: any[]): any[] {
  if (!Array.isArray(activities)) return [];
  return activities.map(mapActivity);
}

/**
 * Mapea un juego del backend al formato del frontend
 */
export function mapGame(game: any): any {
  if (!game) return null;

  return {
    id: normalizeId(game),
    ...game,
    _id: game._id || game.id,
    ...normalizeDates(game, ['createdAt', 'updatedAt']),
  };
}

/**
 * Mapea una lista de juegos
 */
export function mapGames(games: any[]): any[] {
  if (!Array.isArray(games)) return [];
  return games.map(mapGame);
}

/**
 * Mapea un mensaje de chat del backend al formato del frontend
 */
export function mapChatMessage(message: any): any {
  if (!message) return null;

  return {
    id: normalizeId(message),
    ...message,
    _id: message._id || message.id,
    ...normalizeDates(message, ['createdAt', 'timestamp']),
  };
}

/**
 * Mapea una lista de mensajes de chat
 */
export function mapChatMessages(messages: any[]): any[] {
  if (!Array.isArray(messages)) return [];
  return messages.map(mapChatMessage);
}

/**
 * Mapea una sesión de juego del backend al formato del frontend
 */
export function mapGameSession(session: any): any {
  if (!session) return null;

  return {
    id: normalizeId(session),
    ...session,
    _id: session._id || session.id,
    ...normalizeDates(session, ['startedAt', 'endedAt', 'createdAt', 'updatedAt']),
  };
}

/**
 * Mapea una lista de sesiones de juego
 */
export function mapGameSessions(sessions: any[]): any[] {
  if (!Array.isArray(sessions)) return [];
  return sessions.map(mapGameSession);
}

/**
 * Mapea un logro del backend al formato del frontend
 */
export function mapAchievement(achievement: any): any {
  if (!achievement) return null;

  return {
    id: normalizeId(achievement),
    ...achievement,
    _id: achievement._id || achievement.id,
    ...normalizeDates(achievement, ['unlockedAt', 'createdAt', 'updatedAt']),
  };
}

/**
 * Mapea una lista de logros
 */
export function mapAchievements(achievements: any[]): any[] {
  if (!Array.isArray(achievements)) return [];
  return achievements.map(mapAchievement);
}

/**
 * Mapea una relación del backend al formato del frontend
 */
export function mapRelationship(relationship: any): any {
  if (!relationship) return null;

  return {
    id: normalizeId(relationship),
    ...relationship,
    _id: relationship._id || relationship.id,
    ...normalizeDates(relationship, ['createdAt', 'updatedAt']),
  };
}

/**
 * Mapea una lista de relaciones
 */
export function mapRelationships(relationships: any[]): any[] {
  if (!Array.isArray(relationships)) return [];
  return relationships.map(mapRelationship);
}

/**
 * Transformador genérico para RTK Query
 * Usa extractData para extraer datos de forma consistente
 */
export function createTransformResponse<T = any>(fallback?: T) {
  return (response: StandardApiResponse<T> | any): T => {
    const data = extractData<T>(response, fallback);
    if (data === undefined && fallback === undefined) {
      throw new Error('No se pudieron extraer datos de la respuesta');
    }
    return data || fallback!;
  };
}

/**
 * Transformador para respuestas de arrays
 */
export function createTransformArrayResponse<T = any>(fallback: T[] = []) {
  return (response: StandardApiResponse<T[]> | PaginatedApiResponse<T> | any): T[] => {
    return extractArray<T>(response, fallback);
  };
}

/**
 * Transformador para respuestas paginadas
 */
export function createTransformPaginatedResponse<T = any>() {
  return (
    response: PaginatedApiResponse<T> | any
  ): {
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  } => {
    return extractPaginated<T>(response);
  };
}

