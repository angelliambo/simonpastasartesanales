/**
 * MERN SaaS Factory Framework - Monorepo Version Management CLI
 * Herramienta para incremento de versiones según SemVer (patch, minor, major)
 * con propagación y sincronización de dependencias internas exactas (sin '^' ni '~').
 *
 * Uso:
 *   yarn bump status                     # Muestra tabla de versiones
 *   yarn bump sync                       # Sincroniza versiones exactas de dependencias @factory/*
 *   yarn bump <target> <type|version>    # Incrementa un package y propaga a sus dependientes
 *   yarn bump auto <type>                # Auto-detecta paquetes modificados en Git y los incrementa
 *   yarn bump --help | --h              # Muestra ayuda y ejemplos
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');

const TARGET_MAP = {
  frontend: { name: 'Portal Frontend', path: 'packages/portal/frontend/package.json', key: 'version', packageName: '@factory/frontend' },
  'portal-frontend': { name: 'Portal Frontend', path: 'packages/portal/frontend/package.json', key: 'version', packageName: '@factory/frontend' },
  backend: { name: 'Portal Backend', path: 'packages/portal/backend/package.json', key: 'version', packageName: '@factory/backend' },
  'portal-backend': { name: 'Portal Backend', path: 'packages/portal/backend/package.json', key: 'version', packageName: '@factory/backend' },
  portal: { name: 'Portal Package Root', path: 'packages/portal/package.json', key: 'version', packageName: '@factory/portal' },
  shared: { name: 'Shared Core', path: 'packages/shared/package.json', key: 'version', packageName: '@factory/shared' }
};

function readJSON(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) return null;
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

function writeJSON(relPath, data) {
  const fullPath = path.join(ROOT_DIR, relPath);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function incrementSemVer(currentVersion, bumpType) {
  const parts = currentVersion.split('.').map(n => parseInt(n, 10));
  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error(`Versión inválida SemVer: "${currentVersion}"`);
  }
  let [major, minor, patch] = parts;

  switch (bumpType.toLowerCase()) {
    case 'patch':
      patch += 1;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    default:
      if (/^\d+\.\d+\.\d+$/.test(bumpType)) {
        return bumpType;
      }
      throw new Error(`Tipo de incremento no reconocido: "${bumpType}". Usa: patch, minor, major o x.y.z`);
  }

  return `${major}.${minor}.${patch}`;
}

function getPackageVersions() {
  const pkgVersions = {};
  const seenPaths = new Set();

  for (const target of Object.values(TARGET_MAP)) {
    if (seenPaths.has(target.path)) continue;
    seenPaths.add(target.path);

    const json = readJSON(target.path);
    if (json && json.name && json.version) {
      pkgVersions[json.name] = json.version;
    }
  }
  return pkgVersions;
}

function syncInternalDependencies(verbose = false) {
  const currentVersions = getPackageVersions();
  const manifestPaths = [
    'packages/portal/frontend/package.json',
    'packages/portal/backend/package.json',
    'packages/portal/package.json',
    'packages/shared/package.json'
  ];

  let totalSyncs = 0;
  const syncReport = [];

  for (const relPath of manifestPaths) {
    const json = readJSON(relPath);
    if (!json) continue;

    let modified = false;
    const depSections = ['dependencies', 'devDependencies', 'peerDependencies'];

    for (const section of depSections) {
      if (!json[section]) continue;

      for (const [depName, currentDepVer] of Object.entries(json[section])) {
        if (currentVersions[depName]) {
          const expectedVer = currentVersions[depName]; // Exact version, no '^' or '~'
          if (currentDepVer !== expectedVer) {
            json[section][depName] = expectedVer;
            modified = true;
            totalSyncs++;
            syncReport.push(`  ↳ 🔄 [${json.name || relPath}] ${depName}: "${currentDepVer}" -> "${expectedVer}" (${section})`);
          }
        }
      }
    }

    if (modified) {
      writeJSON(relPath, json);
    }
  }

  if (verbose || totalSyncs > 0) {
    if (totalSyncs > 0) {
      console.log(`\n🔗 Sincronización de Dependencias Internas Exactas (${totalSyncs} actualizadas):`);
      syncReport.forEach(line => console.log(line));
    } else if (verbose) {
      console.log('✅ Todas las dependencias internas @factory/* están 100% sincronizadas en sus versiones exactas.');
    }
  }

  return totalSyncs;
}

function printStatus() {
  console.log('\n📊 Estado de Versiones del Monorepo MERN SaaS Factory:\n');
  console.log(' Target'.padEnd(20) + ' | File Path'.padEnd(42) + ' | Versión Actual');
  console.log('-'.repeat(80));

  const seenPaths = new Set();
  for (const [key, target] of Object.entries(TARGET_MAP)) {
    if (seenPaths.has(target.path)) continue;
    seenPaths.add(target.path);

    const json = readJSON(target.path);
    const ver = json ? json[target.key] : 'N/A';
    console.log(` ${key.padEnd(19)} | ${target.path.padEnd(40)} | v${ver}`);
  }
  console.log('');
  syncInternalDependencies(false);
}

function printHelp() {
  console.log(`
🚀 MERN SaaS Factory Monorepo Version Bump Tool

Uso:
  yarn bump <target> <tipo_o_version>
  yarn bump status
  yarn bump sync
  yarn bump --help

Comandos y Opciones:
  status, --status                 Muestra la tabla de versiones actuales de todos los packages.
  sync                             Audita y sincroniza dependencias internas @factory/* a sus versiones exactas.
  auto [patch|minor|major]         Detecta automáticamente paquetes modificados en Git y los incrementa.
  <package> patch                  Incrementa el último dígito (x.y.Z+1) para corrección de errores / bug fixes.
  <package> minor                  Incrementa el dígito del medio (x.Y+1.0) para nuevas funciones / features.
  <package> major                  Incrementa el primer dígito (X+1.0.0) para cambios breaking.
  <package> <x.y.z>                Establece la versión de manera explícita (ej. 1.5.0).

Packages Disponibles (<package>):
  frontend | portal-frontend       Portal Web Frontend (packages/portal/frontend/package.json)
  backend  | portal-backend        Portal Web Backend (packages/portal/backend/package.json)
  portal                           Raíz del Portal (packages/portal/package.json)
  shared                           Shared Core (packages/shared/package.json)

Ejemplos Prácticos:
  yarn bump status                 # Ver tabla de versiones actual
  yarn bump sync                   # Sincronizar dependencias internas a sus versiones exactas
  yarn bump auto minor             # Incrementar MINOR a todos los packages modificados en Git
  yarn bump shared minor           # Incrementar MINOR a shared y propagar a frontend/backend
  yarn bump frontend minor         # Incrementar MINOR a frontend (ej. 1.4.0 -> 1.5.0)
  yarn bump backend patch          # Incrementar PATCH a backend (ej. 1.2.4 -> 1.2.5)
  yarn bump --h                    # Mostrar esta ayuda
`);
}

function getModifiedPackages() {
  try {
    let files = [];
    const gitStatus = execSync('git status --porcelain', { cwd: ROOT_DIR, encoding: 'utf8' });
    const statusLines = gitStatus.split('\n').filter(Boolean);

    for (const line of statusLines) {
      const cleanPath = line.substring(3).trim().replace(/^"/, '').replace(/"$/, '');
      if (cleanPath.startsWith('packages/')) {
        files.push(cleanPath);
      }
    }

    if (files.length === 0) {
      const diffCmds = [
        'git diff master...HEAD --name-only',
        'git diff @{u}...HEAD --name-only',
        'git diff HEAD~1 --name-only'
      ];

      for (const cmd of diffCmds) {
        try {
          const diffFiles = execSync(cmd, { cwd: ROOT_DIR, encoding: 'utf8' });
          const diffLines = diffFiles.split('\n').filter(Boolean);
          for (const line of diffLines) {
            if (line.startsWith('packages/')) {
              files.push(line);
            }
          }
          if (files.length > 0) break;
        } catch {
          /* try next command */
        }
      }
    }

    const modifiedTargets = new Set();
    for (const filePath of files) {
      if (filePath.startsWith('packages/portal/frontend/')) modifiedTargets.add('frontend');
      if (filePath.startsWith('packages/portal/backend/')) modifiedTargets.add('backend');
      if (filePath.startsWith('packages/shared/')) modifiedTargets.add('shared');
      if (filePath.startsWith('packages/portal/package.json')) modifiedTargets.add('portal');
    }

    return Array.from(modifiedTargets);
  } catch (error) {
    console.warn('⚠️ No se pudo ejecutar git status:', error.message);
    return [];
  }
}

function bumpTarget(targetKey, bumpType) {
  const target = TARGET_MAP[targetKey];
  if (!target) {
    console.error(`❌ Target desconocido: "${targetKey}". Targets válidos: ${Object.keys(TARGET_MAP).join(', ')}`);
    console.log('Usa "yarn bump --help" para ver los ejemplos de uso.');
    process.exit(1);
  }

  const json = readJSON(target.path);
  if (!json) {
    console.error(`❌ No se encontró el archivo: ${target.path}`);
    process.exit(1);
  }

  const currentVer = json[target.key];
  const newVer = incrementSemVer(currentVer, bumpType);

  json[target.key] = newVer;
  writeJSON(target.path, json);

  console.log(`✅ [${target.name}] Versión actualizada de v${currentVer} -> v${newVer} en ${target.path}`);

  // Auto-propagate to dependent packages in monorepo
  syncInternalDependencies(true);
}

function main() {
  const args = process.argv.slice(2);
  const firstArg = (args[0] || '').toLowerCase();

  if (['-h', '--h', '--help', '-help', 'help', '?'].includes(firstArg)) {
    printHelp();
    return;
  }

  if (firstArg === 'sync') {
    console.log('\n🔍 Relevando y sincronizando dependencias internas del monorepo...');
    syncInternalDependencies(true);
    return;
  }

  if (args.length === 0 || firstArg === 'status' || firstArg === '--status') {
    printStatus();
    return;
  }

  const [targetArg, bumpType = 'minor'] = args;

  if (targetArg === 'auto') {
    const modified = getModifiedPackages();
    if (modified.length === 0) {
      console.log('ℹ️ No se detectaron packages modificados en git status.');
      printStatus();
      return;
    }

    console.log(`🔍 Auto-detectados packages modificados en Git: [${modified.join(', ')}]`);
    for (const tKey of modified) {
      bumpTarget(tKey, bumpType);
    }
    return;
  }

  bumpTarget(targetArg, bumpType);
}

main();
