import { useQuery, queryOptions } from "@tanstack/react-query";
import apiClient from "./client";

export interface PortalVersionResponse {
  version: string;
  error?: string;
}

export const PORTAL_VERSION_QUERY_KEY = ["system", "version"];

export const portalVersionQueryOptions = queryOptions({
  queryKey: PORTAL_VERSION_QUERY_KEY,
  queryFn: () => apiClient<PortalVersionResponse>("/system/version"),
  staleTime: Infinity,
});

export const useGetPortalVersionQuery = (arg?: any, options?: { skip?: boolean }) => {
  const query = useQuery({
    ...portalVersionQueryOptions,
    enabled: options?.skip !== true,
  });

  return {
    ...query,
    isLoading: query.isLoading || query.isFetching,
  };
};
