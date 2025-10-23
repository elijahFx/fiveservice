import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../config";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}`,
    prepareHeaders: (headers) => {
      const userInfo = localStorage.getItem("userASY");
      const userInfoJSON = JSON.parse(userInfo);

      const token = userInfoJSON?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"], // Добавляем тег для автоматического обновления данных
  endpoints: (builder) => ({
    // Аутентификация
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"], // При логине обновляем данные пользователя
    }),

    // Получение текущего пользователя
    getCurrentUser: builder.query({
      query: () => "/auth/me",
      providesTags: ["User"], // Указываем, что запрос связан с тегом 'User'
    }),

    // В userApi.js замените uploadAvatar на это:
    uploadAvatar: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("avatar", file);

        return {
          url: "/auth/avatar",
          method: "POST",
          body: formData,
          // Не нужно headers: {'Content-Type'}, FormData сам установит правильный заголовок
        };
      },
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    deleteAvatar: builder.mutation({
      query: () => ({
        url: "/users/avatar",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getUsersStatistics: builder.query({
      query: (id) => `users/${id}/statistics`,
      providesTags: ["User"], // также указываем тег, если нужно обновление
    }),

    getAllUsers: builder.query({
      query: () => "/auth/all",
      providesTags: ["User"],
    }),

    editUserLikeAdmin: builder.mutation({
      query: (userData) => ({
        url: `/auth/adm`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useUploadAvatarMutation,
  useUpdateUserMutation,
  useDeleteAvatarMutation,
  useGetUsersStatisticsQuery,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useEditUserLikeAdminMutation,
} = userApi;
