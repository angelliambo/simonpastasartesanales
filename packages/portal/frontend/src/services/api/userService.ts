import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./client";

export const USER_PROFILE_QUERY_KEY = ["user", "profile"];

export const useGetProfileQuery = (arg?: any, options?: { skip?: boolean }) => {
  const query = useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: () => apiClient<any>("/user/profile"),
    enabled: options?.skip !== true,
  });

  return {
    ...query,
    isLoading: query.isLoading || query.isFetching,
  };
};

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body: { email: string; code: string }) =>
      apiClient<{ message?: string }>("/user/confirm-deletion", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });
    },
  });
  const trigger = (args: { email: string; code: string }) => {
    const promise = mutation.mutateAsync(args);
    return Object.assign(promise, { unwrap: () => promise });
  };
  return [trigger, { ...mutation, isLoading: mutation.isPending }] as const;
};

export const useRequestDeletionMutation = () => {
  const mutation = useMutation({
    mutationFn: (body: { email: string }) =>
      apiClient<{ message?: string }>("/user/request-deletion", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
  const trigger = (args: { email: string }) => {
    const promise = mutation.mutateAsync(args);
    return Object.assign(promise, { unwrap: () => promise });
  };
  return [trigger, { ...mutation, isLoading: mutation.isPending }] as const;
};
