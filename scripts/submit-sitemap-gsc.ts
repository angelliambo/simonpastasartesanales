import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import { BRAND_CONFIG } from '../packages/shared/src/config/brand';

async function submitSitemap() {
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
  const sitemapUrl = `https://${targetDomain}/sitemap.xml`;

  console.log(`\n======================================================`);
  console.log(`🚀 RE-ENVIANDO SITEMAP FRESCO A GOOGLE SEARCH CONSOLE`);
  console.log(`======================================================`);
  console.log(`• Sitio: ${siteUrl}`);
  console.log(`• Sitemap URL: ${sitemapUrl}`);

  try {
    const res = await searchconsole.sitemaps.submit({
      siteUrl,
      feedpath: sitemapUrl,
    });

    console.log(`\n✅ Sitemap re-enviado exitosamente a Google Search Console! Status: ${res.status}`);
  } catch (err: any) {
    console.error(`⚠️ Error enviando el sitemap a GSC: ${err?.message || err}`);
  }
}

submitSitemap();
