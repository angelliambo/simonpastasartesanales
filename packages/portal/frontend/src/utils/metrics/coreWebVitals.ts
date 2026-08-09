import { WebVitalsMetric } from './types';

/**
 * Módulo de recolección de Core Web Vitals (INP, LCP, CLS, FCP, TTFB)
 * Fábrica de Pastas Simón
 */

const metricsStore: Record<string, WebVitalsMetric> = {};

function calculateRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  switch (name) {
    case 'INP':
      return value <= 200 ? 'good' : value <= 500 ? 'needs-improvement' : 'poor';
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
    case 'TTFB':
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
    default:
      return 'good';
  }
}

export function recordMetric(name: WebVitalsMetric['name'], value: number): WebVitalsMetric {
  const rating = calculateRating(name, value);
  const metric: WebVitalsMetric = {
    name,
    value: Number(value.toFixed(2)),
    rating
  };
  metricsStore[name] = metric;

  if (process.env.NODE_ENV === 'development') {
    const color = rating === 'good' ? '#2e7d32' : rating === 'needs-improvement' ? '#ed6c02' : '#d32f2f';
    console.log(
      `%c[CoreWebVitals] ${name}: ${metric.value}${name === 'CLS' ? '' : 'ms'} (${rating})`,
      `color: ${color}; font-weight: bold;`
    );
  }

  return metric;
}

export function observeCoreWebVitals(onReport?: (metric: WebVitalsMetric) => void): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  // 1. Observe LCP (Largest Contentful Paint)
  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        const metric = recordMetric('LCP', lastEntry.startTime);
        if (onReport) onReport(metric);
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // Ignore if unsupported
  }

  // 2. Observe CLS (Cumulative Layout Shift)
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!layoutShift.hadRecentInput && typeof layoutShift.value === 'number') {
          clsValue += layoutShift.value;
          const metric = recordMetric('CLS', clsValue);
          if (onReport) onReport(metric);
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    // Ignore if unsupported
  }

  // 3. Observe FCP & TTFB
  try {
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          const metric = recordMetric('FCP', entry.startTime);
          if (onReport) onReport(metric);
        }
      }
    });
    paintObserver.observe({ type: 'paint', buffered: true });
  } catch (e) {
    // Ignore if unsupported
  }

  // 4. TTFB (Time to First Byte)
  try {
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navEntries.length > 0 && navEntries[0].responseStart > 0) {
      const metric = recordMetric('TTFB', navEntries[0].responseStart);
      if (onReport) onReport(metric);
    }
  } catch (e) {
    // Ignore
  }

  // 5. INP (Interaction to Next Paint)
  try {
    const inpObserver = new PerformanceObserver((entryList) => {
      let maxDuration = 0;
      for (const entry of entryList.getEntries()) {
        if (entry.duration > maxDuration) {
          maxDuration = entry.duration;
        }
      }
      if (maxDuration > 0) {
        const metric = recordMetric('INP', maxDuration);
        if (onReport) onReport(metric);
      }
    });
    inpObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    // Ignore
  }
}

export function getRecordedWebVitals(): Record<string, WebVitalsMetric> {
  return { ...metricsStore };
}
