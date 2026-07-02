import { Request, Response, NextFunction } from "express";
import { FEATURES } from "@factory/shared/config/features";

export const checkFeature = (featureName: keyof typeof FEATURES) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const isEnabled = FEATURES[featureName];
      if (!isEnabled) {
        return res.status(404).json({
          success: false,
          error: `El recurso solicitado no está disponible en esta configuración.`,
        });
      }
      next();
    } catch (err) {
      console.error(`[FEATURE-MIDDLEWARE] Error al validar flag ${featureName}:`, err);
      next(err);
    }
  };
};
