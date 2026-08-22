/**
 * FASE 2: ANÁLISIS INDIVIDUAL (Component Numerical & Anomaly Analyzer)
 * MERN SaaS Factory Analytics Optimizer Tool
 */

import { ANALYTICS_CONFIG } from './config';
import { ComponentIndividualDiagnosis, ComponentRawTelemetry } from './types';

export class AnalyticsAnalyzer {
  /**
   * Ejecuta el análisis numérico individual y diagnóstico de anomalías para un componente.
   */
  public analyzeComponent(telemetry: ComponentRawTelemetry): ComponentIndividualDiagnosis {
    const { metrics, componentId, componentName } = telemetry;

    // 1. Puntuación de Tráfico / Carga (0-100)
    const bounceRatePenalty = Math.max(0, (metrics.bounceRate * 100 - ANALYTICS_CONFIG.benchmarks.maxBounceRatePercent) * 1.5);
    const engagementBonus = Math.min(30, metrics.engagementRate * 40);
    const trafficHealthScore = Math.round(Math.max(10, Math.min(100, 70 + engagementBonus - bounceRatePenalty)));

    // 2. Puntuación de Conversión (0-100)
    const landingViews = metrics.landingViews || metrics.pageViews;
    const ctaClicks = metrics.ctaClicks || 0;
    const conversionRate = (ctaClicks / (landingViews || 1)) * 100;
    const conversionHealthScore = Math.round(
      Math.max(10, Math.min(100, (conversionRate / ANALYTICS_CONFIG.benchmarks.minPortalConversionPercent) * 80))
    );

    // 3. Puntuación de Retención (0-100)
    const dauToMauPercent = metrics.dauToMauRatio * 100;
    const retentionHealthScore = Math.round(
      Math.max(10, Math.min(100, (dauToMauPercent / ANALYTICS_CONFIG.benchmarks.minDauToMauRatioPercent) * 70 + (metrics.avgSessionDurationSec > 150 ? 20 : 10)))
    );

    // 4. Puntuación de Estabilidad Técnicamente Telemetrada (0-100)
    const errorRatePercent = (metrics.telemetryErrorEvents / (metrics.sessions || 1)) * 100;
    const stabilityPenalty = (errorRatePercent / ANALYTICS_CONFIG.benchmarks.maxTelemetryErrorRatePercent) * 30;
    const stabilityHealthScore = Math.round(Math.max(10, Math.min(100, 100 - stabilityPenalty)));

    // 5. Puntuación Global del Componente
    const overallScore = Math.round(
      trafficHealthScore * 0.25 + conversionHealthScore * 0.35 + retentionHealthScore * 0.25 + stabilityHealthScore * 0.15
    );

    // Detección de Anomalías Numéricas
    const anomaliesDetected: ComponentIndividualDiagnosis['anomaliesDetected'] = [];

    if (errorRatePercent > ANALYTICS_CONFIG.benchmarks.maxTelemetryErrorRatePercent) {
      anomaliesDetected.push({
        severity: 'critical',
        metric: 'Telemetry Error Rate',
        description: `La tasa de errores telemetrados (${errorRatePercent.toFixed(2)}%) supera el umbral límite del ${ANALYTICS_CONFIG.benchmarks.maxTelemetryErrorRatePercent}%.`,
        impact: 'Posible degradación de la experiencia del usuario o cuellos de botella en la API.',
      });
    }

    if (conversionRate < ANALYTICS_CONFIG.benchmarks.minPortalConversionPercent) {
      anomaliesDetected.push({
        severity: 'warning',
        metric: 'Portal CTA Conversion',
        description: `La tasa de conversión del CTA en la Landing Page (${conversionRate.toFixed(2)}%) está por debajo del benchmark (${ANALYTICS_CONFIG.benchmarks.minPortalConversionPercent}%).`,
        impact: 'Fricción en la adquisición y registro de nuevos usuarios.',
      });
    }

    if (metrics.bounceRate * 100 > ANALYTICS_CONFIG.benchmarks.maxBounceRatePercent) {
      anomaliesDetected.push({
        severity: 'warning',
        metric: 'Bounce Rate',
        description: `La tasa de rebote (${(metrics.bounceRate * 100).toFixed(1)}%) supera el umbral recomendado (${ANALYTICS_CONFIG.benchmarks.maxBounceRatePercent}%).`,
        impact: 'Pérdida de interés en la primera impresión de la landing.',
      });
    }

    return {
      componentId,
      componentName,
      overallScore,
      scores: {
        trafficHealth: trafficHealthScore,
        conversionHealth: conversionHealthScore,
        retentionHealth: retentionHealthScore,
        stabilityHealth: stabilityHealthScore,
      },
      anomaliesDetected,
    };
  }
}
