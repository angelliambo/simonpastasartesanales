import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { BRAND_CONFIG } from "../../../shared/src/config/brand";

const PUBLIC_DIR = join(__dirname, "../public");
const TEMPLATES_DIR = join(PUBLIC_DIR, "seo-templates");

console.log("🚀 [SEO-UPDATE] Iniciando actualización de metadatos de SEO y Marca...");
console.log(`🔧 [SEO-UPDATE] Configuración actual:`);
console.log(`   - Marca (siteName): ${BRAND_CONFIG.siteName}`);
console.log(`   - Dominio (domain): ${BRAND_CONFIG.domain}`);
console.log(`   - Título SEO: ${BRAND_CONFIG.seoTitle}`);
console.log(`   - Email de Soporte: ${BRAND_CONFIG.supportEmail}`);

if (!existsSync(TEMPLATES_DIR)) {
  console.error(`❌ [SEO-UPDATE] Error: La carpeta de plantillas no existe en: ${TEMPLATES_DIR}`);
  process.exit(1);
}

// 1. Procesar index.html
const processIndexHtml = () => {
  const templatePath = join(TEMPLATES_DIR, "index.html");
  const outputPath = join(PUBLIC_DIR, "index.html");

  if (!existsSync(templatePath)) {
    console.error(`⚠️ [SEO-UPDATE] No se encontró la plantilla para index.html`);
    return;
  }

  let content = readFileSync(templatePath, "utf8");

  // Reemplazar campos SEO específicos
  content = content
    .replace(/<title>.*?<\/title>/, `<title>${BRAND_CONFIG.seoTitle}</title>`)
    .replace(/<meta name="description"\s+content=".*?"\s*\/>/s, `<meta name="description" content="${BRAND_CONFIG.seoDescription}" />`)
    .replace(/<meta name="keywords"\s+content=".*?"\s*\/>/s, `<meta name="keywords" content="${BRAND_CONFIG.seoKeywords}" />`)
    .replace(/<meta property="og:title"\s+content=".*?"\s*\/>/s, `<meta property="og:title" content="${BRAND_CONFIG.seoTitle}" />`)
    .replace(/<meta property="og:description"\s+content=".*?"\s*\/>/s, `<meta property="og:description" content="${BRAND_CONFIG.seoDescription}" />`)
    .replace(/<meta property="twitter:title"\s+content=".*?"\s*\/>/s, `<meta property="twitter:title" content="${BRAND_CONFIG.seoTitle}" />`)
    .replace(/<meta property="twitter:description"\s+content=".*?"\s*\/>/s, `<meta property="twitter:description" content="${BRAND_CONFIG.seoDescription}" />`)
    // Nombres en el HTML interno (fallback estático para SEO)
    .replace(/<h1>SaaS Boilerplate - .*?<\/h1>/s, `<h1>${BRAND_CONFIG.seoTitle}</h1>`)
    .replace(/<h2>La estructura modular .*?<\/h2>/s, `<h2>${BRAND_CONFIG.seoDescription}</h2>`)
    .replace(/id="portal-loader-logo">\s*SaaS Boilerplate\s*<\/div>/s, `id="portal-loader-logo">${BRAND_CONFIG.siteName}</div>`);

  // Reemplazo general de dominio y marca para limpiar cualquier otra ocurrencia
  content = content
    .replace(/simonpastasartesanales.com.ar/g, BRAND_CONFIG.domain)
    .replace(/SaaS Boilerplate/g, BRAND_CONFIG.siteName)
    .replace(/ZenithNexus/g, BRAND_CONFIG.siteName);

  writeFileSync(outputPath, content, "utf8");
  console.log(`✅ [SEO-UPDATE] index.html actualizado físicamente.`);
};

// 2. Procesar robots.txt
const processRobotsTxt = () => {
  const templatePath = join(TEMPLATES_DIR, "robots.txt");
  const outputPath = join(PUBLIC_DIR, "robots.txt");

  if (!existsSync(templatePath)) return;

  let content = readFileSync(templatePath, "utf8");
  content = content
    .replace(/simonpastasartesanales.com.ar/g, BRAND_CONFIG.domain)
    .replace(/SaaS Boilerplate/g, BRAND_CONFIG.siteName)
    .replace(/ZenithNexus/g, BRAND_CONFIG.siteName);

  writeFileSync(outputPath, content, "utf8");
  console.log(`✅ [SEO-UPDATE] robots.txt actualizado físicamente.`);
};

// 3. Procesar sitemap.xml
const processSitemapXml = () => {
  const templatePath = join(TEMPLATES_DIR, "sitemap.xml");
  const outputPath = join(PUBLIC_DIR, "sitemap.xml");

  if (!existsSync(templatePath)) return;

  let content = readFileSync(templatePath, "utf8");
  content = content
    .replace(/simonpastasartesanales.com.ar/g, BRAND_CONFIG.domain);

  writeFileSync(outputPath, content, "utf8");
  console.log(`✅ [SEO-UPDATE] sitemap.xml actualizado físicamente.`);
};

// 4. Procesar manifest.json
const processManifestJson = () => {
  const templatePath = join(TEMPLATES_DIR, "manifest.json");
  const outputPath = join(PUBLIC_DIR, "manifest.json");

  if (!existsSync(templatePath)) return;

  let content = readFileSync(templatePath, "utf8");
  content = content
    .replace(/"short_name":\s*"SaaS Boilerplate"/g, `"short_name": "${BRAND_CONFIG.siteName}"`)
    .replace(/"name":\s*".*?"/g, `"name": "${BRAND_CONFIG.seoTitle}"`)
    .replace(/"description":\s*".*?"/g, `"description": "${BRAND_CONFIG.seoDescription}"`)
    .replace(/SaaS Boilerplate/g, BRAND_CONFIG.siteName)
    .replace(/ZenithNexus/g, BRAND_CONFIG.siteName);

  writeFileSync(outputPath, content, "utf8");
  console.log(`✅ [SEO-UPDATE] manifest.json actualizado físicamente.`);
};

// 5. Procesar llms.txt
const processLlmsTxt = () => {
  const templatePath = join(TEMPLATES_DIR, "llms.txt");
  const outputPath = join(PUBLIC_DIR, "llms.txt");

  if (!existsSync(templatePath)) return;

  let content = readFileSync(templatePath, "utf8");
  content = content
    .replace(/# SaaS Boilerplate - .*?\n/g, `# ${BRAND_CONFIG.seoTitle}\\n`)
    .replace(/# ZenithNexus - .*?\n/g, `# ${BRAND_CONFIG.seoTitle}\\n`)
    .replace(/simonpastasartesanales.com.ar/g, BRAND_CONFIG.domain)
    .replace(/SaaS Boilerplate/g, BRAND_CONFIG.siteName)
    .replace(/ZenithNexus/g, BRAND_CONFIG.siteName);

  writeFileSync(outputPath, content, "utf8");
  console.log(`✅ [SEO-UPDATE] llms.txt actualizado físicamente.`);
};

// Ejecutar todos los procesadores
try {
  processIndexHtml();
  processRobotsTxt();
  processSitemapXml();
  processManifestJson();
  processLlmsTxt();
  console.log("🎉 [SEO-UPDATE] Todos los archivos estáticos de SEO se actualizaron exitosamente en /public.");
} catch (error) {
  console.error("❌ [SEO-UPDATE] Error procesando los archivos de SEO:", error);
  process.exit(1);
}
