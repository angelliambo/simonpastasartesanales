/**
 * Configuración y Constantes para MERN SaaS Factory Analytics & Search Console Extractor
 */

import path from 'path';

export const ANALYTICS_CONFIG = {
  portal: {
    name: 'Simón Pastas Artesanales',
    domain: process.env.PORTAL_DOMAIN || 'simonpastasartesanales.com.ar',
    measurementId: process.env.GA4_MEASUREMENT_ID || process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-SIMONPASTAS01',
    propertyId: process.env.GA4_PORTAL_PROPERTY_ID || process.env.GA4_PROPERTY_ID || 'properties/398271401',
  },
  backend: {
    name: 'Simón Pastas Artesanales Backend API',
    endpoint: process.env.BACKEND_URL || 'http://localhost:5000/api',
  },
  searchConsole: {
    siteUrl: process.env.GSC_SITE_URL || 'sc-domain:simonpastasartesanales.com.ar',
  },
  benchmarks: {
    minPortalConversionPercent: 4.5,
    minDauToMauRatioPercent: 20.0,
    maxBounceRatePercent: 45.0,
    minEngagementRatePercent: 55.0,
    maxTelemetryErrorRatePercent: 1.5,
  },
  defaults: {
    daysWindow: 30,
    reportsDir: path.join(process.cwd(), 'reports'),
    jsonReportName: 'analytics-raw-telemetry.json',
    mdReportName: 'analytics-telemetry-digest.md',
    jsonPlanName: 'analytics-optimization-plan.json',
    mdPlanName: 'analytics-optimization-plan.md',
  },
};
