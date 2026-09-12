import { useMutation } from "@tanstack/react-query";
import apiClient from "./client";

export const useSendTokenMutation = () => {
  const mutation = useMutation({
    mutationFn: (body: { email: string }) =>
      apiClient<{ message?: string }>("/auth/send-token", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
  const trigger = (args: { email: string }) => mutation.mutateAsync(args);
  return [trigger, { ...mutation, isLoading: mutation.isPending }] as const;
};

export const useVerifyTokenMutation = () => {
  const mutation = useMutation({
    mutationFn: (body: { email: string; code: string }) =>
      apiClient<{ token?: string; user?: any }>("/auth/verify-token", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
  const trigger = (args: { email: string; code: string }) => mutation.mutateAsync(args);
  return [trigger, { ...mutation, isLoading: mutation.isPending }] as const;
};

export const useGoogleLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: (body: { idToken: string }) =>
      apiClient<{ token?: string; user?: any }>("/auth/google", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
  const trigger = (args: { idToken: string }) => mutation.mutateAsync(args);
  return [trigger, { ...mutation, isLoading: mutation.isPending }] as const;
};

export const useExchangeMutation = () => {
  const mutation = useMutation({
    mutationFn: (body: { userId: string }) =>
      apiClient<{ token?: string }>("/auth/exchange", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
  const trigger = (args: { userId: string }) => mutation.mutateAsync(args);
  return [trigger, { ...mutation, isLoading: mutation.isPending }] as const;
};

export const useRestoreRequestMutation = () => {
  const mutation = useMutation({
    mutationFn: (body: { email: string }) =>
      apiClient<{ message?: string }>("/auth/restore-request", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
  const trigger = (args: { email: string }) => mutation.mutateAsync(args);
  return [trigger, { ...mutation, isLoading: mutation.isPending }] as const;
};

export const useRestoreConfirmMutation = () => {
  const mutation = useMutation({
    mutationFn: (body: { email: string; code: string }) =>
      apiClient<{ message?: string }>("/auth/restore-confirm", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
  const trigger = (args: { email: string; code: string }) => mutation.mutateAsync(args);
  return [trigger, { ...mutation, isLoading: mutation.isPending }] as const;
};
