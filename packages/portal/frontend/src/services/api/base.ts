import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { API_BASE_URL } from "../../config/environment";

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers: Headers, { getState }: any) => {
      const token = (getState() as any).auth?.token;
      if (token && token !== "cookie-based") {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  });

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: true,
});

export default api;
