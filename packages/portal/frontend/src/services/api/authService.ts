import { api } from "./base";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendToken: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/send-token",
        method: "POST",
        body: { email },
      }),
    }),
    verifyToken: builder.mutation({
      query: ({ email, code }) => ({
        url: "/auth/verify-token",
        method: "POST",
        body: { email, code },
      }),
    }),
    googleLogin: builder.mutation({
      query: ({ idToken }) => ({
        url: "/auth/google",
        method: "POST",
        body: { idToken },
      }),
    }),
    exchange: builder.mutation({
      query: ({ userId }) => ({
        url: "/auth/exchange",
        method: "POST",
        body: { userId },
      }),
    }),
    restoreRequest: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/restore-request",
        method: "POST",
        body: { email },
      }),
    }),
    restoreConfirm: builder.mutation({
      query: ({ email, code }) => ({
        url: "/auth/restore-confirm",
        method: "POST",
        body: { email, code },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSendTokenMutation,
  useVerifyTokenMutation,
  useGoogleLoginMutation,
  useExchangeMutation,
  useRestoreRequestMutation,
  useRestoreConfirmMutation,
} = authApi;

export default authApi;
