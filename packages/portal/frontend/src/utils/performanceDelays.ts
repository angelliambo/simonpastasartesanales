import { ENV_CONFIG } from "../config/environment";

/**
 * Configuración centralizada de delays para optimizaciones de performance.
 * Diferenciación por ambiente (local/prod) y dispositivo (mobile/desktop).
 * Valores basados en métricas Lighthouse (TBT, TTI, LCP).
 */

interface DelayConfig {
  mobile: number;
  desktop: number;
}

interface PerformanceDelays {
  fontLoading: DelayConfig;
  deferredComponents: DelayConfig;
  lazyProviders: DelayConfig;
  chatNotifications: DelayConfig;
  overlayManager: DelayConfig;
  preloadComponents: DelayConfig;
}

const DELAYS: {
  development: PerformanceDelays;
  production: PerformanceDelays;
} = {
  development: {
    // Local: Delays más cortos para desarrollo rápido
    fontLoading: {
      mobile: 2000, // Mobile local: delay moderado
      desktop: 300, // Desktop local: casi inmediato
    },
    deferredComponents: {
      mobile: 1000, // Mobile local: delay corto
      desktop: 0, // Desktop local: sin delay
    },
    lazyProviders: {
      mobile: 1500, // Mobile local: delay moderado
      desktop: 500, // Desktop local: delay mínimo
    },
    chatNotifications: {
      mobile: 2000, // Mobile local: delay moderado
      desktop: 800, // Desktop local: delay corto
    },
    overlayManager: {
      mobile: 2000, // Mobile local: delay moderado
      desktop: 1000, // Desktop local: delay corto
    },
    preloadComponents: {
      mobile: 2000, // Mobile local: delay moderado
      desktop: 1000, // Desktop local: delay corto
    },
  },
  production: {
    // Producción: Delays optimizados según métricas reales
    fontLoading: {
      mobile: 3500, // Mobile prod: delay más largo (conexión más lenta)
      desktop: 800, // Desktop prod: delay moderado
    },
    deferredComponents: {
      mobile: 2000, // Mobile prod: delay para no bloquear carga inicial
      desktop: 0, // Desktop prod: sin delay (mejor conexión)
    },
    lazyProviders: {
      mobile: 2500, // Mobile prod: delay más largo (no crítico)
      desktop: 1000, // Desktop prod: delay moderado
    },
    chatNotifications: {
      mobile: 3000, // Mobile prod: delay más largo (no crítico)
      desktop: 1200, // Desktop prod: delay moderado
    },
    overlayManager: {
      mobile: 3000, // Mobile prod: delay más largo (solo dev tools)
      desktop: 1500, // Desktop prod: delay moderado
    },
    preloadComponents: {
      mobile: 3000, // Mobile prod: delay más largo
      desktop: 1500, // Desktop prod: delay moderado
    },
  },
};

export const getPerformanceDelay = (
  key: keyof PerformanceDelays,
  isMobile: boolean
): number => {
  const environment = ENV_CONFIG.IS_PRODUCTION ? "production" : "development";
  const config = DELAYS[environment][key];
  return isMobile ? config.mobile : config.desktop;
};

export const getAllDelays = (isMobile: boolean): PerformanceDelays => {
  const environment = ENV_CONFIG.IS_PRODUCTION ? "production" : "development";
  const base = DELAYS[environment];

  return {
    fontLoading: {
      mobile: base.fontLoading.mobile,
      desktop: base.fontLoading.desktop,
    },
    deferredComponents: {
      mobile: base.deferredComponents.mobile,
      desktop: base.deferredComponents.desktop,
    },
    lazyProviders: {
      mobile: base.lazyProviders.mobile,
      desktop: base.lazyProviders.desktop,
    },
    chatNotifications: {
      mobile: base.chatNotifications.mobile,
      desktop: base.chatNotifications.desktop,
    },
    overlayManager: {
      mobile: base.overlayManager.mobile,
      desktop: base.overlayManager.desktop,
    },
    preloadComponents: {
      mobile: base.preloadComponents.mobile,
      desktop: base.preloadComponents.desktop,
    },
  };
};

export const scheduleWithIdleCallback = (
  callback: () => void,
  delay: number,
  timeout?: number
): (() => void) => {
  if (window.requestIdleCallback) {
    const idleId = window.requestIdleCallback(
      () => {
        setTimeout(callback, delay);
      },
      { timeout: timeout || delay + 1000 }
    );
    return () => window.cancelIdleCallback(idleId);
  } else {
    const timer = setTimeout(callback, delay);
    return () => clearTimeout(timer);
  }
};
