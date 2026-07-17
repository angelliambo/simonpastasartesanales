import express, { Request, Response } from "express";
import { SocialFeedService } from "../services/socialFeedService";
import { logger } from "../config/environment";

const router = express.Router();

/**
 * @route   GET /api/social-feed/instagram
 * @desc    Obtener publicaciones y comentarios recientes de Instagram (cacheados)
 * @access  Public
 */
router.get("/instagram", async (req: Request, res: Response) => {
  try {
    // Definir username por defecto
    const defaultUsername = process.env.INSTAGRAM_DEFAULT_USERNAME || "__INSTAGRAM_USERNAME__";
    
    // Validar query param opcional para admin/desarrollo
    const queryUsername = req.query.username as string;
    let usernameToFetch = defaultUsername;

    // Solo permitir consultar cuentas arbitrarias si hay una sesión válida o en desarrollo local
    if (queryUsername && queryUsername !== defaultUsername) {
      if (process.env.NODE_ENV === "development") {
        usernameToFetch = queryUsername;
      } else {
        logger.warn(`[SOCIAL-FEED] Intento de consulta no autorizado a la cuenta @${queryUsername} en producción.`);
        return res.status(403).json({
          success: false,
          error: "No tienes permisos para consultar perfiles arbitrarios de Instagram."
        });
      }
    }

    const result = await SocialFeedService.getInstagramFeed(usernameToFetch);

    return res.status(200).json({
      success: !result.quotaExceeded && !result.error,
      username: usernameToFetch,
      count: result.feed.length,
      feed: result.feed,
      quotaExceeded: result.quotaExceeded,
      fromCache: result.fromCache,
      error: result.error
    });
  } catch (error: any) {
    logger.error(`[SOCIAL-FEED] Error en endpoint /instagram: ${error.message}`);
    return res.status(200).json({
      success: false,
      feed: [],
      quotaExceeded: false,
      error: "Ocurrió un error al intentar traer la actividad de Instagram."
    });
  }
});

export default router;
