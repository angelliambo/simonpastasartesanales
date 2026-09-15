import fs from 'fs';
import path from 'path';

function auditSitemap() {
  let sitemapPath = path.join(process.cwd(), 'packages/portal/frontend/public/sitemap.xml');
  if (!fs.existsSync(sitemapPath) && fs.existsSync(path.join(process.cwd(), 'public/sitemap.xml'))) {
    sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
  }

  let buildDir = path.join(process.cwd(), 'packages/portal/frontend/dist');
  if (!fs.existsSync(buildDir) && fs.existsSync(path.join(process.cwd(), 'dist'))) {
    buildDir = path.join(process.cwd(), 'dist');
  }

  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ sitemap.xml no encontrado');
    return;
  }

  const xmlContent = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = Array.from(xmlContent.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)).map((m) => m[1]);
  const altMatches = Array.from(xmlContent.matchAll(/href="(https:\/\/[^"]+)"/g)).map((m) => m[1]);
  const allUrls = Array.from(new Set([...locMatches, ...altMatches]));

  console.log(`\n======================================================`);
  console.log(`🔍 AUDITORÍA Y VALIDACIÓN DE SITEMAP.XML - SIMÓN PASTAS`);
  console.log(`======================================================`);
  console.log(`• Total de URLs a auditar: ${allUrls.length}`);

  let validCount = 0;
  let missingCount = 0;
  let canonicalMismatchCount = 0;

  const errors: string[] = [];

  allUrls.forEach((url) => {
    const cleanUrl = url.split('#')[0];
    const routePath = cleanUrl.replace('https://simonpastasartesanales.com.ar', '');
    const cleanPath = routePath === '' ? 'index.html' : routePath.replace(/^\//, '');

    const directHtmlFile = path.join(buildDir, `${cleanPath}.html`);
    const folderIndexFile = path.join(buildDir, cleanPath, 'index.html');

    const targetFile = cleanPath === 'index.html'
      ? path.join(buildDir, 'index.html')
      : (fs.existsSync(directHtmlFile) ? directHtmlFile : folderIndexFile);

    const exists = fs.existsSync(targetFile) && fs.statSync(targetFile).isFile();

    if (!exists) {
      missingCount++;
      errors.push(`❌ URL sin archivo HTML estático generado o 404: ${url}`);
    } else {
      validCount++;
      const htmlContent = fs.readFileSync(targetFile, 'utf8');
      const canonicalMatch = htmlContent.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
      const userCanonical = canonicalMatch ? canonicalMatch[1] : null;

      if (userCanonical && userCanonical !== cleanUrl) {
        canonicalMismatchCount++;
        errors.push(`⚠️ Canonical no coincide en ${url} (Canónica en HTML: "${userCanonical}")`);
      }
    }
  });

  console.log(`\n======================================================`);
  console.log(`📊 RESULTADOS DE LA AUDITORÍA:`);
  console.log(`======================================================`);
  console.log(`✅ URLs Válidas: ${validCount} / ${allUrls.length}`);
  console.log(`❌ URLs Inexistentes / 404: ${missingCount}`);
  console.log(`⚠️ Desajustes de Canónica: ${canonicalMismatchCount}`);

  if (errors.length > 0) {
    console.log(`\nDETALLE DE ADVERTENCIAS/ERRORES (${errors.length}):`);
    errors.forEach((e) => console.log(e));
  } else {
    console.log(`\n🎉 El sitemap.xml de simonpastasartesanales.com.ar está 100% LIMPIO.`);
  }
}

auditSitemap();
