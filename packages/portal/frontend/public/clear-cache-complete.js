// Script para limpiar completamente el cache del navegador
console.log("🧹 Limpiando cache completo del navegador...");

// 1. Desregistrar todos los Service Workers
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    console.log(`📋 Encontrados ${registrations.length} Service Workers`);

    for (let registration of registrations) {
      console.log("🗑️ Desregistrando SW:", registration.scope);
      registration.unregister();
    }

    console.log("✅ Service Workers desregistrados");
  });
}

// 2. Limpiar todos los caches
if ("caches" in window) {
  caches
    .keys()
    .then(function (cacheNames) {
      console.log(`📦 Encontrados ${cacheNames.length} caches`);

      return Promise.all(
        cacheNames.map(function (cacheName) {
          console.log("🗑️ Eliminando cache:", cacheName);
          return caches.delete(cacheName);
        })
      );
    })
    .then(function () {
      console.log("✅ Caches limpiados");
    });
}

// 3. Limpiar localStorage
try {
  localStorage.clear();
  console.log("✅ localStorage limpiado");
} catch (error) {
  console.log("⚠️ Error limpiando localStorage:", error);
}

// 4. Limpiar sessionStorage
try {
  sessionStorage.clear();
  console.log("✅ sessionStorage limpiado");
} catch (error) {
  console.log("⚠️ Error limpiando sessionStorage:", error);
}

// 5. Recargar la página después de un delay
setTimeout(function () {
  console.log("🔄 Recargando página...");
  window.location.reload(true);
}, 3000);

console.log("⏳ La página se recargará en 3 segundos...");
