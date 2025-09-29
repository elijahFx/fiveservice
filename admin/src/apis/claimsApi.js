import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../config";

export const claimsApi = createApi({
  reducerPath: "claimsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}claims`,
    prepareHeaders: (headers) => {
      const userInfo = localStorage.getItem("userASY");
      if (userInfo) {
        try {
          const userInfoJSON = JSON.parse(userInfo);
          const token = userInfoJSON?.token;
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
        } catch (e) {
          console.error("Failed to parse user info from localStorage", e);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Claim"],
  endpoints: (builder) => ({
    // Получение всех претензий
    getAllClaims: builder.query({
      query: () => "/",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Claim", id })), "Claim"]
          : ["Claim"],
    }),

    // Получение одной претензии по ID
    getClaimById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Claim", id }],
    }),

    // Обновление претензии
    updateClaim: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Claim", id }],
    }),

    // Удаление претензии
    deleteClaims: builder.mutation({
      query: (ids) => ({
        url: `/delete`,
        method: "POST",
        body: ids
      }),
      invalidatesTags: (result, error, id) => [{ type: "Claim", id }],
    }),
  }),
});

export const {
  useGetAllClaimsQuery,
  useGetClaimByIdQuery,
  useUpdateClaimMutation,
  useDeleteClaimsMutation,
} = claimsApi;