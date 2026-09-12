import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./client";
import type { PlanType, LicenseStatusType } from "../../store/slices/licenseSlice";

export interface LicenseStatusResponse {
  plan: PlanType;
  status: LicenseStatusType;
  expiresAt: string | null;
  trialEndsAt: string | null;
}

export interface CheckoutResponse {
  url: string;
}

export const LICENSE_STATUS_QUERY_KEY = (email: string, claimToken?: string) => [
  "license",
  "status",
  email,
  claimToken,
];

export const useGetLicenseStatusQuery = (
  { email, claimToken }: { email: string; claimToken?: string },
  options?: { skip?: boolean }
) => {
  const query = useQuery({
    queryKey: LICENSE_STATUS_QUERY_KEY(email, claimToken),
    queryFn: () => {
      const params = new URLSearchParams();
      if (email) params.append("email", email);
      if (claimToken) params.append("claimToken", claimToken);
      const queryStr = params.toString() ? `?${params.toString()}` : "";
      return apiClient<LicenseStatusResponse>(`/license/status${queryStr}`);
    },
    enabled: Boolean(email) && options?.skip !== true,
  });

  return {
    ...query,
    isLoading: query.isLoading || query.isFetching,
  };
};

export const useCreateCheckoutMutation = () => {
  const mutation = useMutation({
    mutationFn: (body: { email?: string; plan: string }) =>
      apiClient<CheckoutResponse>("/license/checkout", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
  const trigger = (args: { email?: string; plan: string }) => mutation.mutateAsync(args);
  return [trigger, { ...mutation, isLoading: mutation.isPending }] as const;
};

export const useClaimLicenseMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body: { email: string; claimToken: string }) =>
      apiClient<LicenseStatusResponse>("/license/claim", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["license", "status", variables.email],
      });
    },
  });
  const trigger = (args: { email: string; claimToken: string }) =>
    mutation.mutateAsync(args);
  return [trigger, { ...mutation, isLoading: mutation.isPending }] as const;
};
