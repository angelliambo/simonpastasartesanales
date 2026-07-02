// Script para deshabilitar completamente el Service Worker
// Úsalo si el Service Worker está causando problemas de rendimiento

console.log("🚫 DESHABILITANDO SERVICE WORKER COMPLETAMENTE");

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

// 3. Prevenir futuras instalaciones de Service Worker
Object.defineProperty(navigator, "serviceWorker", {
  value: undefined,
  writable: false,
  configurable: false,
});

// 4. Recargar la página
setTimeout(function () {
  console.log("🔄 Recargando página sin Service Worker...");
  window.location.reload(true);
}, 2000);

console.log("⏳ La página se recargará en 2 segundos SIN Service Worker...");
console.log("💡 Si la navegación mejora, el problema era el Service Worker");
