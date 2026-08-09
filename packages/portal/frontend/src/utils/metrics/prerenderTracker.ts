import { PrerenderDiagnostics } from './types';

/**
 * Módulo de diagnóstico de Prerenderizado e Hidratación React
 * Fábrica de Pastas Simón
 */

let hydrationStartTime = Date.now();
let hydrationTimeMs = 0;

export function markHydrationStart(): void {
  hydrationStartTime = Date.now();
}

export function markHydrationComplete(): number {
  hydrationTimeMs = Date.now() - hydrationStartTime;
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Prerender] React Hidratación completada en ${hydrationTimeMs}ms`);
  }
  return hydrationTimeMs;
}

export function getPrerenderDiagnostics(): PrerenderDiagnostics {
  if (typeof document === 'undefined') {
    return {
      isPreRendered: false,
      hydrationTimeMs: 0,
      hasStaticSemanticContent: false,
      domContentLoadedTimeMs: 0
    };
  }

  const rootEl = document.getElementById('root');
  const hasStaticSemanticContent = Boolean(
    rootEl &&
    rootEl.children.length > 0 &&
    !document.querySelector('#portal-loader-logo') &&
    (rootEl.textContent || '').trim().length > 200
  );

  let domContentLoadedTimeMs = 0;
  try {
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navEntries.length > 0) {
      domContentLoadedTimeMs = Math.round(navEntries[0].domContentLoadedEventEnd);
    }
  } catch (e) {
    // Ignore
  }

  return {
    isPreRendered: hasStaticSemanticContent,
    hydrationTimeMs,
    hasStaticSemanticContent,
    domContentLoadedTimeMs
  };
}
