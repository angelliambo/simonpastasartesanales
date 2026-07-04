export const ENV_CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  PRODUCTION_API_URL: "https://api.yourdomain.com/api",
  DEVELOPMENT_API_URL: "http://localhost:5000/api",
};

export const getApiUrl = (): string => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  if (ENV_CONFIG.IS_PRODUCTION) {
    return ENV_CONFIG.PRODUCTION_API_URL;
  }
  return ENV_CONFIG.DEVELOPMENT_API_URL;
};

export const API_BASE_URL = getApiUrl();

export const ENVIRONMENT_CONFIG = {
  development: {
    apiUrl: "http://localhost:5000/api",
    debug: true,
    logLevel: "debug",
  },
  production: {
    apiUrl: "https://api.yourdomain.com/api",
    debug: false,
    logLevel: "error",
  },
  test: {
    apiUrl: "http://localhost:5000/api",
    debug: false,
    logLevel: "silent",
  },
};

export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || "development";
  return (
    ENVIRONMENT_CONFIG[env as keyof typeof ENVIRONMENT_CONFIG] ||
    ENVIRONMENT_CONFIG.development
  );
};
