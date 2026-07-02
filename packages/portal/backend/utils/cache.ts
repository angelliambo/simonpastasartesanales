// backend/utils/cache.ts
// Sistema de caché en memoria simple para optimización de rendimiento
// TTL (Time To Live) configurable por tipo de dato

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class MemoryCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private maxSize: number;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(maxSize: number = 1000) {
    this.maxSize = maxSize;
    // Limpiar entradas expiradas cada 5 minutos
    this.cleanupInterval = setInterval(
      () => this.cleanExpired(),
      5 * 60 * 1000
    );
  }

  /**
   * Limpiar intervalos y caché en shutdown del servidor
   * Previene memory leaks al desmontar el servicio de caché
   */
  cleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.cache.clear();
  }

  /**
   * Obtener valor del caché
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Verificar si expiró
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Guardar valor en caché con TTL
   */
  set<T>(key: string, value: T, ttlSeconds: number = 300): void {
    // Si el caché está lleno, eliminar entrada más antigua
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, {
      data: value,
      expiresAt,
    });
  }

  /**
   * Eliminar entrada del caché
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Limpiar todo el caché
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Limpiar entradas expiradas
   */
  private cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Obtener estadísticas del caché
   */
  getStats() {
    const now = Date.now();
    let expiredCount = 0;
    for (const entry of this.cache.values()) {
      if (now > entry.expiresAt) {
        expiredCount++;
      }
    }
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      expired: expiredCount,
      active: this.cache.size - expiredCount,
    };
  }
}

// Instancia global del caché
export const memoryCache = new MemoryCache(1000);

// TTLs predefinidos por tipo de dato
export const CACHE_TTL = {
  USER: 300, // 5 minutos para datos de usuario
  DASHBOARD_STATS: 60, // 1 minuto para estadísticas de dashboard
  GAME_STATS: 120, // 2 minutos para estadísticas de juegos
  USER_SEARCH: 180, // 3 minutos para búsquedas de usuarios
  TOKEN_USER: 600, // 10 minutos para cachear usuario por token (autoRefreshToken)
  PROGRESS_SUMMARY: 120, // 2 minutos para resumen de progreso
} as const;

// Helpers para keys comunes
export const getCacheKey = {
  user: (userId: string) => `user:${userId}`,
  userByToken: (token: string) => `user:token:${token}`,
  dashboardStats: (therapistId: string) => `dashboard:stats:${therapistId}`,
  dashboardSummary: (userId: string) => `dashboard:summary:${userId}`,
  gameStats: (userId: string) => `game:stats:${userId}`,
  userSearch: (query: string) => `user:search:${query}`,
  progressSummary: (userId: string) => `progress:summary:${userId}`,
} as const;
