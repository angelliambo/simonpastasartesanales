/**
 * Versión del Portal
 *
 * Obtiene la versión del portal desde TanStack Query (BFF /api/system/version).
 */

import { useMemo } from "react";
import { useGetPortalVersionQuery } from "../services/api/systemService";

export const usePortalVersion = () => {
  const { data, isLoading, error } = useGetPortalVersionQuery();

  const version = useMemo(() => {
    return data?.version || "1.0.0";
  }, [data?.version]);

  return {
    version,
    isLoading,
    error: error ? "Error al obtener versión" : null,
  };
};

export const getPortalVersionFromStore = (): string => {
  return "1.0.0";
};

export const getSystemVersionsFromStore = () => {
  return {
    portal: "1.0.0",
    frontend: "1.0.0",
    backend: "1.0.0",
    isLoading: false,
    error: null,
    lastUpdated: null,
  };
};

export default usePortalVersion;
