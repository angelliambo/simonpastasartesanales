export { api } from "./base";

export * from "./authService";
export * from "./userService";
export * from "./adminService";
export * from "./licenseService";

export {
  useSendTokenMutation,
  useVerifyTokenMutation,
  useExchangeMutation,
} from "./authService";

export {
  useGetProfileQuery,
  useDeleteAccountMutation,
  useRequestDeletionMutation,
} from "./userService";

export {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAdminStatsQuery,
} from "./adminService";
