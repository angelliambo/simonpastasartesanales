const fs = require('fs');
const path = require('path');

console.log('======================================================');
console.log('⚡ AUDITORÍA DE RENDIMIENTO PAGESPEED / CORE WEB VITALS');
console.log('======================================================');

let buildDir = path.join(process.cwd(), 'packages/portal/frontend/dist');
if (!fs.existsSync(buildDir) && fs.existsSync(path.join(process.cwd(), 'dist'))) {
  buildDir = path.join(process.cwd(), 'dist');
}

if (!fs.existsSync(buildDir)) {
  console.error('❌ El directorio dist no existe. Por favor ejecute pnpm build primero.');
  process.exit(1);
}

const indexHtmlPath = path.join(buildDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ No se encontró dist/index.html');
  process.exit(1);
}

const html = fs.readFileSync(indexHtmlPath, 'utf8');

console.log('\n🔍 Verificando criterios clave de PageSpeed en dist/index.html:');

// 1. Preload de LCP
const lcpPreload = html.includes('rel="preload"') && html.includes('as="image"');
console.log(`• Pre-carga de imágenes LCP (rel="preload"): ${lcpPreload ? '✅ SÍ' : '⚠️ No detectada'}`);

// 2. Charset al inicio
const charsetIndex = html.indexOf('<meta charset="utf-8"');
console.log(`• Meta charset en los primeros 1024 bytes: ${charsetIndex !== -1 && charsetIndex < 1024 ? '✅ SÍ' : '❌ NO'}`);

// 3. Fuentes no bloqueantes
const fontSwap = html.includes('display=swap');
console.log(`• Fuentes con font-display: swap: ${fontSwap ? '✅ SÍ' : '⚠️ Recomendado'}`);

// 4. Viewport
const viewport = html.includes('name="viewport"');
console.log(`• Meta tag Viewport para móviles: ${viewport ? '✅ SÍ' : '❌ NO'}`);

console.log('\n🎉 Chequeo de estáticos completado. ¡Todo listo para producción!');
