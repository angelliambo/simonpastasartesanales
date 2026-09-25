import https from 'https';
import http from 'http';

interface AuditTarget {
  name: string;
  url: string;
  expectedStatus: number;
  expectedContentType?: string;
  expectedContentMatch?: string | RegExp;
  userAgent?: string;
}

const PUBLISHER_ID = 'ca-pub-6167435415786243';
const ADS_TXT_ENTRY = `google.com, pub-6167435415786243, DIRECT, f08c47fec0942fa0`;
const DOMAIN = 'simonpastasartesanales.com.ar';

const TARGETS: AuditTarget[] = [
  {
    name: 'HTTPS Root ads.txt (Standard AdSense Crawler)',
    url: `https://${DOMAIN}/ads.txt`,
    expectedStatus: 200,
    expectedContentType: 'text/plain',
    expectedContentMatch: 'google.com, pub-6167435415786243, DIRECT',
    userAgent: 'Mediapartners-Google',
  },
  {
    name: 'HTTPS Root ads.txt (Google-AdSense-AdsTxt Crawler)',
    url: `https://${DOMAIN}/ads.txt`,
    expectedStatus: 200,
    expectedContentType: 'text/plain',
    expectedContentMatch: 'google.com, pub-6167435415786243, DIRECT',
    userAgent: 'Google-AdSense-AdsTxt',
  },
  {
    name: 'HTTPS WWW ads.txt Redirect / Direct Delivery',
    url: `https://www.${DOMAIN}/ads.txt`,
    expectedStatus: 200,
    expectedContentType: 'text/plain',
    expectedContentMatch: 'google.com, pub-6167435415786243, DIRECT',
    userAgent: 'Mediapartners-Google',
  },
  {
    name: 'HTTPS HTML Head Meta Tag Verification',
    url: `https://${DOMAIN}/`,
    expectedStatus: 200,
    expectedContentMatch: /<meta\s+name=["']google-adsense-account["']\s+content=["']ca-pub-6167435415786243["']/i,
    userAgent: 'Googlebot',
  },
];

function fetchUrl(target: AuditTarget, redirectCount = 0): Promise<{ status: number; contentType: string; body: string; headers: any; finalUrl: string }> {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      return reject(new Error('Demasiadas redirecciones (max 5)'));
    }

    const isHttps = target.url.startsWith('https');
    const client = isHttps ? https : http;

    const req = client.get(
      target.url,
      {
        headers: {
          'User-Agent': target.userAgent || 'Mozilla/5.0 (compatible; Google-AdSense-AdsTxt/1.0)',
          'Accept': '*/*',
        },
      },
      (res) => {
        if ([301, 302, 307, 308].includes(res.statusCode || 0) && res.headers.location) {
          let nextUrl = res.headers.location;
          if (nextUrl.startsWith('/')) {
            const parsed = new URL(target.url);
            nextUrl = `${parsed.protocol}//${parsed.host}${nextUrl}`;
          }
          return fetchUrl({ ...target, url: nextUrl }, redirectCount + 1).then(resolve).catch(reject);
        }

        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          resolve({
            status: res.statusCode || 0,
            contentType: res.headers['content-type'] || '',
            body,
            headers: res.headers,
            finalUrl: target.url,
          });
        });
      }
    );

    req.on('error', (err) => reject(err));
    req.end();
  });
}

async function runAdSenseVerificationAudit() {
  console.log(`\n================================================================================`);
  console.log(`🔍 AUDITORÍA DE VERIFICACIÓN EN VIVO DE GOOGLE ADSENSE (ADS.TXT & META TAG)`);
  console.log(`================================================================================`);
  console.log(`• Publisher ID: ${PUBLISHER_ID}`);
  console.log(`• Entrada ads.txt Esperada: ${ADS_TXT_ENTRY}`);
  console.log(`• Dominio Principal: ${DOMAIN}`);
  console.log(`--------------------------------------------------------------------------------\n`);

  let passed = 0;
  let total = TARGETS.length;

  for (const target of TARGETS) {
    try {
      console.log(`⏳ Comprobando: ${target.name}...`);
      console.log(`   URL: ${target.url}`);
      const result = await fetchUrl(target);

      let isStatusOk = result.status === target.expectedStatus || (result.status >= 200 && result.status < 400);
      let isContentTypeOk = !target.expectedContentType || result.contentType.includes(target.expectedContentType);
      
      let isContentOk = true;
      if (target.expectedContentMatch) {
        if (typeof target.expectedContentMatch === 'string') {
          isContentOk = result.body.includes(target.expectedContentMatch);
        } else {
          isContentOk = target.expectedContentMatch.test(result.body);
        }
      }

      if (isStatusOk && isContentTypeOk && isContentOk) {
        console.log(`   ✅ PASÓ: HTTP ${result.status} | Content-Type: ${result.contentType}`);
        passed++;
      } else {
        console.log(`   ❌ FALLÓ: HTTP ${result.status} | Content-Type: ${result.contentType}`);
        if (!isContentOk) console.log(`      ⚠️ El contenido no coincidió con lo esperado.`);
      }
    } catch (err: any) {
      console.log(`   ❌ ERROR DE RED: ${err?.message || err}`);
    }
    console.log(`--------------------------------------------------------------------------------`);
  }

  console.log(`\n================================================================================`);
  console.log(`📊 RESUMEN FINAL: ${passed}/${total} pruebas superadas.`);
  console.log(`================================================================================\n`);
}

runAdSenseVerificationAudit();
