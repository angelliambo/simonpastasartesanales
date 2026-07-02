import { useState, useEffect, useCallback } from "react";

interface OfflineState {
  isOnline: boolean;
  isOffline: boolean;
  lastOnlineTime: Date | null;
  lastOfflineTime: Date | null;
  offlineDuration: number; // en milisegundos
}

interface OfflineActions {
  retry: () => void;
  goOnline: () => void;
  goOffline: () => void;
}

export const useOffline = (): OfflineState & OfflineActions => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(
    navigator.onLine ? new Date() : null
  );
  const [lastOfflineTime, setLastOfflineTime] = useState<Date | null>(
    !navigator.onLine ? new Date() : null
  );
  const [offlineDuration, setOfflineDuration] = useState(0);

  // Calcular duración offline
  // Optimizado: intervalo de 1000ms a 5000ms para reducir TBT (Total Blocking Time)
  useEffect(() => {
    if (!isOnline && lastOfflineTime) {
      const interval = setInterval(() => {
        setOfflineDuration(Date.now() - lastOfflineTime.getTime());
      }, 5000); // Optimizado: 5000ms en lugar de 1000ms para reducir TBT

      return () => clearInterval(interval);
    } else {
      setOfflineDuration(0);
    }
  }, [isOnline, lastOfflineTime]);

  // Manejar cambios de estado de conexión
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastOnlineTime(new Date());
      setLastOfflineTime(null);
      setOfflineDuration(0);

      // Notificar al usuario que la conexión se restauró
      if ("serviceWorker" in navigator && "Notification" in window) {
        new Notification("Conexión restaurada", {
          body: "Tu conexión a internet se ha restaurado",
          icon: "/favicon.ico",
          tag: "connection-restored",
        });
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setLastOfflineTime(new Date());

      // Guardar estado offline en localStorage
      localStorage.setItem("app-went-offline", new Date().toISOString());
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Acciones
  const retry = useCallback(() => {
    if (navigator.onLine) {
      window.location.reload();
    } else {
      // Intentar hacer una petición para verificar conexión
      fetch("/api/health", {
        method: "HEAD",
        cache: "no-cache",
      })
        .then(() => {
          setIsOnline(true);
          setLastOnlineTime(new Date());
        })
        .catch(() => {
          // Aún sin conexión
          console.log("Sin conexión confirmada");
        });
    }
  }, []);

  const goOnline = useCallback(() => {
    setIsOnline(true);
    setLastOnlineTime(new Date());
    setLastOfflineTime(null);
    setOfflineDuration(0);
  }, []);

  const goOffline = useCallback(() => {
    setIsOnline(false);
    setLastOfflineTime(new Date());
  }, []);

  return {
    isOnline,
    isOffline: !isOnline,
    lastOnlineTime,
    lastOfflineTime,
    offlineDuration,
    retry,
    goOnline,
    goOffline,
  };
};

// Hook para detectar si la app puede funcionar offline
export const useOfflineCapability = () => {
  const [canWorkOffline, setCanWorkOffline] = useState(false);

  useEffect(() => {
    // Verificar si hay service worker registrado
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setCanWorkOffline(true);
      });
    }

    // Verificar cache disponible
    if ("caches" in window) {
      caches.keys().then((cacheNames) => {
        if (cacheNames.length > 0) {
          setCanWorkOffline(true);
        }
      });
    }
  }, []);

  return canWorkOffline;
};

// Hook para manejar datos offline
export const useOfflineData = <T>(key: string, initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(`offline-data-${key}`);
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    } catch (err) {
      console.error("Error loading offline data:", err);
    }
  }, [key]);

  // Guardar datos en localStorage
  const saveData = useCallback(
    (newData: T) => {
      try {
        setData(newData);
        localStorage.setItem(`offline-data-${key}`, JSON.stringify(newData));
      } catch (err) {
        console.error("Error saving offline data:", err);
        setError("Error al guardar datos offline");
      }
    },
    [key]
  );

  // Sincronizar datos cuando vuelve la conexión
  const syncData = useCallback(
    async (syncFunction: (data: T) => Promise<void>) => {
      if (!navigator.onLine) {
        setError("Sin conexión para sincronizar");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        await syncFunction(data);
        // Marcar como sincronizado
        localStorage.setItem(
          `offline-data-${key}-synced`,
          new Date().toISOString()
        );
      } catch (err) {
        setError("Error al sincronizar datos");
        console.error("Sync error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [data, key]
  );

  return {
    data,
    isLoading,
    error,
    saveData,
    syncData,
  };
};
