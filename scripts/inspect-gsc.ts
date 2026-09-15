import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

async function runDeepInspection() {
  const credsPath = path.join(process.cwd(), 'credentials', 'gcp-service-account.json');
  if (!fs.existsSync(credsPath)) {
    console.error('❌ No se encontró credentials/gcp-service-account.json');
    return;
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: credsPath,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly', 'https://www.googleapis.com/auth/webmasters'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  console.log(`\n======================================================`);
  console.log(`🔍 INICIANDO INSPECCIÓN EN VIVO EN GOOGLE SEARCH CONSOLE`);
  console.log(`======================================================`);

  let siteUrl = 'https://simonpastasartesanales.com.ar/';
  try {
    const sitesRes = await searchconsole.sites.list({});
    const siteList = sitesRes.data.siteEntry || [];
    console.log(`✅ Propiedades autorizadas en GSC:`, siteList.map(s => s.siteUrl));
    const matched = siteList.find(s => s.siteUrl?.includes('simonpastasartesanales'));
    if (matched?.siteUrl) {
      siteUrl = matched.siteUrl;
    }
  } catch (err: any) {
    console.warn(`⚠️ Error al listar sitios autorizados:`, err?.message || err);
  }

  console.log(`• Propiedad objetivo: ${siteUrl}`);

  const sitemapPath = path.join(process.cwd(), 'packages/portal/frontend/public/sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ No se encontró sitemap.xml en public/');
    return;
  }

  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  const locMatches = Array.from(sitemapXml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)).map(m => m[1]);
  const uniqueUrls = Array.from(new Set(locMatches)).map(url => url.split('#')[0]);

  console.log(`\n📄 Se extrajeron ${uniqueUrls.length} URLs únicas desde el sitemap.xml.`);

  const inspectionResults: any[] = [];
  const coverageStateCount: Record<string, number> = {};

  for (const url of uniqueUrls) {
    try {
      console.log(`⏳ Inspeccionando en Google: ${url}`);
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: siteUrl,
        },
      });

      const indexStatus = res.data.inspectionResult?.indexStatusResult;
      const coverageState = indexStatus?.coverageState || 'DESCONOCIDO';

      coverageStateCount[coverageState] = (coverageStateCount[coverageState] || 0) + 1;

      inspectionResults.push({
        url,
        verdict: indexStatus?.verdict || 'FAIL',
        coverageState,
        indexingState: indexStatus?.indexingState || 'N/A',
        lastCrawlTime: indexStatus?.lastCrawlTime || 'N/A',
        pageFetchState: indexStatus?.pageFetchState || 'N/A',
        userCanonical: indexStatus?.userCanonical || 'Sin declarar',
        googleCanonical: indexStatus?.googleCanonical || 'Sin asignar',
      });
    } catch (err: any) {
      console.warn(`⚠️ Error al inspeccionar ${url}:`, err?.message || err);
    }
  }

  console.log('\n======================================================');
  console.log('📊 RESUMEN DE COBERTURA EN GOOGLE (MUESTRA)');
  console.log('======================================================');
  console.table(coverageStateCount);

  console.log('\n📋 DETALLE DE INSPECCIÓN POR URL:');
  console.table(inspectionResults.map(r => ({
    URL: r.url.replace('https://simonpastasartesanales.com.ar', ''),
    Verdict: r.verdict,
    Coverage: r.coverageState,
    UserCanonical: r.userCanonical.replace('https://simonpastasartesanales.com.ar', ''),
    GoogleCanonical: r.googleCanonical.replace('https://simonpastasartesanales.com.ar', ''),
  })));

  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const reportPath = path.join(reportsDir, 'gsc-urls-inspection.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    siteUrl,
    totalSitemapUrls: uniqueUrls.length,
    inspectedSampleCount: inspectionResults.length,
    coverageStateBreakdown: coverageStateCount,
    detailedResults: inspectionResults
  }, null, 2));

  console.log(`\n💾 Reporte completo guardado en: ${reportPath}`);
}

runDeepInspection();
