import { url } from "@/utils/links";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/api/v1/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getTransactionStatus: builder.query({
      query: (trx_ref) => ({ url: "/transaction/status", params: { trx_ref } }),
    }),
  }),
});

export const { useGetTransactionStatusQuery } = transactionApi;
