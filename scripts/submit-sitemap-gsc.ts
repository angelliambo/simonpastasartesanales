import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

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

  console.log(`\n======================================================`);
  console.log(`🚀 RE-ENVIANDO SITEMAP A GOOGLE SEARCH CONSOLE`);
  console.log(`======================================================`);

  try {
    const sitesRes = await searchconsole.sites.list({});
    const siteList = sitesRes.data.siteEntry || [];
    const matchedSite = siteList.find(s => s.siteUrl?.includes('simonpastasartesanales'));
    const siteUrl = matchedSite?.siteUrl || 'https://simonpastasartesanales.com.ar/';
    const sitemapUrl = 'https://simonpastasartesanales.com.ar/sitemap.xml';

    console.log(`• Sitio identificado en GSC: ${siteUrl}`);
    console.log(`• Sitemap URL: ${sitemapUrl}`);

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
