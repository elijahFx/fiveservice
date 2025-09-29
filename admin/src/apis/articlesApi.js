import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../config";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}articles`,
    prepareHeaders: (headers) => {
      const userInfo = localStorage.getItem("userASY");

      if (userInfo) {
        try {
          const userInfoJSON = JSON.parse(userInfo);
          const token = userInfoJSON?.token;

          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
        } catch (error) {
          console.error("Error parsing user info", error);
        }
      }

      return headers;
    },
  }),
  tagTypes: ["Article"],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => "/",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Article", id })), "Article"]
          : ["Article"],
    }),
    getArticlesByUser: builder.query({
      query: (user_id) => `/user/${user_id}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Article", id })), "Article"]
          : ["Article"],
    }),
    getArticlesByCategory: builder.query({
      query: (category) => `/category/${category}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Article", id })), "Article"]
          : ["Article"],
    }),
    searchArticles: builder.query({
      query: (searchQuery) => `/search?query=${encodeURIComponent(searchQuery)}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Article", id })), "Article"]
          : ["Article"],
    }),
    getSingleArticle: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Article", id }],
    }),
    addArticle: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Article"],
    }),
    editArticle: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Article", id }],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Article", id }],
    }),
    likeArticle: builder.mutation({
      query: (id) => ({
        url: `/${id}/like`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Article", id }],
    }),
    unlikeArticle: builder.mutation({
      query: (id) => ({
        url: `/${id}/unlike`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Article", id }],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticlesByUserQuery,
  useGetArticlesByCategoryQuery,
  useSearchArticlesQuery,
  useGetSingleArticleQuery,
  useAddArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} = articlesApi;