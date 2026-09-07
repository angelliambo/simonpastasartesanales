import path from 'path';
import fs from 'fs';
import { google } from 'googleapis';
import { BRAND_CONFIG } from '../packages/shared/src/config/brand';

async function submitProdIndexation() {
  const credsPath = path.join(process.cwd(), 'credentials', 'gcp-service-account.json');
  if (fs.existsSync(credsPath)) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = credsPath;
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: credsPath,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly', 'https://www.googleapis.com/auth/webmasters'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const targetDomain = process?.env?.GSC_SITE_DOMAIN || BRAND_CONFIG.domain;
  const siteUrl = `sc-domain:${targetDomain}`;

  console.log(`\n======================================================`);
  console.log(`🚀 RECLAMO Y ENVÍO MASIVO DE INDEXACIÓN EN PRODUCCIÓN (GSC API)`);
  console.log(`======================================================`);
  console.log(`• Dominio: ${siteUrl}`);
  console.log(`• Producción: https://${targetDomain}`);

  // 1. Re-enviar sitemaps y feeds a la API de Google
  const sitemapsToSubmit = [
    `https://${targetDomain}/sitemap.xml`,
    `https://${targetDomain}/atom.xml`,
    `https://${targetDomain}/rss.xml`,
  ];

  for (const sitemapUrl of sitemapsToSubmit) {
    try {
      console.log(`⏳ Enviando sitemap a Google: ${sitemapUrl}...`);
      const res = await searchconsole.sitemaps.submit({
        siteUrl,
        feedpath: sitemapUrl,
      });
      console.log(`✅ ¡Sitemap ${sitemapUrl} enviado con éxito! Status: ${res.status}`);
    } catch (sErr: any) {
      console.warn(`⚠️ Error enviando ${sitemapUrl}: ${sErr?.message || sErr}`);
    }
  }

  // 2. Inspección y verificación de canónicas en tiempo real en Producción
  const sitemapPath = path.join(process.cwd(), 'packages/portal/frontend/public/sitemap.xml');
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  const locMatches = Array.from(sitemapXml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)).map(m => m[1]);
  const sampleUrls = Array.from(new Set(locMatches)).slice(0, 20);

  console.log(`\n======================================================`);
  console.log(`🔍 INSPECCIONANDO RESULTADOS EN VIVO DE PRODUCCIÓN (${sampleUrls.length} URLs)`);
  console.log(`======================================================`);

  const results = [];
  for (const url of sampleUrls) {
    try {
      console.log(`⏳ Verificando en Google: ${url}...`);
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: siteUrl,
        },
      });

      const indexStatus = res.data.inspectionResult?.indexStatusResult;
      results.push({
        url: url.replace(`https://${targetDomain}`, ''),
        verdict: indexStatus?.verdict || 'PENDIENTE',
        coverageState: indexStatus?.coverageState || 'EN_COLA',
        userCanonical: (indexStatus?.userCanonical || 'Sin declarar').replace(`https://${targetDomain}`, ''),
        googleCanonical: (indexStatus?.googleCanonical || 'Sin asignar').replace(`https://${targetDomain}`, ''),
      });
    } catch (err: any) {
      console.warn(`⚠️ Error verificando ${url}: ${err?.message || err}`);
    }
  }

  console.log('\n======================================================');
  console.log('📋 ESTADO ACTUAL DE CRAWLING Y CANÓNICAS EN PRODUCCIÓN');
  console.log('======================================================');
  console.table(results);

  console.log(`\n✨ Petición de rastreo y sitemaps en producción finalizada exitosamente.`);
}

submitProdIndexation();
