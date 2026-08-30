import fs from 'fs';
import path from 'path';

/**
 * CLI Tool: Auditoría Automatizada de SEO & GEO-AI (Simón Pastas Artesanales)
 * Portado y adaptado desde el estándar ZenithNexus.
 */

const TARGET_KEYWORDS = [
  'pastas artesanales',
  'fabrica de pastas',
  'sorrentinos mayorista',
  'ravioles caseros',
  'bernal',
  'quilmes',
  'precios',
  'zona sur',
];

interface SeoPageConfig {
  path: string;
  title: string;
  description: string;
  canonical: string;
}

const SEO_PAGES: SeoPageConfig[] = [
  {
    path: '/',
    title: 'Fábrica de Pastas Simón | Pastas Artesanales, Sorrentinos & Venta Mayorista en Bernal',
    description: 'Fábrica de pastas frescas congeladas en Bernal y Quilmes. Sorrentinos artesanales, ravioles caseros, ñoquis del 29 y distribución al por mayor para restaurantes en Zona Sur.',
    canonical: 'https://simonpastasartesanales.com.ar/',
  },
  {
    path: '/precios',
    title: 'Lista de Precios Oficial | Fábrica de Pastas Simón (Bernal y Zona Sur)',
    description: 'Consulta los precios actualizados de sorrentinos, ravioles, panzottis, ñoquis y empanadas gourmet. Descuentos por volumen y promociones mayoristas en Bernal y Quilmes.',
    canonical: 'https://simonpastasartesanales.com.ar/precios',
  },
  {
    path: '/productos',
    title: 'Catálogo de Sorrentinos, Ravioles & Pastas Caseras | Fábrica de Pastas Simón',
    description: 'Descubre nuestra variedad de pastas artesanales congeladas en caja: sorrentinos de bondiola, ravioles de pollo y espinaca, panzottis gourmet y empanadas caseras.',
    canonical: 'https://simonpastasartesanales.com.ar/productos',
  },
  {
    path: '/mayorista',
    title: 'Venta Mayorista de Pastas para Restaurantes y Comercios | Fábrica de Pastas Simón',
    description: 'Distribución mayorista directa de pastas frescas congeladas para restaurantes, cantinas, catering y comercios gastronómicos en Quilmes, Bernal, Avellaneda y Zona Sur.',
    canonical: 'https://simonpastasartesanales.com.ar/mayorista',
  },
];

function runSeoAudit() {
  console.log('\n======================================================');
  console.log('🔍 AUDITORÍA TÉCNICA DE SEO & GEO-AI (STANDARDS ZENITHNEXUS)');
  console.log('======================================================\n');

  let totalErrors = 0;
  let totalWarnings = 0;

  // 1. Validar Rutas Canónicas
  console.log('--- 1. Validación de Rutas Canónicas y Trailing Slashes ---');
  SEO_PAGES.forEach((page) => {
    if (page.canonical.endsWith('/') && page.canonical !== 'https://simonpastasartesanales.com.ar/') {
      console.error(`❌ ERROR: Ruta con trailing slash no permitido: ${page.canonical}`);
      totalErrors++;
    } else {
      console.log(`✅ Canónica válida: ${page.canonical}`);
    }
  });

  // 2. Validar Metadatos y Cobertura de Palabras Clave
  console.log('\n--- 2. Validación de Longitudes de Título y Descripción ---');
  SEO_PAGES.forEach((page) => {
    console.log(`\n📌 Página: ${page.path}`);

    if (page.title.length < 25 || page.title.length > 85) {
      console.warn(`⚠️ ALERTA: Título fuera de rango óptimo (25-85 chars): ${page.title.length} chars -> "${page.title}"`);
      totalWarnings++;
    } else {
      console.log(`  ✓ Título OK (${page.title.length} chars)`);
    }

    if (page.description.length < 100 || page.description.length > 180) {
      console.warn(`⚠️ ALERTA: Descripción fuera de rango óptimo (100-180 chars): ${page.description.length} chars -> "${page.description}"`);
      totalWarnings++;
    } else {
      console.log(`  ✓ Descripción OK (${page.description.length} chars)`);
    }

    const content = `${page.title} ${page.description}`.toLowerCase();
    const missing = TARGET_KEYWORDS.filter((k) => !content.includes(k.toLowerCase()));
    if (missing.length > 0) {
      console.log(`  💡 Sugerencia de palabras clave no incluidas: ${missing.join(', ')}`);
    }
  });

  // 3. Validar Archivos Críticos en /public
  console.log('\n--- 3. Verificación de Archivos Estáticos AIO/SEO ---');
  const publicDir = path.join(__dirname, '../packages/portal/frontend/public');
  const requiredFiles = ['llms.txt', 'sitemap.xml', 'robots.txt', 'index.html'];

  requiredFiles.forEach((file) => {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ Archivo crítico presente: public/${file}`);
    } else {
      console.error(`❌ ERROR: Archivo crítico faltante: public/${file}`);
      totalErrors++;
    }
  });

  console.log('\n---------------------------------------------------');
  console.log(`📊 RESUMEN FINAL AUDITORÍA SEO:`);
  console.log(`  - Páginas auditadas:       ${SEO_PAGES.length}`);
  console.log(`  - Errores críticos:         ${totalErrors}`);
  console.log(`  - Advertencias encontradas: ${totalWarnings}`);
  console.log('---------------------------------------------------\n');

  if (totalErrors > 0) {
    process.exit(1);
  }
}

runSeoAudit();
