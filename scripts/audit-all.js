const { fork } = require('child_process');
const path = require('path');
const openBrowser = require('./open-browser');

console.log('🏁 Iniciando ejecución general de todas las auditorías...');

const runs = [
  { name: 'Portal Performance', script: path.join(__dirname, 'audit-portal.js') },
  { name: 'Extension Performance', script: path.join(__dirname, 'audit-ext.js') },
  { name: 'Wording/i18n Audit', script: path.join(__dirname, 'audit-wording.js') }
];

async function runSequential() {
  for (const run of runs) {
    console.log(`\n--------------------------------------------------`);
    console.log(`▶️ Ejecutando: ${run.name}...`);
    console.log(`--------------------------------------------------`);
    await new Promise((resolve) => {
      const child = fork(run.script, ['--no-open'], { stdio: 'inherit' });
      child.on('close', (code) => {
        console.log(`⏹️ ${run.name} finalizado con código: ${code}`);
        resolve();
      });
    });
  }

  console.log(`\n==================================================`);
  console.log(`🎉 Todas las auditorías completadas exitosamente.`);
  console.log(`==================================================\n`);

  openBrowser(path.join(__dirname, '../audits/index.html'));
}

runSequential().catch((err) => {
  console.error('❌ Error en auditoría general:', err);
  process.exit(1);
});
