/**
 * Versión del Portal (package.json raíz)
 *
 * Obtiene la versión del portal desde el endpoint del backend (BFF).
 * El flujo es: BFF → RTK Query → Redux Store → Hook
 *
 * El backend cachea la versión en memoria para evitar lecturas repetidas del filesystem.
 * El frontend sincroniza RTK Query con Redux Store para acceso centralizado.
 */

import { useMemo, useEffect, useRef } from "react";
import { useGetPortalVersionQuery } from "../services/api/systemService";
import { useAppDispatch, useAppSelector } from "../store";
import {
  setPortalVersion,
  setLoading,
  setError,
} from "../store/slices/systemSlice";

/**
 * Hook para obtener la versión del portal
 *
 * Flujo completo:
 * 1. RTK Query obtiene versión desde BFF (/api/system/version)
 * 2. Hook sincroniza resultado con Redux Store (systemSlice)
 * 3. Hook retorna versión desde store (accesible también via useAppSelector)
 *
 * @returns Versión del portal desde el backend o "1.0.0" por defecto
 */
export const usePortalVersion = () => {
  const dispatch = useAppDispatch();
  const hasSyncedRef = useRef(false);

  // Obtener versión desde RTK Query (fetch desde BFF)
  const {
    data,
    isLoading: rtkLoading,
    error: rtkError,
  } = useGetPortalVersionQuery(undefined, {
    // No hacer polling ya que la versión no cambia
    pollingInterval: 0,
    // No refetch automático: la versión es estable durante la sesión
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    // Cache permanente en RTK Query (configurado en systemService)
  });

  // Obtener versión desde Redux Store (fuente única de verdad)
  const storeVersion = useAppSelector((state) => state.system.versions.portal);
  const storeLoading = useAppSelector((state) => state.system.isLoading);
  const storeError = useAppSelector((state) => state.system.error);

  // Sincronizar RTK Query con Redux Store solo una vez
  useEffect(() => {
    // Si ya hay versión en el store, no sincronizar de nuevo
    if (storeVersion && hasSyncedRef.current) {
      return;
    }

    if (rtkLoading) {
      if (!storeLoading) {
        dispatch(setLoading(true));
      }
    } else if (data?.version) {
      // Solo sincronizar si la versión es diferente o no se ha sincronizado
      if (!hasSyncedRef.current || storeVersion !== data.version) {
        dispatch(
          setPortalVersion({
            version: data.version,
            error: data.error,
          })
        );
        hasSyncedRef.current = true;
      }
    } else if (rtkError) {
      // Solo sincronizar error si no hay error previo
      if (!storeError) {
        dispatch(setError("Error al obtener versión del portal"));
      }
    }
  }, [data?.version, rtkLoading, rtkError, dispatch, storeVersion, storeLoading, storeError]);

  // Priorizar versión del store, con fallback a RTK Query si aún no se sincronizó
  const version = useMemo(() => {
    return storeVersion || data?.version || "1.0.0";
  }, [storeVersion, data?.version]);

  return {
    version,
    isLoading: storeLoading || rtkLoading,
    error: storeError || (rtkError ? "Error al obtener versión" : null),
  };
};

/**
 * Obtener la versión del portal desde el store (para uso fuera de componentes)
 * ⚠️ Usar usePortalVersion() en componentes React
 *
 * Esta función accede directamente al store sin suscribirse a cambios.
 * Útil para casos donde no se puede usar hooks (utils, helpers, etc.)
 *
 * @returns Versión del portal desde el store o "1.0.0" por defecto
 */
export const getPortalVersion = (): string => {
  // Importación dinámica para evitar dependencias circulares
  const store = require("../store/store").store;
  const state = store.getState();
  return state.system?.versions?.portal || "1.0.0";
};

/**
 * Selector para obtener todas las versiones del sistema desde el store
 * Útil para componentes que necesitan acceder a múltiples versiones
 */
export const useSystemVersions = () => {
  const versions = useAppSelector((state) => ({
    portal: state.system.versions.portal || "1.0.0",
    frontend: state.system.versions.frontend,
    backend: state.system.versions.backend,
    isLoading: state.system.isLoading,
    error: state.system.error,
    lastUpdated: state.system.lastUpdated,
  }));
  return versions;
};
