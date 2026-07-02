import mongoose from "mongoose";
import { config, logger, hideCredentials } from "./environment";
import User from "../models/userModel";

const MAX_RETRIES = 3;

export const connectDB = async (retryCount = 0): Promise<void> => {
  try {
    const mongoUri = config.BBD;
    logger.info("🗄️ [SERVER] Conectando a MongoDB...");
    logger.info("🗄️ [SERVER] URI:", hideCredentials(mongoUri));

    const options = {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
    };

    await mongoose.connect(mongoUri, options);
    logger.info("✅ [SERVER] Conectado a MongoDB exitosamente");

    if (!mongoose.connection.listeners("error").length) {
      mongoose.connection.on("error", (error) => {
        logger.error("❌ [MONGODB] Error de conexión:", error);
      });
    }

    if (!mongoose.connection.listeners("disconnected").length) {
      mongoose.connection.on("disconnected", () => {
        logger.warn("⚠️ [MONGODB] Desconectado de MongoDB");
      });
    }

    if (!mongoose.connection.listeners("reconnected").length) {
      mongoose.connection.on("reconnected", () => {
        logger.info("🔄 [MONGODB] Reconectado a MongoDB");
      });
    }
  } catch (error) {
    logger.error("❌ [MONGODB] Error al conectar:", error);

    if (!mongoose.connection.readyState) {
      if (retryCount < MAX_RETRIES) {
        logger.error(`❌ [MONGODB] No se pudo conectar. Reintentando en 5 segundos... (Intento ${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return connectDB(retryCount + 1);
      }

      logger.error(`❌ [MONGODB] No se pudo conectar después de ${MAX_RETRIES} intentos. Abortando.`);
      throw new Error(`No se pudo conectar a MongoDB después de ${MAX_RETRIES} intentos`);
    }
  }
};
