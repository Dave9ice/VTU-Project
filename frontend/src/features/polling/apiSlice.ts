import { url } from "@/utils/links";
import type { User } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // query profile
    getUserProfile: builder.query<{ user: User }, void>({
      query: () => ({ url: "/auth/user-profile" }),
      providesTags: ["User"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Keep LocalStorage in sync whenever profile is fetched
          localStorage.setItem("user", JSON.stringify(data.user));
        } catch (err) {}
      },
    }),
    getTransactionStatus: builder.query({
      query: (trx_ref) => ({ url: "/transaction/status", params: { trx_ref } }),
    }),
  }),
});

export const { useGetTransactionStatusQuery, useGetUserProfileQuery } =
  transactionApi;
