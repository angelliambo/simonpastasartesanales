// Script para deshabilitar temporalmente el Service Worker
console.log("🚫 Deshabilitando Service Worker temporalmente...");

// Desregistrar todos los Service Workers
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    console.log(`📋 Encontrados ${registrations.length} Service Workers`);

    for (let registration of registrations) {
      console.log("🗑️ Desregistrando SW:", registration.scope);
      registration.unregister();
    }

    console.log("✅ Service Workers desregistrados");

    // Recargar la página después de un delay
    setTimeout(function () {
      console.log("🔄 Recargando página sin Service Worker...");
      window.location.reload(true);
    }, 2000);
  });
} else {
  console.log("⚠️ Service Worker no soportado en este navegador");
}

console.log("⏳ La página se recargará en 2 segundos sin Service Worker...");
