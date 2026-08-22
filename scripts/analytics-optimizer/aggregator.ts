/**
 * MÓDULO DE AGREGACIÓN NUMÉRICA Y MATEMÁTICA DE TELEMETRÍA
 * MERN SaaS Factory Analytics & Search Console Extractor
 */

import { AggregatedEcosystemMetrics, BatchExtractionResult } from './types';

export class TelemetryAggregator {
  /**
   * Consolida y calcula los ratios matemáticos, embudos del portal y Search Console metrics.
   */
  public aggregateMetrics(rawBatch: BatchExtractionResult): AggregatedEcosystemMetrics {
    const { portal, backend, searchConsole, dateRange } = rawBatch;

    const totalActiveUsers = portal.metrics.activeUsers;
    const totalSessions = portal.metrics.sessions;
    const totalPageViews = portal.metrics.pageViews;

    const overallEngagementRatePercent = Math.round(portal.metrics.engagementRate * 100);
    const overallBounceRatePercent = Math.round(portal.metrics.bounceRate * 100);

    // Embudo del Portal Web (Landing Page -> Sign Up CTA -> Plan Upgrade)
    const landingViews = portal.metrics.landingViews || portal.metrics.pageViews;
    const ctaClicks = portal.metrics.ctaClicks || Math.round(landingViews * 0.08);
    const portalConversionRatePercent = parseFloat(((ctaClicks / (landingViews || 1)) * 100).toFixed(2));
    const portalDropoffPercent = parseFloat((100 - portalConversionRatePercent).toFixed(2));

    const planUpgrades = portal.metrics.planUpgradeEvents || 0;
    const upgradeRatePercent = parseFloat(((planUpgrades / (ctaClicks || 1)) * 100).toFixed(2));

    // Tasa de errores combinada por cada 1,000 sesiones
    const portalErrors = portal.metrics.telemetryErrorEvents || 0;
    const backendErrors = backend.metrics.telemetryErrorEvents || 0;
    const totalErrors = portalErrors + backendErrors;
    const errorsPerThousandSessions = parseFloat(((totalErrors / (totalSessions || 1)) * 1000).toFixed(2));

    // Consolidación de Google Search Console
    const topQuery = searchConsole.topQueries[0] || { query: 'N/A', clicks: 0 };

    return {
      timestamp: rawBatch.timestamp,
      dateRange,
      totals: {
        totalActiveUsers,
        totalSessions,
        totalPageViews,
        overallEngagementRatePercent,
        overallBounceRatePercent,
      },
      portalFunnel: {
        landingViews,
        ctaClicks,
        conversionRatePercent: portalConversionRatePercent,
        dropoffPercent: portalDropoffPercent,
        planUpgrades,
        upgradeRatePercent,
      },
      errorRates: {
        portalErrorsTotal: portalErrors,
        backendErrorsTotal: backendErrors,
        errorsPerThousandSessions,
      },
      searchConsoleSummary: {
        siteUrl: searchConsole.siteUrl,
        totalClicks: searchConsole.totals.clicks,
        totalImpressions: searchConsole.totals.impressions,
        avgCtrPercent: searchConsole.totals.avgCtrPercent,
        avgPosition: searchConsole.totals.avgPosition,
        topQuery: topQuery.query,
        topQueryClicks: topQuery.clicks,
      },
    };
  }
}
