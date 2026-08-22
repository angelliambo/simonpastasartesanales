/**
 * Configuración y Constantes para MERN SaaS Factory Analytics & Search Console Extractor
 */

import path from 'path';

export const ANALYTICS_CONFIG = {
  portal: {
    name: 'MERN SaaS Factory Portal Web',
    domain: process.env.PORTAL_DOMAIN || 'saas-factory-portal.app',
    measurementId: process.env.GA4_MEASUREMENT_ID || 'G-PORTALSAAS01',
    propertyId: process.env.GA4_PORTAL_PROPERTY_ID || process.env.GA4_PROPERTY_ID || 'properties/398271401',
  },
  backend: {
    name: 'MERN SaaS Factory Backend API Services',
    endpoint: process.env.BACKEND_URL || 'http://localhost:5000/api',
  },
  searchConsole: {
    siteUrl: process.env.GSC_SITE_URL || 'sc-domain:saas-factory-portal.app',
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
