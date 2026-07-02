import { api } from "./base";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/user/profile",
    }),
    deleteAccount: builder.mutation({
      query: ({ email, code }) => ({
        url: "/user/confirm-deletion",
        method: "POST",
        body: { email, code },
      }),
    }),
    requestDeletion: builder.mutation({
      query: ({ email }) => ({
        url: "/user/request-deletion",
        method: "POST",
        body: { email },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useDeleteAccountMutation,
  useRequestDeletionMutation,
} = userApi;

export default userApi;
