import { SEOAuditReport, SEOIssue } from './types';

/**
 * Módulo de auditoría SEO en tiempo de ejecución (Client Runtime Inspector)
 * Fábrica de Pastas Simón
 */

export function runSEOAudit(): SEOAuditReport {
  if (typeof document === 'undefined') {
    return {
      score: 0,
      title: null,
      metaDescription: null,
      canonicalUrl: null,
      h1Count: 0,
      missingAltCount: 0,
      hasOpenGraph: false,
      hasTwitterCard: false,
      hasJsonLd: false,
      jsonLdTypes: [],
      isPreRendered: false,
      issues: [],
      timestamp: Date.now()
    };
  }

  const issues: SEOIssue[] = [];
  let score = 100;

  // 1. Title Tag Check
  const title = document.title || null;
  if (!title) {
    issues.push({ severity: 'critical', category: 'Meta', message: 'Falta la etiqueta <title> en el documento.' });
    score -= 20;
  } else if (title.length < 30 || title.length > 70) {
    issues.push({
      severity: 'warning',
      category: 'Meta',
      message: `La longitud del título (${title.length} caracteres) no está en el rango óptimo recomendación (30-70 caracteres).`
    });
    score -= 5;
  }

  // 2. Meta Description Check
  const metaDescEl = document.querySelector('meta[name="description"]');
  const metaDescription = metaDescEl ? metaDescEl.getAttribute('content') : null;
  if (!metaDescription) {
    issues.push({ severity: 'critical', category: 'Meta', message: 'Falta la etiqueta <meta name="description">.' });
    score -= 20;
  } else if (metaDescription.length < 70 || metaDescription.length > 160) {
    issues.push({
      severity: 'warning',
      category: 'Meta',
      message: `La meta descripción (${metaDescription.length} caracteres) debería tener entre 70 y 160 caracteres.`
    });
    score -= 5;
  }

  // 3. Canonical Tag Check
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  const canonicalUrl = canonicalEl ? canonicalEl.getAttribute('href') : null;
  if (!canonicalUrl) {
    issues.push({ severity: 'warning', category: 'Canonical', message: 'Falta la etiqueta <link rel="canonical">.' });
    score -= 10;
  }

  // 4. Headings Structure (H1)
  const h1Elements = document.querySelectorAll('h1');
  const h1Count = h1Elements.length;
  if (h1Count === 0) {
    issues.push({ severity: 'critical', category: 'Headings', message: 'No se encontró ningún encabezado <h1> principal.' });
    score -= 15;
  } else if (h1Count > 1) {
    issues.push({
      severity: 'warning',
      category: 'Headings',
      message: `Se encontraron ${h1Count} etiquetas <h1>. Se recomienda utilizar una sola etiqueta <h1> por página.`
    });
    score -= 5;
  }

  // 5. Images missing ALT
  const images = Array.from(document.querySelectorAll('img'));
  const missingAltImages = images.filter((img) => !img.hasAttribute('alt') || img.getAttribute('alt')?.trim() === '');
  const missingAltCount = missingAltImages.length;
  if (missingAltCount > 0) {
    issues.push({
      severity: 'warning',
      category: 'Images',
      message: `Se detectaron ${missingAltCount} imágenes sin atributo "alt" para accesibilidad e indexación de imágenes.`
    });
    score -= Math.min(15, missingAltCount * 3);
  }

  // 6. Open Graph & Twitter Cards
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const hasOpenGraph = Boolean(ogTitle && ogImage);
  if (!hasOpenGraph) {
    issues.push({ severity: 'warning', category: 'Meta', message: 'Faltan etiquetas Open Graph primarias (og:title / og:image).' });
    score -= 10;
  }

  const twitterCard = document.querySelector('meta[property="twitter:card"]');
  const hasTwitterCard = Boolean(twitterCard);

  // 7. Schema.org JSON-LD Structured Data
  const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
  const hasJsonLd = jsonLdScripts.length > 0;
  const jsonLdTypes: string[] = [];

  jsonLdScripts.forEach((script) => {
    try {
      const data = JSON.parse(script.textContent || '{}');
      if (data['@type']) {
        jsonLdTypes.push(data['@type']);
      }
    } catch (e) {
      // JSON parse error
    }
  });

  if (!hasJsonLd) {
    issues.push({
      severity: 'warning',
      category: 'StructuredData',
      message: 'No se detectó marcado Schema.org JSON-LD para Rich Snippets en Google Search.'
    });
    score -= 15;
  }

  // 8. Hidden Text Penalty Check (e.g. display: none container with text)
  const hiddenElementsWithText = Array.from(document.querySelectorAll('div[style*="display: none"], div[style*="display:none"]')).filter(
    (el) => (el.textContent || '').trim().length > 100
  );
  if (hiddenElementsWithText.length > 0) {
    issues.push({
      severity: 'critical',
      category: 'Indexability',
      message: 'Advertencia Anti-Spam: Se detectó contenido semántico envuelto en "display: none". Google ignora o penaliza este patrón.'
    });
    score -= 15;
  }

  // 9. Pre-render Status Detection
  const rootEl = document.getElementById('root');
  const isPreRendered = Boolean(
    rootEl && rootEl.children.length > 0 && !rootEl.querySelector('#portal-loader-logo')
  );

  if (!isPreRendered) {
    issues.push({
      severity: 'info',
      category: 'Indexability',
      message: 'La página se está sirviendo mediante Client-Side SPA en vivo. El prerenderizado estático acelerará la indexación.'
    });
  }

  const finalScore = Math.max(0, score);

  return {
    score: finalScore,
    title,
    metaDescription,
    canonicalUrl,
    h1Count,
    missingAltCount,
    hasOpenGraph,
    hasTwitterCard,
    hasJsonLd,
    jsonLdTypes,
    isPreRendered,
    issues,
    timestamp: Date.now()
  };
}
