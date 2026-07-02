const fs = require('fs');
const path = require('path');

const locales = ['es-ES', 'en-US', 'en-GB', 'de-DE', 'fr-FR', 'it-IT', 'ja-JP', 'pt-BR'];
const categories = ['ext', 'portal', 'commons'];
const localesDir = path.join(__dirname, '..', 'src', 'i18n', 'locales');
const rootDir = path.join(__dirname, '..', '..', '..');
const reportPath = path.join(rootDir, 'audit_results.txt');

// Delete existing report if it exists
if (fs.existsSync(reportPath)) {
  try {
    fs.unlinkSync(reportPath);
  } catch (err) {
    console.error('Failed to delete existing audit_results.txt:', err);
  }
}

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

let reportContent = '==================================================\n';
reportContent += '          i18n TRANSLATION AUDIT REPORT\n';
reportContent += `Generated on: ${new Date().toISOString()}\n`;
reportContent += '==================================================\n\n';

categories.forEach(category => {
  reportContent += `\n==================================================\n`;
  reportContent += `CATEGORY: ${category.toUpperCase()}\n`;
  reportContent += `==================================================\n`;
  
  const esMXCatPath = path.join(localesDir, 'es-MX', category);
  if (!fs.existsSync(esMXCatPath)) {
    reportContent += `[ERROR] es-MX category path not found: ${category}\n`;
    return;
  }
  
  const files = fs.readdirSync(esMXCatPath).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  
  files.forEach(file => {
    reportContent += `\nFile: ${category}/${file}\n`;
    const esMXFilePath = path.join(esMXCatPath, file);
    const esMXData = parseTranslationFile(esMXFilePath);
    
    if (!esMXData) {
      reportContent += `  [ERROR] Failed to parse es-MX file: ${file}\n`;
      return;
    }
    
    locales.forEach(locale => {
      const localeFilePath = path.join(localesDir, locale, category, file);
      
      if (!fs.existsSync(localeFilePath)) {
        reportContent += `  [MISSING FILE] Locale: ${locale}\n`;
        return;
      }
      
      const localeData = parseTranslationFile(localeFilePath);
      if (!localeData) {
        reportContent += `  [PARSE ERROR] Locale: ${locale} (Failed to parse file)\n`;
        return;
      }
      
      Object.keys(esMXData).forEach(objName => {
        if (!localeData[objName]) {
          reportContent += `  [MISSING OBJECT] Locale: ${locale}, Object: ${objName}\n`;
          return;
        }
        
        const esMXObj = esMXData[objName];
        const localeObj = localeData[objName];
        
        Object.keys(esMXObj).forEach(key => {
          const esMXVal = esMXObj[key];
          const localeVal = localeObj[key];
          
          if (localeVal === undefined) {
            reportContent += `  [MISSING KEY] Locale: ${locale}, Object: ${objName}, Key: ${key} (es-MX: "${esMXVal}")\n`;
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
              reportContent += `  [SUSPECT IDENTICAL] Locale: ${locale}, Object: ${objName}, Key: ${key} -> Value: "${localeVal}"\n`;
            }
          }
        });
      });
    });
  });
});

fs.writeFileSync(reportPath, reportContent, 'utf8');
console.log('Project-wide i18n audit completed. Report written to root audit_results.txt.');
