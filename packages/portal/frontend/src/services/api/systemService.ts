import { useQuery } from "@tanstack/react-query";
import apiClient from "./client";

export interface PortalVersionResponse {
  version: string;
  error?: string;
}

export const PORTAL_VERSION_QUERY_KEY = ["system", "version"];

export const useGetPortalVersionQuery = (arg?: any, options?: { skip?: boolean }) => {
  const query = useQuery({
    queryKey: PORTAL_VERSION_QUERY_KEY,
    queryFn: () => apiClient<PortalVersionResponse>("/system/version"),
    enabled: options?.skip !== true,
    staleTime: Infinity,
  });

  return {
    ...query,
    isLoading: query.isLoading || query.isFetching,
  };
};
