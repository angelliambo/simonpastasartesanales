import dotenv from "dotenv";
import path from "path";
import { existsSync } from "fs";

const loadEnvironment = () => {
  const nodeEnv = process.env.NODE_ENV || "development";
  process.env.NODE_ENV = nodeEnv;

  let envFile = path.resolve(__dirname, `../../.env.${nodeEnv}`);

  if (!existsSync(envFile)) {
    envFile = path.resolve(__dirname, `../.env.${nodeEnv}`);
  }

  try {
    if (existsSync(envFile)) {
      dotenv.config({ path: envFile });
      console.log(`🔧 [ENV] Cargando configuración para ambiente: ${nodeEnv} desde ${envFile}`);
    } else {
      // Fallback a .env
      const dotEnvFile = path.resolve(__dirname, `../.env`);
      if (existsSync(dotEnvFile)) {
        dotenv.config({ path: dotEnvFile });
        console.log(`🔧 [ENV] Cargando desde .env (fallback)`);
      } else {
        console.warn(`⚠️ [ENV] No se encontró archivo de configuración: ${envFile} ni .env`);
      }
    }

    // Sincronizar  prefixed vars a sus nombres originales
    // para compatibilidad con código que lee directamente de process.env
    const legacyToOriginal: [string, string][] = [
      ["NODE_ENV", "NODE_ENV"],
      ["PORT", "PORT"],
      ["FRONTEND_URL", "FRONTEND_URL"],
      ["JWT_SECRET_KEY", "JWT_SECRET_KEY"],
    ];
    for (const [legacy, original] of legacyToOriginal) {
      if (process.env[legacy] && !process.env[original]) {
        process.env[original] = process.env[legacy];
      }
    }
  } catch (error) {
    console.warn(`⚠️ [ENV] Error cargando archivo: ${error}`);
    dotenv.config();
  }
};

export interface EnvironmentConfig {
  NODE_ENV: string;
  PORT: number;
  FRONTEND_URL: string;
  BBD: string;
  JWT_SECRET_KEY: string;
  JWT_EXPIRES_IN: string;
  JWT_EXPIRES_IN_SECONDS: number;
  LOG_LEVEL: "debug" | "info" | "warn" | "error";
  LOG_REQUESTS: boolean;
  LOG_ERRORS: boolean;
  ENABLE_REQUEST_LOGGING: boolean;
  ENABLE_ERROR_LOGGING: boolean;
  ENABLE_DETAILED_ERRORS: boolean;
  IS_DEVELOPMENT: boolean;
  IS_PRODUCTION: boolean;
  LEMONSQUEEZY_API_KEY: string;
  LEMONSQUEEZY_STORE_ID: string;
  LEMONSQUEEZY_WEBHOOK_SECRET: string;
  CONTACT_EMAIL: string;
}

loadEnvironment();

function parseDuration(duration: string, defaultDays: number): number {
  const match = duration.match(/^(\d+)\s*(d|day|days|h|hour|hours|m|min|mins|s|sec|secs)?$/i);
  if (!match) return defaultDays * 86400;
  const val = parseInt(match[1], 10);
  const unit = (match[2] || "d").toLowerCase()[0];
  switch (unit) {
    case "d": return val * 86400;
    case "h": return val * 3600;
    case "m": return val * 60;
    case "s": return val;
    default: return defaultDays * 86400;
  }
}

const hideCredentials = (uri: string): string => {
  if (!uri) return "***";
  if (uri.includes("mongodb://") || uri.includes("mongodb+srv://")) {
    return uri.replace(/:\/\/([^:]+):([^@]+)@/, "://***:***@");
  }
  if (uri.length > 20) {
    return uri.substring(0, 8) + "***" + uri.substring(uri.length - 8);
  }
  return "***";
};

export const config: EnvironmentConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  BBD: process.env.BBD || "mongodb://localhost:27017/zenithnexus-dev",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "__MUST_SET_JWT_SECRET__",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "180d",
  JWT_EXPIRES_IN_SECONDS: parseDuration(process.env.JWT_EXPIRES_IN || "180d", 180),
  LOG_LEVEL: (process.env.LOG_LEVEL as any) || "debug",
  LOG_REQUESTS: process.env.LOG_REQUESTS === "true",
  LOG_ERRORS: process.env.LOG_ERRORS === "true",
  ENABLE_REQUEST_LOGGING: process.env.ENABLE_REQUEST_LOGGING === "true",
  ENABLE_ERROR_LOGGING: process.env.ENABLE_ERROR_LOGGING === "true",
  ENABLE_DETAILED_ERRORS: process.env.ENABLE_DETAILED_ERRORS === "true",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY || "",
  LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID || "",
  LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "",
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || "info@<domain>",
};

export const logger = {
  debug: (message: string, ...args: any[]) => {
    if (["debug"].includes(config.LOG_LEVEL)) {
      console.log(`🐛 [DEBUG] ${message}`, ...args);
    }
  },
  info: (message: string, ...args: any[]) => {
    if (["debug", "info"].includes(config.LOG_LEVEL)) {
      console.log(`ℹ️ [INFO] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (["debug", "info", "warn"].includes(config.LOG_LEVEL)) {
      console.warn(`⚠️ [WARN] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: any[]) => {
    console.error(`💥 [ERROR] ${message}`, ...args);
  },
  request: (req: any) => {
    if (config.ENABLE_REQUEST_LOGGING) {
      console.log(`📥 [REQUEST] ${req.method} ${req.path} - ${new Date().toISOString()}`);
    }
  },
  errorDetails: (error: Error, req?: any) => {
    if (config.ENABLE_ERROR_LOGGING || config.IS_PRODUCTION) {
      const errorInfo = {
        message: error.message,
        stack: config.ENABLE_DETAILED_ERRORS ? error.stack : undefined,
        path: req?.path,
        method: req?.method,
        timestamp: new Date().toISOString(),
      };
      console.error("💥 [ERROR] Error en servidor:", errorInfo);
    }
  },
};

export const displayConfig = () => {
  console.log("🔧 [CONFIG] Configuración del servidor:");
  console.log(`   Ambiente: ${config.NODE_ENV}`);
  console.log(`   Puerto: ${config.PORT}`);
  console.log(`   Frontend URL: ${config.FRONTEND_URL}`);
  console.log(`   MongoDB URI (BBD): ${hideCredentials(config.BBD)}`);
  console.log(`   Logging Requests: ${config.ENABLE_REQUEST_LOGGING ? "✅" : "❌"}`);
  console.log(`   Logging Errors: ${config.ENABLE_ERROR_LOGGING ? "✅" : "❌"}`);
  console.log(`   Detailed Errors: ${config.ENABLE_DETAILED_ERRORS ? "✅" : "❌"}`);
  console.log(`   Log Level: ${config.LOG_LEVEL}`);
  console.log(`   LemonSqueezy: ${config.LEMONSQUEEZY_API_KEY ? "✅ Configurado" : "❌ Sin API key"}`);
};

export { hideCredentials };

export default config;
