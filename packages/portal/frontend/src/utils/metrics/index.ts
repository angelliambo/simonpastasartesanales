import { observeCoreWebVitals, getRecordedWebVitals } from './coreWebVitals';
import { parseTrafficAttribution, detectBotOrCrawler } from './trafficSources';
import { runSEOAudit } from './seoAudit';
import { initEngagementTracking, getEngagementMetrics } from './userEngagement';
import { getPrerenderDiagnostics } from './prerenderTracker';
import { MetricsSuiteReport } from './types';

/**
 * Suite Unificada de Métricas, Tráfico y Auditoría SEO
 * Fábrica de Pastas Simón
 */

export * from './types';
export * from './coreWebVitals';
export * from './trafficSources';
export * from './seoAudit';
export * from './userEngagement';
export * from './prerenderTracker';

let isInitialized = false;

export function initMetricsSuite(): MetricsSuiteReport | null {
  if (typeof window === 'undefined') return null;
  if (isInitialized) {
    return generateMetricsReport();
  }

  isInitialized = true;

  // 1. Iniciar observación de Core Web Vitals
  observeCoreWebVitals();

  // 2. Iniciar rastreo de participación de usuario
  initEngagementTracking();

  // 3. Obtener atribución de tráfico y detección de bots
  parseTrafficAttribution();
  detectBotOrCrawler();

  return generateMetricsReport();
}

export function generateMetricsReport(): MetricsSuiteReport {
  return {
    webVitals: getRecordedWebVitals(),
    attribution: parseTrafficAttribution(),
    botInfo: detectBotOrCrawler(),
    seoAudit: runSEOAudit(),
    engagement: getEngagementMetrics(),
    prerender: getPrerenderDiagnostics()
  };
}
