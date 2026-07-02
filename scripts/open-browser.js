const { exec } = require('child_process');
const path = require('path');

function openBrowser(targetPath) {
  const isUrl = targetPath.startsWith('http://') || targetPath.startsWith('https://');
  const absolutePath = isUrl ? targetPath : path.resolve(targetPath);
  console.log(`🌐 Abriendo en el navegador: ${absolutePath}`);
  const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start ""' : 'xdg-open';
  exec(`${start} "${absolutePath}"`, (err) => {
    if (err) {
      console.error(`❌ No se pudo abrir el navegador: ${err.message}`);
    }
  });
}

module.exports = openBrowser;
