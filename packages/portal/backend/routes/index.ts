import express from "express";
import rateLimit from "express-rate-limit";
import authTokenRoutes from "./authTokenRoutes";
import googleAuth from "./googleAuth";
import identityRoutes from "./identityRoutes";
import supportRoutes from "./supportRoutes";
import userRoutes from "./userRoutes";
import notificationRoutes from "./notificationRoutes";
import adminRoutes from "./debugRoutes";
import { checkFeature } from "../middleware/checkFeature";

const apiRoutes = express.Router();

// Limiter estricto para autenticación: 15 peticiones por cada 10 minutos por IP
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 15,
  message: {
    success: false,
    error: "Demasiados intentos de acceso desde esta IP. Por favor, intenta de nuevo en 10 minutos."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

apiRoutes.use("/auth", checkFeature("ENABLE_GOOGLE_AUTH"), authLimiter, authTokenRoutes);
apiRoutes.use("/auth", checkFeature("ENABLE_GOOGLE_AUTH"), authLimiter, googleAuth);
apiRoutes.use("/identity", identityRoutes);
apiRoutes.use("/support", checkFeature("ENABLE_TICKETING_SYSTEM"), supportRoutes);
apiRoutes.use("/user", userRoutes);
apiRoutes.use("/notification", notificationRoutes);
apiRoutes.use("/admin", adminRoutes);

export default apiRoutes;
