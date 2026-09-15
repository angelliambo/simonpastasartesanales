import https from 'https';

function fetchPageSpeed(url: string, strategy: 'mobile' | 'desktop'): Promise<any> {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO`;
  
  return new Promise((resolve, reject) => {
    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            console.error('⚠️ Error de API Google PageSpeed:', parsed.error.message || parsed.error);
          }
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function runAudit() {
  const targetUrl = 'https://simonpastasartesanales.com.ar/';
  console.log(`\n======================================================`);
  console.log(`⚡ EVALUANDO PAGESPEED INSIGHTS EN VIVO PARA PROD`);
  console.log(`URL: ${targetUrl}`);
  console.log(`======================================================\n`);

  for (const strategy of ['mobile', 'desktop'] as const) {
    console.log(`⏳ Analizando estrategia ${strategy.toUpperCase()}...`);
    try {
      const res = await fetchPageSpeed(targetUrl, strategy);
      const categories = res.lighthouseResult?.categories || {};
      const audits = res.lighthouseResult?.audits || {};

      const perfScore = Math.round((categories.performance?.score || 0) * 100);
      const accessScore = Math.round((categories.accessibility?.score || 0) * 100);
      const bpScore = Math.round((categories['best-practices']?.score || 0) * 100);
      const seoScore = Math.round((categories.seo?.score || 0) * 100);

      const fcp = audits['first-contentful-paint']?.displayValue;
      const lcp = audits['largest-contentful-paint']?.displayValue;
      const cls = audits['cumulative-layout-shift']?.displayValue;
      const tbt = audits['total-blocking-time']?.displayValue;
      const speedIndex = audits['speed-index']?.displayValue;

      console.log(`\n📊 RESULTADOS EN PRODUCCIÓN (${strategy.toUpperCase()}):`);
      console.log(`------------------------------------------------------`);
      console.log(`🚀 Performance:    ${perfScore} / 100 ${perfScore >= 90 ? '🟢' : perfScore >= 50 ? '🟠' : '🔴'}`);
      console.log(`♿ Accesibilidad:  ${accessScore} / 100 ${accessScore >= 90 ? '🟢' : '🟠'}`);
      console.log(`🛡️ Buenas Prácticas: ${bpScore} / 100 ${bpScore >= 90 ? '🟢' : '🟠'}`);
      console.log(`🔍 SEO:            ${seoScore} / 100 ${seoScore >= 90 ? '🟢' : '🟠'}`);
      console.log(`------------------------------------------------------`);
      console.log(`⏱️ FCP (First Contentful Paint):    ${fcp}`);
      console.log(`🎨 LCP (Largest Contentful Paint):  ${lcp}`);
      console.log(`📐 CLS (Cumulative Layout Shift):   ${cls}`);
      console.log(`⏳ TBT (Total Blocking Time):       ${tbt}`);
      console.log(`⚡ Speed Index:                     ${speedIndex}`);
      console.log(`------------------------------------------------------\n`);
    } catch (err: any) {
      console.error(`❌ Error analizando ${strategy}:`, err?.message || err);
    }
  }
}

runAudit();
