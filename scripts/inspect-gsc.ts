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

  // 1. Listar y Limpiar Sitemaps en GSC
  console.log(`\n======================================================`);
  console.log(`🗺️ AUDITORÍA Y LIMPIEZA DE SITEMAPS EN GSC`);
  console.log(`======================================================`);

  try {
    const sitemapsListRes = await searchconsole.sitemaps.list({ siteUrl });
    const registeredSitemaps = sitemapsListRes.data.sitemap || [];
    console.log(`📄 Sitemaps actualmente registrados en GSC (${registeredSitemaps.length}):`);
    
    for (const sm of registeredSitemaps) {
      console.log(`   - Path: ${sm.path} | Tipo: ${sm.type} | Último envío: ${sm.lastSubmitted} | Errores: ${sm.errors || 0} | Leído: ${sm.lastDownloaded || 'No'}`);
      
      // Si existe un sitemap inválido (.xlm o plural sitemaps.xml), eliminarlo
      if (sm.path?.includes('sitemap.xlm') || sm.path?.includes('sitemaps.xml')) {
        console.log(`⚠️ DETECTADO SITEMAP INVÁLIDO: ${sm.path}`);
        console.log(`🗑️ Eliminando sitemap erróneo de GSC...`);
        try {
          await searchconsole.sitemaps.delete({ siteUrl, feedpath: sm.path });
          console.log(`✅ Sitemap erróneo ${sm.path} eliminado con éxito de GSC!`);
        } catch (delErr: any) {
          console.error(`❌ Error al eliminar sitemap erróneo: ${delErr?.message || delErr}`);
        }
      }
    }

    // Asegurar envío del sitemap correcto
    const correctSitemapUrl = 'https://simonpastasartesanales.com.ar/sitemap.xml';
    console.log(`\n🚀 Garantizando envío del sitemap válido: ${correctSitemapUrl}`);
    const submitRes = await searchconsole.sitemaps.submit({ siteUrl, feedpath: correctSitemapUrl });
    console.log(`✅ Sitemap enviado correctamente a GSC. Status HTTP: ${submitRes.status}`);

  } catch (err: any) {
    console.warn(`⚠️ Error auditando sitemaps:`, err?.message || err);
  }

  // 2. Inspección de URLs del Sitemap
  const sitemapPath = path.join(process.cwd(), 'packages/portal/frontend/public/sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ No se encontró sitemap.xml en public/');
    return;
  }

  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  const locMatches = Array.from(sitemapXml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)).map(m => m[1]);
  const uniqueUrls = Array.from(new Set(locMatches)).map(url => url.split('#')[0]);

  console.log(`\n======================================================`);
  console.log(`🔍 INSPECCIÓN EN VIVO DE URLs (${uniqueUrls.length} URLs)`);
  console.log(`======================================================`);

  const inspectionResults: any[] = [];
  const coverageStateCount: Record<string, number> = {};

  for (const url of uniqueUrls) {
    try {
      console.log(`⏳ Inspeccionando: ${url}`);
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
        richResults: res.data.inspectionResult?.richResultsResult || null,
      });
    } catch (err: any) {
      console.warn(`⚠️ Error al inspeccionar ${url}:`, err?.message || err);
    }
  }

  console.log('\n======================================================');
  console.log('📊 RESUMEN DE COBERTURA Y VERDICTOR EN GOOGLE SEARCH CONSOLE');
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

  // 3. Search Analytics (Rendimiento)
  try {
    console.log(`\n======================================================`);
    console.log(`📈 DATOS DE RENDIMIENTO Y CONSULTAS (SEARCH ANALYTICS)`);
    console.log(`======================================================`);
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const analyticsRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: thirtyDaysAgo,
        endDate: today,
        dimensions: ['query', 'page'],
        rowLimit: 10,
      }
    });

    const rows = analyticsRes.data.rows || [];
    if (rows.length === 0) {
      console.log('ℹ️ No hay suficientes datos de búsquedas recientes acumulados aún (sitio de reciente alta).');
    } else {
      console.table(rows.map(r => ({
        Query: r.keys?.[0] || 'N/A',
        Page: r.keys?.[1]?.replace('https://simonpastasartesanales.com.ar', '') || 'N/A',
        Clicks: r.clicks,
        Impressions: r.impressions,
        CTR: `${((r.ctr || 0) * 100).toFixed(2)}%`,
        Position: r.position?.toFixed(1),
      })));
    }
  } catch (analyticsErr: any) {
    console.warn(`⚠️ Error al consultar Search Analytics:`, analyticsErr?.message || analyticsErr);
  }

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
