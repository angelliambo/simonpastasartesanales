import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./client";

export const ADMIN_USERS_QUERY_KEY = (page = 1, limit = 20) => ["admin", "users", page, limit];
export const ADMIN_STATS_QUERY_KEY = ["admin", "stats"];

export const useGetUsersQuery = (
  params: { page?: number; limit?: number } = {},
  options?: { skip?: boolean }
) => {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;

  const query = useQuery({
    queryKey: ADMIN_USERS_QUERY_KEY(page, limit),
    queryFn: () => apiClient<any>(`/admin/users?page=${page}&limit=${limit}`),
    enabled: options?.skip !== true,
  });

  return {
    ...query,
    isLoading: query.isLoading || query.isFetching,
  };
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body: { email: string }) =>
      apiClient<any>("/admin/users", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
  const trigger = (args: { email: string }) => mutation.mutateAsync(args);
  return [trigger, { ...mutation, isLoading: mutation.isPending }] as const;
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) =>
      apiClient<any>(`/admin/users/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
  const trigger = (id: string) => mutation.mutateAsync(id);
  return [trigger, { ...mutation, isLoading: mutation.isPending }] as const;
};

export const useGetAdminStatsQuery = (arg?: any, options?: { skip?: boolean }) => {
  const query = useQuery({
    queryKey: ADMIN_STATS_QUERY_KEY,
    queryFn: () => apiClient<any>("/admin/stats"),
    enabled: options?.skip !== true,
  });

  return {
    ...query,
    isLoading: query.isLoading || query.isFetching,
  };
};
