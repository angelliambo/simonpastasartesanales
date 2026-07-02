const fs = require('fs');
const path = require('path');

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

const REPORT_DIR = path.resolve(__dirname, '../audits/wording');
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

const timestamp = getTimestamp();
const REPORT_FILE = `report-${timestamp}.json`;
const REPORT_PATH = path.join(REPORT_DIR, REPORT_FILE);

const locales = ['es-ES', 'en-US', 'en-GB', 'de-DE', 'fr-FR', 'it-IT', 'ja-JP', 'pt-BR'];
const categories = ['ext', 'portal', 'commons'];
const localesDir = path.resolve(__dirname, '../packages/shared/src/i18n/locales');

function parseTranslationFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const result = {};
  
  const objectRegex = /export\s+const\s+(\w+)\s*=\s*\{([\s\S]*?)\};/g;
  let match;
  while ((match = objectRegex.exec(content)) !== null) {
    const objName = match[1];
    const objContent = match[2];
    result[objName] = {};
    
    const lines = objContent.split('\n');
    let currentKey = null;
    let quoteChar = null;
    let currentValue = '';
    let collecting = false;
    
    for (let line of lines) {
      line = line.trim();
      if (line.startsWith('//') || line.startsWith('/*')) {
        continue;
      }
      
      if (!collecting) {
        const keyMatch = line.match(/^['"]?(\w+)['"]?\s*:\s*(['"`])([\s\S]*)$/);
        if (keyMatch) {
          currentKey = keyMatch[1];
          quoteChar = keyMatch[2];
          let rest = keyMatch[3].trim();
          
          if (rest.endsWith(quoteChar) || rest.endsWith(quoteChar + ',') || rest.endsWith(quoteChar + ';')) {
            if (rest.endsWith(',')) rest = rest.slice(0, -1).trim();
            if (rest.endsWith(';')) rest = rest.slice(0, -1).trim();
            if (rest.endsWith(quoteChar)) rest = rest.slice(0, -1);
            result[objName][currentKey] = rest;
          } else {
            currentValue = rest + '\n';
            collecting = true;
          }
        }
      } else {
        if (line.endsWith(quoteChar) || line.endsWith(quoteChar + ',') || line.endsWith(quoteChar + ';')) {
          let val = line;
          if (val.endsWith(',')) val = val.slice(0, -1).trim();
          if (val.endsWith(';')) val = val.slice(0, -1).trim();
          if (val.endsWith(quoteChar)) val = val.slice(0, -1);
          currentValue += val;
          result[objName][currentKey] = currentValue;
          collecting = false;
        } else {
          currentValue += line + '\n';
        }
      }
    }
  }
  return result;
}

console.log('🔍 Iniciando auditoría de redacción (wordings / i18n)...');

const reportData = {
  timestamp: new Date().toISOString(),
  summary: {
    missingFiles: 0,
    missingObjects: 0,
    missingKeys: 0,
    suspectIdentical: 0,
    totalErrors: 0
  },
  details: {
    missingFiles: [],
    missingObjects: [],
    missingKeys: [],
    suspectIdenticals: []
  }
};

categories.forEach(category => {
  const esMXCatPath = path.join(localesDir, 'es-MX', category);
  if (!fs.existsSync(esMXCatPath)) {
    console.error(`❌ Categoría es-MX no encontrada en ruta: ${esMXCatPath}`);
    return;
  }
  
  const files = fs.readdirSync(esMXCatPath).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  
  files.forEach(file => {
    const esMXFilePath = path.join(esMXCatPath, file);
    const esMXData = parseTranslationFile(esMXFilePath);
    
    if (!esMXData) {
      return;
    }
    
    locales.forEach(locale => {
      const localeFilePath = path.join(localesDir, locale, category, file);
      
      if (!fs.existsSync(localeFilePath)) {
        reportData.details.missingFiles.push({ locale, category, file });
        reportData.summary.missingFiles++;
        reportData.summary.totalErrors++;
        return;
      }
      
      const localeData = parseTranslationFile(localeFilePath);
      if (!localeData) {
        reportData.details.missingObjects.push({ locale, category, file, error: 'Error al parsear archivo' });
        reportData.summary.missingObjects++;
        reportData.summary.totalErrors++;
        return;
      }
      
      Object.keys(esMXData).forEach(objName => {
        if (!localeData[objName]) {
          reportData.details.missingObjects.push({ locale, category, file, object: objName });
          reportData.summary.missingObjects++;
          reportData.summary.totalErrors++;
          return;
        }
        
        const esMXObj = esMXData[objName];
        const localeObj = localeData[objName];
        
        Object.keys(esMXObj).forEach(key => {
          const esMXVal = esMXObj[key];
          const localeVal = localeObj[key];
          
          if (localeVal === undefined) {
            reportData.details.missingKeys.push({ locale, category, file, object: objName, key, esMX: esMXVal });
            reportData.summary.missingKeys++;
            reportData.summary.totalErrors++;
          } else if (localeVal === esMXVal && locale !== 'es-ES') {
            const isNaturalMatch = 
              esMXVal.trim() === '' || 
              /^[0-9\-\+\.\s%px]+$/.test(esMXVal) || 
              /^\{\{\w+\}\}$/.test(esMXVal) ||
              /^[A-Za-z0-9]+$/.test(esMXVal) && esMXVal.toLowerCase() === 'google' ||
              esMXVal === '{{nombreSitio}}' ||
              esMXVal === 'Google Docs' ||
              esMXVal === 'PDF Document' ||
              esMXVal === 'Excel' ||
              esMXVal === 'PowerPoint';
              
            if (!isNaturalMatch) {
              reportData.details.suspectIdenticals.push({ locale, category, file, object: objName, key, value: localeVal });
              reportData.summary.suspectIdentical++;
              reportData.summary.totalErrors++;
            }
          }
        });
      });
    });
  });
});

// Save the JSON report
fs.writeFileSync(REPORT_PATH, JSON.stringify(reportData, null, 2), 'utf8');
console.log(`📊 Reporte JSON de redacción generado: ${REPORT_PATH}`);

// Update history and reports-data.js
updateHistoryAndData(reportData);

if (!noOpen) {
  openBrowser(path.join(REPORT_DIR, 'report.html'));
}

function updateHistoryAndData(data) {
  const historyPath = path.join(REPORT_DIR, 'history.json');
  let history = [];
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    } catch (e) {
      console.error('Failed to parse history.json:', e);
    }
  }

  const newRun = {
    timestamp: data.timestamp,
    summary: data.summary,
    file: REPORT_FILE
  };

  history.unshift(newRun);
  if (history.length > 2) {
    history = history.slice(0, 2);
  }

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

  const reportsDataContent = `window.WORDING_AUDIT_DATA = {
  latest: ${JSON.stringify(data, null, 2)},
  history: ${JSON.stringify(history, null, 2)}
};`;
  fs.writeFileSync(path.join(REPORT_DIR, 'reports-data.js'), reportsDataContent, 'utf8');
}
