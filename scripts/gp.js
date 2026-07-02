const { execSync, spawn } = require('child_process');
const path = require('path');
const openBrowser = require('./open-browser');

try {
  // 1. Get current branch
  const branch = execSync('git symbolic-ref --short HEAD', { encoding: 'utf8' }).trim();
  if (!branch) {
    console.error('❌ Error: No estás en una rama de git activa.');
    process.exit(1);
  }

  console.log(`🚀 Ejecutando git push --set-upstream origin ${branch}...`);

  // 2. Execute git push (inheriting stdio so stdout/stderr and credentials prompts display correctly)
  const gitPush = spawn('git', ['push', '--set-upstream', 'origin', branch], { stdio: 'inherit' });

  gitPush.on('close', (code) => {
    if (code !== 0) {
      console.error('❌ Error: El push falló.');
      process.exit(code);
    }

    // 3. Get remote origin URL
    let remoteUrl = '';
    try {
      remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
    } catch (e) {
      console.warn('⚠️ Advertencia: No se pudo obtener la URL de \'origin\'.');
      process.exit(0);
    }

    // 4. Construct PR URL
    let cleanUrl = remoteUrl;
    if (cleanUrl.startsWith('git@github.com:')) {
      cleanUrl = cleanUrl.replace('git@github.com:', 'https://github.com/');
    } else if (cleanUrl.startsWith('git@github.com')) {
      cleanUrl = cleanUrl.replace('git@github.com', 'https://github.com/');
    }
    if (cleanUrl.endsWith('.git')) {
      cleanUrl = cleanUrl.slice(0, -4);
    }

    const prUrl = `${cleanUrl}/pull/new/${branch}`;

    console.log('\n🔥 ¡Push completado con éxito!');
    console.log('🔗 Crea tu Pull Request aquí:');
    console.log(`👉 ${prUrl}\n`);

    // 5. Open browser
    try {
      openBrowser(prUrl);
    } catch (err) {
      console.error('⚠️ No se pudo abrir el navegador automáticamente:', err.message);
    }
  });

} catch (error) {
  console.error('❌ Error al ejecutar el push:', error.message);
  process.exit(1);
}
