const { execSync, spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3005;
const BUILD_DIR = path.resolve(__dirname, '../packages/portal/frontend/build');
const REPORT_DIR = path.resolve(__dirname, '../audits/portal');

const TEMP_DIR = path.resolve(__dirname, '../_garbage/lh-temp-portal');
const PROFILE_DIR = path.resolve(__dirname, '../_garbage/lh-profile-portal');

const noOpen = process.argv.includes('--no-open');
const openBrowser = require('./open-browser');

function getTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const min = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  return `${yyyy}${mm}${dd}-${hh}${min}${ss}`;
}

const timestamp = getTimestamp();
const REPORT_FILE = `report-${timestamp}.json`;
const REPORT_PATH = path.join(REPORT_DIR, REPORT_FILE);

// Ensure reports directory exists
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

// Ensure garbage directories exist
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}
if (!fs.existsSync(PROFILE_DIR)) {
  fs.mkdirSync(PROFILE_DIR, { recursive: true });
}

// 1. Build portal frontend if missing
if (!fs.existsSync(BUILD_DIR) || !fs.existsSync(path.join(BUILD_DIR, 'index.html'))) {
  console.log('🏗️  No se detectó el build de producción del portal. Compilando...');
  try {
    execSync('yarn workspace @factory/portal-frontend build', { stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Error al compilar el portal:', err.message);
    process.exit(1);
  }
}

// 2. Start a simple static server
console.log('🚀 Iniciando servidor estático local para el portal...');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  const cleanUrl = req.url.split('?')[0];
  let filePath = path.join(BUILD_DIR, cleanUrl);

  // Fallback to index.html for SPA routing
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(BUILD_DIR, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error loading resource: ${err.code}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Servidor estático escuchando en http://localhost:${PORT}`);
  console.log('🔍 Ejecutando auditoría de rendimiento con Lighthouse...');

  // Use npx -y to run lighthouse non-interactively
  const args = [
    '-y',
    'lighthouse',
    `http://localhost:${PORT}`,
    '--output=json',
    `--output-path=${REPORT_PATH}`,
    `--chrome-flags="--headless --no-sandbox --disable-gpu --user-data-dir=${PROFILE_DIR}"`,
  ];

  const lh = spawn('npx', args, {
    shell: true,
    stdio: 'inherit',
    env: {
      ...process.env,
      TEMP: TEMP_DIR,
      TMP: TEMP_DIR,
    }
  });

  lh.on('close', (code) => {
    console.log('🧹 Deteniendo servidor estático local...');
    server.close(() => {
      const hasReport = fs.existsSync(REPORT_PATH) && fs.statSync(REPORT_PATH).size > 0;
      if (hasReport) {
        console.log(`\n🎉 Auditoría completada con éxito.`);
        console.log(`📊 Reporte JSON: ${REPORT_PATH}`);

        // Update history and reports-data.js
        try {
          const reportData = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
          updateHistoryAndData(reportData);
        } catch (err) {
          console.error('⚠️ No se pudo procesar el historial de auditoría:', err.message);
        }

        if (!noOpen) {
          openBrowser(path.join(REPORT_DIR, 'report.html'));
        }
        process.exit(0);
      } else {
        console.error(`❌ Lighthouse falló con código de salida ${code} y no se generó el reporte.`);
        process.exit(1);
      }
    });
  });
});

function updateHistoryAndData(reportData) {
  const historyPath = path.join(REPORT_DIR, 'history.json');
  let history = [];
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    } catch (e) {
      console.error('Failed to parse history.json:', e);
    }
  }

  // Extract scores
  const categories = reportData.categories || {};
  const scores = {
    performance: categories.performance?.score !== undefined ? categories.performance.score * 100 : null,
    accessibility: categories.accessibility?.score !== undefined ? categories.accessibility.score * 100 : null,
    bestPractices: categories['best-practices']?.score !== undefined ? categories['best-practices'].score * 100 : null,
    seo: categories.seo?.score !== undefined ? categories.seo.score * 100 : null,
  };

  // Extract metrics
  const audits = reportData.audits || {};
  const metrics = {
    fcp: audits['first-contentful-paint']?.displayValue || (audits['first-contentful-paint']?.numericValue ? `${Math.round(audits['first-contentful-paint'].numericValue)} ms` : '-'),
    lcp: audits['largest-contentful-paint']?.displayValue || (audits['largest-contentful-paint']?.numericValue ? `${Math.round(audits['largest-contentful-paint'].numericValue)} ms` : '-'),
    tbt: audits['total-blocking-time']?.displayValue || (audits['total-blocking-time']?.numericValue ? `${Math.round(audits['total-blocking-time'].numericValue)} ms` : '-'),
    cls: audits['cumulative-layout-shift']?.displayValue || (audits['cumulative-layout-shift']?.numericValue ? audits['cumulative-layout-shift'].numericValue.toFixed(3) : '-'),
    speedIndex: audits['speed-index']?.displayValue || (audits['speed-index']?.numericValue ? `${Math.round(audits['speed-index'].numericValue)} ms` : '-'),
    interactive: audits['interactive']?.displayValue || (audits['interactive']?.numericValue ? `${Math.round(audits['interactive'].numericValue)} ms` : '-'),
  };

  const newRun = {
    timestamp: reportData.fetchTime || new Date().toISOString(),
    scores,
    metrics,
    file: REPORT_FILE
  };

  history.unshift(newRun);
  if (history.length > 2) {
    history = history.slice(0, 2);
  }

  // Write history
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), 'utf8');

  // Garbage collection: Keep only the JSON files for the latest 2 runs, delete the rest
  const allowedFiles = new Set(history.map(run => run.file));
  try {
    const files = fs.readdirSync(REPORT_DIR);
    files.forEach(file => {
      if (file.startsWith('report-') && file.endsWith('.json')) {
        if (!allowedFiles.has(file)) {
          const filePath = path.join(REPORT_DIR, file);
          console.log(`🗑️ Eliminando reporte antiguo para evitar acumular archivos: ${file}`);
          fs.unlinkSync(filePath);
        }
      }
    });
  } catch (err) {
    console.error('⚠️ Error al limpiar reportes antiguos:', err.message);
  }

  // Write reports-data.js
  const reportsDataContent = `window.PORTAL_AUDIT_DATA = {
  latest: ${JSON.stringify(reportData, null, 2)},
  history: ${JSON.stringify(history, null, 2)}
};`;
  fs.writeFileSync(path.join(REPORT_DIR, 'reports-data.js'), reportsDataContent, 'utf8');
}
