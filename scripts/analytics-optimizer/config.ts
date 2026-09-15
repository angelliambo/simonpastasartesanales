import { BRAND_CONFIG } from '../../packages/shared/src/config/brand';

// Cargar variables de entorno automáticamente desde los archivos .env del monorepo
const frontendEnvPath = path.resolve(process.cwd(), 'packages/portal/frontend/.env');
const backendEnvPath = path.resolve(process.cwd(), 'packages/portal/backend/.env');
if (fs.existsSync(frontendEnvPath)) dotenv.config({ path: frontendEnvPath });
if (fs.existsSync(backendEnvPath)) dotenv.config({ path: backendEnvPath });
dotenv.config();

export const ANALYTICS_CONFIG = {
  portal: {
    name: `${BRAND_CONFIG.siteName} Portal Web`,
    domain: process.env.PORTAL_DOMAIN || BRAND_CONFIG.domain || 'simonpastasartesanales.com.ar',
    measurementId: process.env.VITE_GA_MEASUREMENT_ID || process.env.REACT_APP_GA_MEASUREMENT_ID || process.env.GA4_MEASUREMENT_ID || 'G-CSZZEJ6KG5',
    propertyId: process.env.GA4_PORTAL_PROPERTY_ID || process.env.GA4_PROPERTY_ID || 'properties/398271401',
  },
  backend: {
    name: `${BRAND_CONFIG.siteName} Backend API Services`,
    endpoint: process.env.BACKEND_URL || 'http://localhost:5000/api',
  },
  searchConsole: {
    siteUrl: process.env.GSC_SITE_URL || `sc-domain:${BRAND_CONFIG.domain || 'simonpastasartesanales.com.ar'}`,
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
