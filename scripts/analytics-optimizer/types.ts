/**
 * Tipos y Contratos de Datos para MERN SaaS Factory Analytics & Search Console Telemetry Extractor
 */

export interface MetricDimensionBreakdown {
  dimension: string;
  metrics: Record<string, number>;
}

export interface ComponentRawTelemetry {
  componentId: 'portal' | 'backend';
  componentName: string;
  measurementId: string;
  propertyId: string;
  dateRange: { startDate: string; endDate: string };
  metrics: {
    activeUsers: number;
    newUsers: number;
    sessions: number;
    pageViews: number;
    engagementRate: number;
    bounceRate: number;
    avgSessionDurationSec: number;
    dauToMauRatio: number;
    landingViews?: number;
    ctaClicks?: number;
    planUpgradeEvents?: number;
    authLoginEvents?: number;
    telemetryErrorEvents: number;
  };
  eventBreakdown: Record<string, number>;
  trafficSources: MetricDimensionBreakdown[];
  aiAssistantReferrals?: Array<{
    assistant: string;
    domain: string;
    activeUsers: number;
    sessions: number;
    impressions: number;
  }>;
  geographicDistribution: MetricDimensionBreakdown[];
  deviceDistribution: MetricDimensionBreakdown[];
  errorTelemetry: Array<{ errorType: string; count: number; lastOccurred: string }>;
}

export interface GscQueryPerformance {
  query: string;
  clicks: number;
  impressions: number;
  ctrPercent: number;
  position: number;
}

export interface GscPagePerformance {
  pageUrl: string;
  clicks: number;
  impressions: number;
  ctrPercent: number;
  position: number;
}

export interface GscSearchPerformanceData {
  siteUrl: string;
  dateRange: { startDate: string; endDate: string };
  totals: {
    clicks: number;
    impressions: number;
    avgCtrPercent: number;
    avgPosition: number;
  };
  topQueries: GscQueryPerformance[];
  topPages: GscPagePerformance[];
}

export interface AdSenseSitePerformance {
  siteUrl: string;
  earningsUsd: number;
  adImpressions: number;
  adClicks: number;
  pageRpmUsd: number;
  adCtrPercent: number;
  status: 'authorized' | 'getting_ready' | 'needs_attention';
}

export interface AdSensePerformanceData {
  publisherId: string;
  dateRange: { startDate: string; endDate: string };
  totals: {
    totalEarningsUsd: number;
    totalAdImpressions: number;
    totalAdClicks: number;
    avgPageRpmUsd: number;
    avgAdCtrPercent: number;
  };
  sites: AdSenseSitePerformance[];
}

export interface BatchExtractionResult {
  timestamp: string;
  dateRange: { startDate: string; endDate: string };
  isSimulated: boolean;
  portal: ComponentRawTelemetry;
  backend: ComponentRawTelemetry;
  searchConsole: GscSearchPerformanceData;
  adSense: AdSensePerformanceData;
}

export interface AggregatedEcosystemMetrics {
  timestamp: string;
  dateRange: { startDate: string; endDate: string };
  totals: {
    totalActiveUsers: number;
    totalSessions: number;
    totalPageViews: number;
    overallEngagementRatePercent: number;
    overallBounceRatePercent: number;
  };
  portalFunnel: {
    landingViews: number;
    ctaClicks: number;
    conversionRatePercent: number;
    dropoffPercent: number;
    planUpgrades: number;
    upgradeRatePercent: number;
  };
  errorRates: {
    portalErrorsTotal: number;
    backendErrorsTotal: number;
    errorsPerThousandSessions: number;
  };
  searchConsoleSummary: {
    siteUrl: string;
    totalClicks: number;
    totalImpressions: number;
    avgCtrPercent: number;
    avgPosition: number;
    topQuery: string;
    topQueryClicks: number;
  };
  aiTrafficSummary?: {
    totalUsers: number;
    totalSessions: number;
    totalImpressions: number;
    breakdown: Array<{ assistant: string; domain: string; activeUsers: number; sessions: number; impressions: number }>;
  };
  adSenseSummary?: {
    publisherId: string;
    totalEarningsUsd: number;
    totalAdImpressions: number;
    totalAdClicks: number;
    avgPageRpmUsd: number;
    avgAdCtrPercent: number;
    sites: Array<{ siteUrl: string; earningsUsd: number; adImpressions: number; adClicks: number; pageRpmUsd: number; adCtrPercent: number; status: string }>;
  };
}

export interface ComponentIndividualDiagnosis {
  componentId: 'portal' | 'backend';
  componentName: string;
  overallScore: number; // 0 - 100
  scores: {
    trafficHealth: number;
    conversionHealth: number;
    retentionHealth: number;
    stabilityHealth: number;
  };
  anomaliesDetected: Array<{
    severity: 'critical' | 'warning' | 'info';
    metric: string;
    description: string;
    impact: string;
  }>;
}

export interface ProOrConItem {
  id: string;
  type: 'pro' | 'con';
  title: string;
  description: string;
  metricOrigin: string;
  impactScore: number; // 1 - 10
}

export interface EcosystemProsAndCons {
  timestamp: string;
  overallHealthGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  overallHealthScore: number;
  pros: ProOrConItem[];
  cons: ProOrConItem[];
}

export interface ActionPlanTask {
  id: string;
  category: 'product_increment' | 'bug_fix';
  priority: 'P0_URGENT' | 'P1_HIGH' | 'P2_MEDIUM' | 'P3_LOW';
  title: string;
  description: string;
  targetComponent: 'portal' | 'backend' | 'shared';
  justification: string;
  estimatedImpact: string;
  suggestedFiles: string[];
}

export interface ActionPlanResult {
  timestamp: string;
  summary: {
    totalTasks: number;
    productIncrementsCount: number;
    bugFixesCount: number;
    p0Count: number;
    p1Count: number;
  };
  productIncrements: ActionPlanTask[];
  bugFixes: ActionPlanTask[];
}

export interface CliOptions {
  days: number;
  dryRun: boolean;
  exportFormat: 'all' | 'json' | 'md' | 'none';
  outputDir: string;
  help: boolean;
}
