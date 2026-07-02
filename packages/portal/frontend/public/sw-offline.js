// Service Worker simplificado para Simon App
// Versión: 3.0.0 - Optimizado para rendimiento
const CACHE_NAME = "zn-portal-v3.0";
const STATIC_CACHE = "zn-portal-static-v3.0";

// Recursos críticos mínimos
const CRITICAL_RESOURCES = ["/", "/manifest.json", "/favicon.ico"];

// Instalar service worker
self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando versión 3.0.0");

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("Service Worker: Cacheando recursos críticos");
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log("Service Worker: Instalación completada");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Service Worker: Error en instalación:", error);
      })
  );
});

// Activar service worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activando versión 3.0.0");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Eliminar caches antiguos
            if (cacheName !== STATIC_CACHE && cacheName !== CACHE_NAME) {
              console.log(
                "Service Worker: Eliminando cache antiguo:",
                cacheName
              );
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Activación completada");
        return self.clients.claim();
      })
      .catch((error) => {
        console.error("Service Worker: Error en activación:", error);
      })
  );
});

// Interceptar requests
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) {
    return;
  }

  // Estrategia simple: Network First para todo
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Si la respuesta es exitosa, cachearla
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla, intentar desde cache
        return caches.match(request).then((response) => {
          if (response) {
            return response;
          }
          // Si no hay cache, mostrar página offline
          if (request.destination === "document") {
            return caches.match("/offline.html");
          }
          return new Response("Recurso no disponible offline", {
            status: 404,
            statusText: "Not Found",
          });
        });
      })
  );
});

// Manejar mensajes del cliente
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

console.log("Service Worker: Cargado versión 3.0.0");
