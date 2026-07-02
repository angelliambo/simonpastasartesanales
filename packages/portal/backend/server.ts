import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import helmet from "helmet";
import apiRoutes from "./routes/index";
import webhookRoutes from "./routes/webhookRoutes";
import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config, logger, displayConfig } from "./config/environment";
import rateLimit from "express-rate-limit";
import { checkFeature } from "./middleware/checkFeature";

const app = express();

// Confiar en el proxy (Cloudflare/Fly.dev) para leer la IP real del cliente
app.set("trust proxy", 1);

// Limiter general: 150 peticiones por cada 15 minutos por IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  message: {
    success: false,
    error: "Demasiadas peticiones desde esta IP. Por favor, intenta de nuevo más tarde."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

logger.info("🚀 [SERVER] Iniciando servidor ZenithNexus Portal");
displayConfig();

app.use(
  express.json({
    limit: "10mb",
    verify: (req: any, _res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/webhooks", checkFeature("ENABLE_BILLING_LEMON"), webhookRoutes);

app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-God-Mode",
    ],
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

logger.info("🔧 [SERVER] Middleware configurado");

app.use("/api", apiLimiter, apiRoutes);

app.get("/", (_req: Request, res: Response) => {
  logger.debug("🏥 [SERVER] Health check solicitado");
  res.json({
    message: "ZenithNexus Portal API",
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "2.1.0",
    environment: config.NODE_ENV,
  });
});

app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.request(req);
  next();
});

app.use((error: Error, _req: Request, _res: Response, _next: NextFunction) => {
  logger.errorDetails(error, _req);
  _next(error);
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    error: error.message,
    stack: config.ENABLE_DETAILED_ERRORS ? error.stack : undefined,
    timestamp: new Date().toISOString(),
    path: _req.path,
  });
});

const startServer = async () => {
  try {
    logger.info("🗄️ [SERVER] Conectando a MongoDB...");
    await connectDB();

    // Drop legacy email_1 index if present (migration from old schema)
    try {
      const User = (await import("./models/userModel")).default;
      const idx = await User.collection?.indexExists("email_1");
      if (idx) {
        await User.collection?.dropIndex("email_1");
        logger.info("🗑️ [DB] Índice legacy email_1 eliminado");
      }
    } catch {
      /* ignorar si falla */
    }

    const server = createServer(app);

    const gracefulShutdown = async (signal: string) => {
      logger.info(`🛑 [SERVER] Señal ${signal} recibida. Cerrando servidor...`);

      server.close(() => {
        logger.info("✅ [SERVER] Servidor HTTP cerrado");
      });

      const { memoryCache } = await import("./utils/cache");
      memoryCache.cleanup();

      const mongoose = await import("mongoose");
      mongoose.default.connection.close().then(() => {
        logger.info("✅ [SERVER] Conexión a MongoDB cerrada");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    process.on("uncaughtException", (error: Error) => {
      logger.error("❌ [SERVER] Error no capturado:", error);
    });

    process.on("unhandledRejection", (reason: any) => {
      logger.error("❌ [SERVER] Promesa rechazada no manejada:", reason);
    });

    server.listen(config.PORT, "0.0.0.0", () => {
      logger.info(`🌐 [SERVER] URL: http://0.0.0.0:${config.PORT}`);
      logger.info(`🏥 [SERVER] Health Check: http://localhost:${config.PORT}/`);
      logger.info(`🔧 [SERVER] Ambiente: ${config.NODE_ENV}`);
    });
  } catch (error) {
    logger.error("❌ [SERVER] Error fatal al iniciar servidor:", error);
    process.exit(1);
  }
};

startServer();
