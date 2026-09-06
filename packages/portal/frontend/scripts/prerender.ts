import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Script de Prerenderizado Estático Build-time (SSG / Static Pre-renderer)
 * Fábrica de Pastas Simón — Bernal & Zona Sur
 */

const BUILD_DIR = join(__dirname, '../build');
const INDEX_HTML_PATH = join(BUILD_DIR, 'index.html');

console.log('🚀 [PRERENDER] Iniciando generación de páginas estáticas prerenderizadas...');

if (!existsSync(INDEX_HTML_PATH)) {
  console.log('⚠️ [PRERENDER] No se encontró build/index.html. El prerenderizado se ejecutará después de la compilación.');
  process.exit(0);
}

const baseHtml = readFileSync(INDEX_HTML_PATH, 'utf8');

// Rutas comerciales y legales a pre-renderizar en HTML estático independiente
const routesToPrerender = [
  {
    path: 'precios',
    title: 'Lista de Precios Oficial | Fábrica de Pastas Simón (Bernal y Zona Sur)',
    description: 'Consulta los precios actualizados de sorrentinos, ravioles, panzottis, ñoquis y empanadas gourmet. Descuentos por volumen y promociones mayoristas en Bernal y Quilmes.',
    canonical: 'https://simonpastasartesanales.com.ar/precios',
    ogTitle: 'Lista de Precios Oficial - Fábrica de Pastas Simón',
    ogDescription: 'Precios actualizados de sorrentinos, ravioles caseros y venta mayorista en Bernal y Zona Sur.',
    h1: 'Lista de Precios Oficial & Promociones Mayoristas — Fábrica de Pastas Simón',
    intro: 'Precios actualizados para venta minorista y pedidos al por mayor en Bernal, Quilmes y Zona Sur. Descuentos especiales por volumen para restaurantes y gastronómicos.'
  },
  {
    path: 'productos',
    title: 'Catálogo de Sorrentinos, Ravioles & Pastas Caseras | Fábrica de Pastas Simón',
    description: 'Descubre nuestra variedad de pastas artesanales congeladas en caja: sorrentinos de bondiola, ravioles de pollo y espinaca, panzottis gourmet y empanadas caseras.',
    canonical: 'https://simonpastasartesanales.com.ar/productos',
    ogTitle: 'Catálogo de Pastas Artesanales - Fábrica de Pastas Simón',
    ogDescription: 'Sorrentinos caseros, ravioles y empanadas gourmet elaboradas de manera artesanal en Bernal.',
    h1: 'Catálogo de Sorrentinos, Ravioles & Pastas Artesanales — Fábrica de Pastas Simón',
    intro: 'Variedad completa de pastas caseras congeladas en origen en caja de presentación de alta calidad. Elaboración artesanal diaria en nuestra planta de Bernal.'
  },
  {
    path: 'mayorista',
    title: 'Venta Mayorista de Pastas para Restaurantes y Comercios | Fábrica de Pastas Simón',
    description: 'Distribución mayorista directa de pastas frescas congeladas para restaurantes, cantinas, catering y comercios gastronómicos en Quilmes, Bernal, Avellaneda y Zona Sur.',
    canonical: 'https://simonpastasartesanales.com.ar/mayorista',
    ogTitle: 'Distribución Mayorista de Pastas en Zona Sur - Fábrica de Pastas Simón',
    ogDescription: 'Proveedor mayorista de pastas congeladas de alta calidad para restaurantes y comercios.',
    h1: 'Distribución Mayorista de Pastas para Restaurantes y Gastronomía',
    intro: 'Suministro directo de pastas caseras congeladas con entregas programadas en Quilmes, Bernal, Avellaneda, Lanús y Zona Sur. Calidad constante y porciones estandarizadas.'
  },
  {
    path: 'legal/terms',
    title: 'Términos y Condiciones | Fábrica de Pastas Simón',
    description: 'Términos y condiciones de uso del servicio y pedidos online de Fábrica de Pastas Simón en Bernal y Zona Sur.',
    canonical: 'https://simonpastasartesanales.com.ar/legal/terms',
    ogTitle: 'Términos y Condiciones - Fábrica de Pastas Simón',
    ogDescription: 'Términos y condiciones de compra y delivery de Fábrica de Pastas Simón.',
    h1: 'Términos y Condiciones del Servicio — Fábrica de Pastas Simón',
    intro: 'Términos de compra, condiciones de envío a domicilio, políticas de pedidos mayoristas y protección al consumidor.'
  },
  {
    path: 'legal/privacy',
    title: 'Política de Privacidad | Fábrica de Pastas Simón',
    description: 'Política de privacidad y protección de datos personales de Fábrica de Pastas Simón.',
    canonical: 'https://simonpastasartesanales.com.ar/legal/privacy',
    ogTitle: 'Política de Privacidad - Fábrica de Pastas Simón',
    ogDescription: 'Política de privacidad y garantía de datos personales de Fábrica de Pastas Simón.',
    h1: 'Política de Privacidad & Protección de Datos — Fábrica de Pastas Simón',
    intro: 'Compromiso de privacidad, tratamiento de datos personales y seguridad en la información de nuestros clientes.'
  }
];

routesToPrerender.forEach((route) => {
  const routeDir = join(BUILD_DIR, route.path);
  if (!existsSync(routeDir)) {
    mkdirSync(routeDir, { recursive: true });
  }

  let routeHtml = baseHtml;
  routeHtml = routeHtml
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description"\s+content=".*?"\s*\/>/s, `<meta name="description" content="${route.description}" />`)
    .replace(/<link rel="canonical"\s+href=".*?"\s*\/>/s, `<link rel="canonical" href="${route.canonical}" />`)
    .replace(/<meta property="og:title"\s+content=".*?"\s*\/>/s, `<meta property="og:title" content="${route.ogTitle}" />`)
    .replace(/<meta property="og:description"\s+content=".*?"\s*\/>/s, `<meta property="og:description" content="${route.ogDescription}" />`)
    .replace(/<meta property="twitter:title"\s+content=".*?"\s*\/>/s, `<meta property="twitter:title" content="${route.ogTitle}" />`)
    .replace(/<meta property="twitter:description"\s+content=".*?"\s*\/>/s, `<meta property="twitter:description" content="${route.ogDescription}" />`);

  if (route.h1) {
    routeHtml = routeHtml.replace(
      /<h1 style="[^"]*">\s*Fábrica de Pastas Simón — Pastas Artesanales & Distribución Mayorista\s*<\/h1>/s,
      `<h1 style="font-size: 2.2rem; font-weight: 700; color: #193220; margin-bottom: 12px;">${route.h1}</h1>`
    );
  }
  if (route.intro) {
    routeHtml = routeHtml.replace(
      /<p style="font-size: 1.15rem; color: #374151; max-width: 800px; margin: 0 auto;">\s*Elaboración artesanal de pastas frescas congeladas en caja:.*?\s*<\/p>/s,
      `<p style="font-size: 1.15rem; color: #374151; max-width: 800px; margin: 0 auto;">${route.intro}</p>`
    );
  }

  const outputPath = join(routeDir, 'index.html');
  writeFileSync(outputPath, routeHtml, 'utf8');
  console.log(`✅ [PRERENDER] Generada ruta prerenderizada: /${route.path} -> ${outputPath}`);
});

console.log('🎉 [PRERENDER] Proceso de prerenderizado estático completado con éxito.');
