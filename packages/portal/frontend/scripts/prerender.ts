import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Script de Prerenderizado Estático (Build-time Static HTML Pre-renderer)
 * Fábrica de Pastas Simón
 */

const BUILD_DIR = join(__dirname, '../build');
const INDEX_HTML_PATH = join(BUILD_DIR, 'index.html');

console.log('🚀 [PRERENDER] Iniciando generación de páginas estáticas prerenderizadas...');

if (!existsSync(INDEX_HTML_PATH)) {
  console.log('⚠️ [PRERENDER] No se encontró build/index.html. El prerenderizado se ejecutará después de la compilación.');
  process.exit(0);
}

const baseHtml = readFileSync(INDEX_HTML_PATH, 'utf8');

// Rutas estáticas a pre-renderizar
const routesToPrerender = [
  {
    path: 'legal/terms',
    title: 'Términos y Condiciones | Fábrica de Pastas Simón',
    description: 'Términos y condiciones de uso del servicio y pedidos online de Fábrica de Pastas Simón en Bernal y Zona Sur.',
    canonical: 'https://simonpastasartesanales.com.ar/legal/terms'
  },
  {
    path: 'legal/privacy',
    title: 'Política de Privacidad | Fábrica de Pastas Simón',
    description: 'Política de privacidad y protección de datos personales de Fábrica de Pastas Simón.',
    canonical: 'https://simonpastasartesanales.com.ar/legal/privacy'
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
    .replace(/<meta property="og:title"\s+content=".*?"\s*\/>/s, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description"\s+content=".*?"\s*\/>/s, `<meta property="og:description" content="${route.description}" />`);

  const outputPath = join(routeDir, 'index.html');
  writeFileSync(outputPath, routeHtml, 'utf8');
  console.log(`✅ [PRERENDER] Generada ruta prerenderizada: /${route.path} -> ${outputPath}`);
});

console.log('🎉 [PRERENDER] Proceso de prerenderizado estático completado con éxito.');
