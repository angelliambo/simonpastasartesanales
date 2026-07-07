import { SocialPost, SocialComment } from "@factory/shared/types/socialFeed";
import { memoryCache } from "../utils/cache";
import { FEATURES } from "@factory/shared/config/features";

/**
 * Servicio para obtener y cachear el feed de Instagram desde RapidAPI
 */
export class SocialFeedService {
  /**
   * Obtener las publicaciones más recientes del usuario de Instagram
   */
  static async getInstagramFeed(username: string): Promise<SocialPost[]> {
    const cacheKey = `social_feed:instagram:${username}`;
    const cachedData = memoryCache.get<SocialPost[]>(cacheKey);

    if (cachedData) {
      console.log(`[SOCIAL-FEED] Sirviendo feed de @${username} desde el caché en memoria`);
      return cachedData;
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    const host = process.env.RAPIDAPI_HOST;

    // Si no están configuradas las credenciales de RapidAPI, usar Mock Provider para evitar romper el boilerplate
    if (!apiKey || !host) {
      console.warn("[SOCIAL-FEED] RapidAPI no configurada. Usando Mock Social Provider para desarrollo local.");
      const mockFeed = this.getMockFeed(username);

      // Guardar el mock en cache por 10 minutos para dev local rápido
      memoryCache.set(cacheKey, mockFeed, 600);
      return mockFeed;
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

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} (${response.statusText}) al llamar a la URL: ${url}`);
      }

      const rawData = await response.json();

      // Validar errores de negocio en el payload de la API (evita cachear respuestas de error/parámetros inválidos)
      if (rawData && (rawData.message === "Missing or invalid user parameter" || rawData.error || rawData.status === "fail" || rawData.status === "error")) {
        throw new Error(rawData.message || rawData.error || "La API externa reportó un error de negocio.");
      }

      const posts = this.normalizeRapidApiResponse(rawData);

      // Ordenar explícitamente por fecha descendente (lo más reciente primero)
      const sortedPosts = posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      // Limitar cantidad de posts según variable de entorno (por defecto 6)
      const postsLimit = parseInt(process.env.INSTAGRAM_POSTS_LIMIT || '6', 10);
      const finalPosts = sortedPosts.slice(0, postsLimit);

      // Cachear por el tiempo configurado (por defecto 6 horas)
      const ttlMs = parseInt(process.env.SOCIAL_FEED_CACHE_TTL || '21600000', 10);
      const ttlSeconds = Math.max(60, Math.floor(ttlMs / 1000)); // Mínimo 1 minuto de cacheo de seguridad

      memoryCache.set(cacheKey, finalPosts, ttlSeconds);
      return finalPosts;
    } catch (error: any) {
      console.error(`[SOCIAL-FEED] Falló la consulta externa para @${username}. Se activa Fallback de Seguridad (Mock Feed). Detalle del error: ${error.message}`);
      const mockFeed = this.getMockFeed(username);

      // Cachear el mock por 5 minutos para evitar inundar los logs de re-intentos de error
      memoryCache.set(cacheKey, mockFeed, 300);
      return mockFeed;
    }
  }

  /**
   * Normaliza las diferentes variantes de payloads que devuelven los scrapers de RapidAPI
   */
  private static normalizeRapidApiResponse(rawData: any): SocialPost[] {
    // Buscar el array de publicaciones en el payload
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
      // Intento desesperado: buscar cualquier propiedad que sea un array
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
      // Si viene envuelto en edges de graphql
      const item = raw.node || raw;

      const id = item.id || item.pk || String(Math.random());

      // Extraer media_url
      let mediaUrl = item.media_url || item.display_url || item.image_versions2?.candidates?.[0]?.url || "";
      if (Array.isArray(item.carousel_media) && item.carousel_media.length > 0) {
        mediaUrl = item.carousel_media[0].media_url || item.carousel_media[0].display_url || mediaUrl;
      }

      // Extraer permalink
      const code = item.code || item.shortcode;
      const permalink = item.permalink || (code ? `https://instagram.com/p/${code}` : `https://instagram.com`);

      // Extraer caption (evitamos usar el accessibility_caption porque suele autogenerarse por IA en el idioma del proxy del scraper, ej: ruso)
      const caption = typeof item.caption === 'string'
        ? item.caption
        : (item.caption?.text || "");

      // Extraer media_type
      let mediaType: SocialPost['mediaType'] = 'IMAGE';
      const rawType = String(item.media_type || item.type || '').toUpperCase();
      if (rawType.includes('VIDEO') || rawType === '2') {
        mediaType = 'VIDEO';
      } else if (rawType.includes('CAROUSEL') || rawType.includes('ALBUM') || rawType === '8') {
        mediaType = 'CAROUSEL_ALBUM';
      }

      // Extraer timestamp (taken_at es UNIX timestamp, convertir a ISOString)
      const takenAt = item.taken_at || item.timestamp || item.created_time || Date.now() / 1000;
      const timestamp = new Date(takenAt * (takenAt < 10000000000 ? 1000 : 1)).toISOString();

      // Likes y comentarios
      const likesCount = item.like_count || item.likes_count || item.edge_media_preview_like?.count || 0;
      const commentsCount = item.comment_count || item.comments_count || item.edge_media_to_comment?.count || 0;

      // Extraer y normalizar comentarios respetando el límite configurable
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
        comments
      };
    });
  }

  /**
   * Genera un feed de prueba local (Mock) estético para no romper el desarrollo
   */
  private static getMockFeed(username: string): SocialPost[] {
    return [
      {
        id: "mock_post_1",
        mediaUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
        permalink: "https://instagram.com",
        caption: "🚀 ¡Habilitamos el feed en tiempo real para todos los sitios! El contacto con el mundo real y el feedback dinámico impulsan los testimoniales. #MERN #SaaS #Boilerplate",
        mediaType: "IMAGE",
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        likesCount: 154,
        commentsCount: 12,
        comments: [
          {
            id: "mc1",
            text: "¡Excelente arquitectura! Se ve súper fluido.",
            username: "dev_junior",
            timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString()
          },
          {
            id: "mc2",
            text: "La velocidad de carga no se ve afectada con el Intersection Observer.",
            username: "performance_guy",
            timestamp: new Date(Date.now() - 3600000 * 1).toISOString()
          }
        ]
      },
      {
        id: "mock_post_2",
        mediaUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
        permalink: "https://instagram.com",
        caption: "Diseño elegante adaptado al responsive y tema oscuro de la plataforma. La red de seguridad inteligente muestra testimonios default si hay demoras.",
        mediaType: "IMAGE",
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        likesCount: 98,
        commentsCount: 4,
        comments: [
          {
            id: "mc3",
            text: "¡El dark mode del grid quedó genial!",
            username: "css_ninja",
            timestamp: new Date(Date.now() - 3600000 * 20).toISOString()
          }
        ]
      },
      {
        id: "mock_post_3",
        mediaUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
        permalink: "https://instagram.com",
        caption: "Optimizando la cuota de RapidAPI con una caché de 6 horas configurada por variables de entorno. Escalable, barato y eficiente. ⚙️",
        mediaType: "IMAGE",
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        likesCount: 210,
        commentsCount: 8,
        comments: []
      }
    ];
  }
}
