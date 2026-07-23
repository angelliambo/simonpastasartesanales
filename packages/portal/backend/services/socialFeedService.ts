import fs from "fs";
import path from "path";
import { SocialPost, SocialComment } from "@factory/shared/types/socialFeed";
import { memoryCache } from "../utils/cache";
import { FEATURES } from "@factory/shared/config/features";

export interface InstagramFeedResponse {
  feed: SocialPost[];
  quotaExceeded: boolean;
  fromCache: boolean;
  error?: string;
}

interface DiskCacheEntry {
  username: string;
  posts: SocialPost[];
  cachedAt: number;
  expiresAt: number;
  quotaExceeded: boolean;
}

/**
 * Servicio para obtener y cachear el feed de Instagram desde RapidAPI
 * Aplica regla de 1 consulta cada 10 días, persistida en disco para sobrevivir reinicios,
 * limitando a las 3 publicaciones más recientes para no exceder 30 sol/mes.
 */
export class SocialFeedService {
  private static getCacheFilePath(): string {
    const dir = path.join(__dirname, "../data");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return path.join(dir, "instagram_cache.json");
  }

  private static readDiskCache(username: string): DiskCacheEntry | null {
    try {
      const filePath = this.getCacheFilePath();
      if (!fs.existsSync(filePath)) return null;

      const fileContent = fs.readFileSync(filePath, "utf-8");
      const diskEntry: DiskCacheEntry = JSON.parse(fileContent);

      if (diskEntry.username === username) {
        return diskEntry;
      }
      return null;
    } catch (err) {
      console.warn("[SOCIAL-FEED] No se pudo leer el archivo de caché en disco:", err);
      return null;
    }
  }

  private static writeDiskCache(entry: DiskCacheEntry): void {
    try {
      const filePath = this.getCacheFilePath();
      fs.writeFileSync(filePath, JSON.stringify(entry, null, 2), "utf-8");
    } catch (err) {
      console.error("[SOCIAL-FEED] Error guardando el caché de Instagram en disco:", err);
    }
  }

  /**
   * Obtener las publicaciones más recientes del usuario de Instagram (máx 3, caché 10 días)
   */
  static async getInstagramFeed(username: string): Promise<InstagramFeedResponse> {
    const cacheKey = `social_feed:instagram:${username}`;
    const tenDaysInSeconds = 10 * 24 * 60 * 60; // 864000s = 10 días
    const ttlMs = parseInt(process.env.SOCIAL_FEED_CACHE_TTL || String(tenDaysInSeconds * 1000), 10);
    const ttlSeconds = Math.max(60, Math.floor(ttlMs / 1000));
    const postsLimit = parseInt(process.env.INSTAGRAM_POSTS_LIMIT || '3', 10);

    // 1. Revisar caché en memoria primero
    const cachedMemory = memoryCache.get<InstagramFeedResponse>(cacheKey);
    if (cachedMemory) {
      console.log(`[SOCIAL-FEED] Sirviendo feed de @${username} desde el caché en memoria (10 días)`);
      return cachedMemory;
    }

    // 2. Revisar caché en disco (para sobrevivir a reinicios del backend)
    const diskCache = this.readDiskCache(username);
    const now = Date.now();

    if (diskCache) {
      // Si el caché en disco registraba quotaExceeded y fue grabado hace menos de 24 hs
      if (diskCache.quotaExceeded && (now - diskCache.cachedAt < 24 * 60 * 60 * 1000)) {
        console.warn(`[SOCIAL-FEED] Cuota excedida previamente registrada en disco para @${username}. Se omite consulta a RapidAPI.`);
        const quotaResponse: InstagramFeedResponse = {
          feed: [],
          quotaExceeded: true,
          fromCache: true,
          error: "Cuota mensual de RapidAPI excedida."
        };
        memoryCache.set(cacheKey, quotaResponse, 3600); // 1 hora en memoria
        return quotaResponse;
      }

      // Si el caché en disco sigue vigente (dentro de los 10 días)
      if (now < diskCache.expiresAt && Array.isArray(diskCache.posts) && diskCache.posts.length > 0) {
        console.log(`[SOCIAL-FEED] Restaurando caché vigente de 10 días desde disco para @${username}`);
        const validResponse: InstagramFeedResponse = {
          feed: diskCache.posts.slice(0, postsLimit),
          quotaExceeded: false,
          fromCache: true
        };
        const remainingSeconds = Math.max(60, Math.floor((diskCache.expiresAt - now) / 1000));
        memoryCache.set(cacheKey, validResponse, remainingSeconds);
        return validResponse;
      }
    }

    // 3. Si no hay caché válido, consultar a RapidAPI
    const apiKey = process.env.RAPIDAPI_KEY;
    const host = process.env.RAPIDAPI_HOST;

    if (!apiKey || !host) {
      console.warn("[SOCIAL-FEED] RapidAPI no configurada. Usando Mock Social Provider para desarrollo local.");
      const mockFeed = this.getMockFeed(username).slice(0, postsLimit);
      const mockResponse: InstagramFeedResponse = {
        feed: mockFeed,
        quotaExceeded: false,
        fromCache: false
      };
      memoryCache.set(cacheKey, mockResponse, ttlSeconds);
      this.writeDiskCache({
        username,
        posts: mockFeed,
        cachedAt: now,
        expiresAt: now + ttlSeconds * 1000,
        quotaExceeded: false
      });
      return mockResponse;
    }

    try {
      const endpoint = process.env.RAPIDAPI_ENDPOINT || '/user/posts';
      let paramName = process.env.RAPIDAPI_PARAM_NAME;
      if (!paramName) {
        paramName = (host && host.includes('flashapi1')) ? 'user' : 'username';
      }
      let url = "";
      if (endpoint.includes('{username}')) {
        url = `https://${host}${endpoint.replace('{username}', encodeURIComponent(username))}`;
      } else {
        const querySymbol = endpoint.includes('?') ? '&' : '?';
        url = `https://${host}${endpoint}${querySymbol}${paramName}=${encodeURIComponent(username)}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': host,
          'Accept': 'application/json'
        }
      });

      // Detectar códigos de status de cuota o restricción (429, 403, 402, 304, etc.)
      const isQuotaStatus = [429, 403, 402, 304].includes(response.status);
      if (isQuotaStatus) {
        console.error(`[SOCIAL-FEED] RapidAPI devolvió status ${response.status} de límite de cuota/créditos.`);
        return this.handleQuotaExceeded(username, cacheKey, `HTTP ${response.status} - Límite de cuota excedido`);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} (${response.statusText}) al llamar a la URL: ${url}`);
      }

      const rawData = await response.json();

      // Validar mensajes de error de cuota o negocio en el payload
      const rawMsg = String(rawData?.message || rawData?.error || rawData?.status || "").toLowerCase();
      if (rawMsg.includes("quota") || rawMsg.includes("rate limit") || rawMsg.includes("exceeded") || rawMsg.includes("credit") || rawMsg.includes("subscription")) {
        console.error(`[SOCIAL-FEED] RapidAPI reportó error de cuota en el payload: ${rawMsg}`);
        return this.handleQuotaExceeded(username, cacheKey, rawData?.message || rawData?.error || "Cuota de API agotada");
      }

      if (rawData && (rawData.message === "Missing or invalid user parameter" || rawData.error || rawData.status === "fail" || rawData.status === "error")) {
        throw new Error(rawData.message || rawData.error || "La API externa reportó un error de negocio.");
      }

      const posts = this.normalizeRapidApiResponse(rawData);

      // Asignar el username consultado como fallback en cada post si viene vacío
      const postsWithUsername = posts.map(p => ({
        ...p,
        username: p.username || username
      }));

      // Ordenar por fecha descendente
      const sortedPosts = postsWithUsername.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      // Tomar estrictamente los 3 posts más nuevos (o la cantidad en INSTAGRAM_POSTS_LIMIT)
      const finalPosts = sortedPosts.slice(0, postsLimit);

      const successResponse: InstagramFeedResponse = {
        feed: finalPosts,
        quotaExceeded: false,
        fromCache: false
      };

      // Guardar en caché en memoria y disco por 10 días
      memoryCache.set(cacheKey, successResponse, ttlSeconds);
      this.writeDiskCache({
        username,
        posts: finalPosts,
        cachedAt: now,
        expiresAt: now + ttlSeconds * 1000,
        quotaExceeded: false
      });

      return successResponse;
    } catch (error: any) {
      console.error(`[SOCIAL-FEED] Error en consulta para @${username}: ${error.message}`);
      
      // Si tenemos publicaciones cacheadas en disco previas (aunque hayan caducado), las usamos de respaldo
      if (diskCache && Array.isArray(diskCache.posts) && diskCache.posts.length > 0 && !diskCache.quotaExceeded) {
        console.warn("[SOCIAL-FEED] Usando respaldo de disco previo tras fallo de consulta externa.");
        return {
          feed: diskCache.posts.slice(0, postsLimit),
          quotaExceeded: false,
          fromCache: true
        };
      }

      // Si no hay datos, retornar error
      return {
        feed: [],
        quotaExceeded: false,
        fromCache: false,
        error: error.message
      };
    }
  }

  /**
   * Manejador centralizado para cuota excedida
   */
  private static handleQuotaExceeded(username: string, cacheKey: string, errorMsg: string): InstagramFeedResponse {
    const now = Date.now();
    const quotaResponse: InstagramFeedResponse = {
      feed: [],
      quotaExceeded: true,
      fromCache: false,
      error: errorMsg
    };

    // Guardar estado de cuota excedida en disco (por 24 horas)
    this.writeDiskCache({
      username,
      posts: [],
      cachedAt: now,
      expiresAt: now + 24 * 60 * 60 * 1000,
      quotaExceeded: true
    });

    // Guardar en memoria
    memoryCache.set(cacheKey, quotaResponse, 3600);
    return quotaResponse;
  }

  /**
   * Normaliza las diferentes variantes de payloads que devuelven los scrapers de RapidAPI
   */
  private static normalizeRapidApiResponse(rawData: any): SocialPost[] {
    let rawPosts: any[] = [];

    if (Array.isArray(rawData)) {
      rawPosts = rawData;
    } else if (rawData && Array.isArray(rawData.data)) {
      rawPosts = rawData.data;
    } else if (rawData && rawData.response && Array.isArray(rawData.response.body)) {
      rawPosts = rawData.response.body;
    } else if (rawData && rawData.graphql?.user?.edge_owner_to_timeline_media?.edges) {
      rawPosts = rawData.graphql.user.edge_owner_to_timeline_media.edges;
    } else if (rawData && rawData.items && Array.isArray(rawData.items)) {
      rawPosts = rawData.items;
    } else if (rawData && typeof rawData === 'object') {
      for (const key of Object.keys(rawData)) {
        if (Array.isArray(rawData[key])) {
          rawPosts = rawData[key];
          break;
        }
      }
    }

    if (rawPosts.length === 0) {
      console.warn("[SOCIAL-FEED] No se encontraron publicaciones en el payload de RapidAPI:", JSON.stringify(rawData).slice(0, 200));
      return [];
    }

    return rawPosts.map((raw: any) => {
      const item = raw.node || raw;
      const id = item.id || item.pk || String(Math.random());

      let mediaUrl = item.media_url || item.display_url || item.image_versions2?.candidates?.[0]?.url || "";
      if (Array.isArray(item.carousel_media) && item.carousel_media.length > 0) {
        mediaUrl = item.carousel_media[0].media_url || item.carousel_media[0].display_url || mediaUrl;
      }

      const code = item.code || item.shortcode;
      const permalink = item.permalink || (code ? `https://instagram.com/p/${code}` : `https://instagram.com`);

      const caption = typeof item.caption === 'string'
        ? item.caption
        : (item.caption?.text || "");

      let mediaType: SocialPost['mediaType'] = 'IMAGE';
      const rawType = String(item.media_type || item.type || '').toUpperCase();
      if (rawType.includes('VIDEO') || rawType === '2') {
        mediaType = 'VIDEO';
      } else if (rawType.includes('CAROUSEL') || rawType.includes('ALBUM') || rawType === '8') {
        mediaType = 'CAROUSEL_ALBUM';
      }

      const takenAt = item.taken_at || item.timestamp || item.created_time || Date.now() / 1000;
      const timestamp = new Date(takenAt * (takenAt < 10000000000 ? 1000 : 1)).toISOString();

      const likesCount = item.like_count || item.likes_count || item.edge_media_preview_like?.count || 0;
      const commentsCount = item.comment_count || item.comments_count || item.edge_media_to_comment?.count || 0;

      const envLimit = process.env.INSTAGRAM_COMMENTS_LIMIT;
      const commentsLimit = envLimit ? parseInt(envLimit, 10) : FEATURES.INSTAGRAM_COMMENTS_LIMIT;

      let comments: SocialComment[] = [];
      const rawComments = item.comments || item.edge_media_to_comment?.edges || [];
      if (Array.isArray(rawComments)) {
        comments = rawComments.slice(0, commentsLimit).map((c: any) => {
          const commentNode = c.node || c;
          return {
            id: commentNode.id || commentNode.pk || String(Math.random()),
            text: commentNode.text || commentNode.text_content || "",
            username: commentNode.user?.username || commentNode.owner?.username || "usuario_instagram",
            timestamp: new Date((commentNode.created_at || commentNode.created_time || Date.now() / 1000) * 1000).toISOString()
          };
        });
      }

      return {
        id,
        mediaUrl,
        permalink,
        caption,
        mediaType,
        timestamp,
        likesCount,
        commentsCount,
        comments,
        username: item.user?.username || item.owner?.username || item.username || ""
      };
    });
  }

  /**
   * Genera un feed de prueba local (Mock) estético para no romper el desarrollo
   */
  private static getMockFeed(username: string): SocialPost[] {
    const cleanUsername = username.replace(/^@/, '');
    return [
      {
        id: "mock_post_1",
        mediaUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
        permalink: `https://instagram.com/${cleanUsername}`,
        caption: "🥟 ¡Recién salidos! Elaboramos nuestros sorrentinos artesanales con ingredientes de primera selección. Pedí los tuyos para este fin de semana en Bernal y Zona Sur. #PastasArtesanales #PastasSimon #Bernal",
        mediaType: "IMAGE",
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        likesCount: 154,
        commentsCount: 12,
        username: cleanUsername,
        comments: [
          {
            id: "mc1",
            text: "¡Los de jamón y queso con masa de espinaca son de otro planeta! Excelente calidad.",
            username: "laura_gourmet",
            timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString()
          },
          {
            id: "mc2",
            text: "Los mejores sorrentinos de toda la Zona Sur, recomendadísimos.",
            username: "carlos_foodie",
            timestamp: new Date(Date.now() - 3600000 * 1).toISOString()
          }
        ]
      },
      {
        id: "mock_post_2",
        mediaUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
        permalink: `https://instagram.com/${cleanUsername}`,
        caption: "📦 Calidad y frescura directa a tu mesa. Envasamos nuestras pastas frescas congeladas en prácticas cajas para que conserven todo su sabor y textura original. ¡Ideales para restaurantes, rotiserías y caterings! #ServicioMayorista #PastasCongeladas",
        mediaType: "IMAGE",
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        likesCount: 98,
        commentsCount: 4,
        username: cleanUsername,
        comments: [
          {
            id: "mc3",
            text: "Excelente presentación de las cajas y la entrega súper rápida en Quilmes.",
            username: "bodegon_bernal",
            timestamp: new Date(Date.now() - 3600000 * 20).toISOString()
          }
        ]
      },
      {
        id: "mock_post_3",
        mediaUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
        permalink: `https://instagram.com/${cleanUsername}`,
        caption: "🇮🇹 Tradición artesanal en cada preparación. ¿Ya probaste nuestros ravioles caseros y panzottis? Hacé tu pedido por WhatsApp y disfrutá del verdadero sabor casero. 🛵 #RecetasFamiliares #SimonPastas",
        mediaType: "IMAGE",
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        likesCount: 210,
        commentsCount: 8,
        username: cleanUsername,
        comments: []
      }
    ];
  }
}
