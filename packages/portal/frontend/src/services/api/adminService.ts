import { api } from "./base";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, limit = 20 } = {}) =>
        `/admin/users?page=${page}&limit=${limit}`,
    }),
    createUser: builder.mutation({
      query: ({ email }) => ({
        url: "/admin/users",
        method: "POST",
        body: { email },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
    }),
    getAdminStats: builder.query({
      query: () => "/admin/stats",
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAdminStatsQuery,
} = adminApi;

export default adminApi;
