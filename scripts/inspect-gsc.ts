import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import { BRAND_CONFIG } from '../packages/shared/src/config/brand';

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
  const targetDomain = process?.env?.GSC_SITE_DOMAIN || BRAND_CONFIG.domain;
  const siteUrl = `sc-domain:${targetDomain}`;

  console.log(`\n======================================================`);
  console.log(`🔍 INICIANDO INSPECCIÓN EN VIVO EN GOOGLE SEARCH CONSOLE`);
  console.log(`======================================================`);

  // 1. Verificar sitio autorizados
  const sitesRes = await searchconsole.sites.list({});
  console.log(`✅ Propiedades autorizadas en GSC:`, sitesRes.data.siteEntry?.map(s => s.siteUrl));

  // 2. Leer URLs del sitemap
  const sitemapPath = path.join(process.cwd(), 'packages/portal/frontend/public/sitemap.xml');
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  const locMatches = Array.from(sitemapXml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)).map(m => m[1]);
  const uniqueUrls = Array.from(new Set(locMatches));

  console.log(`\n📄 Se extrajeron ${uniqueUrls.length} URLs únicas desde el sitemap.xml.`);

  // Muestra de URLs clave (incluyendo landings, herramientas y blog)
  const sampleUrls = uniqueUrls.slice(0, 30);
  const inspectionResults: any[] = [];
  const coverageStateCount: Record<string, number> = {};

  for (const url of sampleUrls) {
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
    URL: r.url.replace(`https://${targetDomain}`, ''),
    Verdict: r.verdict,
    Coverage: r.coverageState,
    UserCanonical: r.userCanonical.replace(`https://${targetDomain}`, ''),
    GoogleCanonical: r.googleCanonical.replace(`https://${targetDomain}`, ''),
  })));

  // Guardar reporte
  const reportPath = path.join(process.cwd(), 'reports', 'gsc-urls-inspection.json');
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
