/**
 * Tipos e interfaces estricta para la suite de métricas, rendimiento y auditoría SEO
 * Fábrica de Pastas Simón
 */

export interface WebVitalsMetric {
  name: 'INP' | 'LCP' | 'CLS' | 'FCP' | 'TTFB' | 'FID';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id?: string;
  entries?: PerformanceEntry[];
}

export type TrafficChannel =
  | 'Organic Search'
  | 'Direct'
  | 'Social Media'
  | 'Referral'
  | 'Paid Search'
  | 'Email / Campaign'
  | 'Unknown';

export interface TrafficAttribution {
  channel: TrafficChannel;
  referrer: string;
  landingPath: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  timestamp: number;
}

export interface BotDetectionResult {
  isBot: boolean;
  botCategory: 'Search Engine' | 'AI / LLM Crawler' | 'Social Scraper' | 'Generic Bot' | 'Human Browser';
  userAgent: string;
  botName?: string;
}

export interface SEOIssue {
  severity: 'critical' | 'warning' | 'info';
  category: 'Meta' | 'Headings' | 'Images' | 'Canonical' | 'StructuredData' | 'Indexability';
  message: string;
  details?: string;
}

export interface SEOAuditReport {
  score: number; // 0 - 100
  title: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  h1Count: number;
  missingAltCount: number;
  hasOpenGraph: boolean;
  hasTwitterCard: boolean;
  hasJsonLd: boolean;
  jsonLdTypes: string[];
  isPreRendered: boolean;
  issues: SEOIssue[];
  timestamp: number;
}

export interface EngagementMetrics {
  timeOnPageSeconds: number;
  maxScrollDepth: number; // 0 - 100%
  whatsappClicks: number;
  catalogInteractions: number;
  phoneClicks: number;
}

export interface PrerenderDiagnostics {
  isPreRendered: boolean;
  hydrationTimeMs: number;
  hasStaticSemanticContent: boolean;
  domContentLoadedTimeMs: number;
}

export interface MetricsSuiteReport {
  webVitals: Record<string, WebVitalsMetric>;
  attribution: TrafficAttribution;
  botInfo: BotDetectionResult;
  seoAudit: SEOAuditReport;
  engagement: EngagementMetrics;
  prerender: PrerenderDiagnostics;
}
