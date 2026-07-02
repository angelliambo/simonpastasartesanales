import { api } from "./base";
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

export const licenseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLicenseStatus: builder.query<LicenseStatusResponse, { email: string; claimToken?: string }>({
      query: ({ email, claimToken }) => ({
        url: `/license/status`,
        method: "GET",
        params: { email, claimToken },
      }),
    }),
    createCheckout: builder.mutation<CheckoutResponse, { email?: string; plan: string }>({
      query: (body) => ({
        url: "/license/checkout",
        method: "POST",
        body,
      }),
    }),
    claimLicense: builder.mutation<LicenseStatusResponse, { email: string; claimToken: string }>({
      query: (body) => ({
        url: "/license/claim",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLicenseStatusQuery,
  useLazyGetLicenseStatusQuery,
  useCreateCheckoutMutation,
  useClaimLicenseMutation,
} = licenseApi;

export default licenseApi;
