import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../config";

const BASE_URL = `http://localhost:5000/api/admin`;

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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
  tagTypes: ["Files", "Build", "Htaccess", "Redirects", "SEO"],
  endpoints: (builder) => ({
    // Получение списка файлов
    getFiles: builder.query({
      query: (folder = '') => `/files?folder=${encodeURIComponent(folder)}`,
      providesTags: ["Files"],
    }),

    // Получение содержимого файла
    getFileContent: builder.query({
      query: (filepath) =>
        `/file/content?filepath=${encodeURIComponent(filepath)}`,
      providesTags: (result, error, filepath) => [
        { type: "Files", id: filepath },
      ],
    }),

    // Сохранение файла
    saveFile: builder.mutation({
      query: ({ filepath, content }) => ({
        url: "/file/save",
        method: "POST",
        body: { filepath, content },
      }),
      invalidatesTags: (result, error, { filepath }) => [
        { type: "Files", id: filepath },
        "Files",
      ],
    }),

    // Создание нового файла
    createFile: builder.mutation({
      query: ({ filepath, content = "" }) => ({
        url: "/file/create",
        method: "POST",
        body: { filepath, content },
      }),
      invalidatesTags: ["Files"],
    }),

    // Создание новой папки
    createFolder: builder.mutation({
      query: (folderpath) => ({
        url: "/folder/create",
        method: "POST",
        body: { folderpath },
      }),
      invalidatesTags: ["Files"],
    }),

    // Удаление файла или папки
    deleteItem: builder.mutation({
      query: ({ itempath, type }) => ({
        url: "/item/delete",
        method: "POST",
        body: { itempath, type },
      }),
      invalidatesTags: ["Files"],
    }),

    // Сборка проекта
    buildProject: builder.mutation({
      query: () => ({
        url: "/build",
        method: "POST",
      }),
      invalidatesTags: ["Build"],
    }),

    // Запуск сервера
    startServer: builder.mutation({
      query: () => ({
        url: "/start",
        method: "POST",
      }),
      invalidatesTags: ["Build"],
    }),

    // Полная сборка и запуск
    buildAndStart: builder.mutation({
      query: () => ({
        url: "/build-and-start",
        method: "POST",
      }),
      invalidatesTags: ["Build"],
    }),

    // Получение статуса сборки
    getBuildStatus: builder.query({
      query: () => "/build/status",
      providesTags: ["Build"],
    }),

    // Установка всех зависимостей
    installDependencies: builder.mutation({
      query: () => ({
        url: "/dependencies/install",
        method: "POST",
      }),
      invalidatesTags: ["Build"],
    }),

    // Установка конкретного пакета
    installPackage: builder.mutation({
      query: (packageName) => ({
        url: "/dependencies/install-package",
        method: "POST",
        body: { packageName },
      }),
      invalidatesTags: ["Build"],
    }),

    // Удаление пакета
    uninstallPackage: builder.mutation({
      query: (packageName) => ({
        url: "/dependencies/uninstall-package",
        method: "POST",
        body: { packageName },
      }),
      invalidatesTags: ["Build"],
    }),

    // Health check
    healthCheck: builder.query({
      query: () => "/health",
    }),

    // .htaccess
    getHtaccess: builder.query({
      query: () => '/htaccess',
      providesTags: ["Htaccess"],
    }),

    saveHtaccess: builder.mutation({
      query: (content) => ({
        url: '/htaccess/save',
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: ["Htaccess"],
    }),

    // Redirects
    getRedirects: builder.query({
      query: () => '/redirects',
      providesTags: ["Redirects"],
    }),

    addRedirect: builder.mutation({
      query: ({ from, to, type = '301' }) => ({
        url: '/redirects/add',
        method: 'POST',
        body: { from, to, type },
      }),
      invalidatesTags: ["Redirects", "Htaccess"],
    }),

    deleteRedirect: builder.mutation({
      query: (index) => ({
        url: '/redirects/delete',
        method: 'POST',
        body: { index },
      }),
      invalidatesTags: ["Redirects", "Htaccess"],
    }),

    // SEO endpoints - исправленные пути
    getSeoInfo: builder.query({
      query: (folder) => `/seo/info?folder=${encodeURIComponent(folder)}`,
      providesTags: (result, error, folder) => [
        { type: "SEO", id: folder }
      ],
    }),

    saveSeoInfo: builder.mutation({
      query: ({ folder, seo }) => ({
        url: '/seo/save',
        method: 'POST',
        body: { folder, seo },
      }),
      invalidatesTags: (result, error, { folder }) => [
        { type: "SEO", id: folder }
      ],
    }),

    deleteSeoInfo: builder.mutation({
      query: (folder) => ({
        url: '/seo/delete',
        method: 'POST',
        body: { folder },
      }),
      invalidatesTags: (result, error, folder) => [
        { type: "SEO", id: folder }
      ],
    }),
  }),
});

export const {
  useGetFilesQuery,
  useGetFileContentQuery,
  useSaveFileMutation,
  useCreateFileMutation,
  useCreateFolderMutation,
  useDeleteItemMutation,
  useBuildProjectMutation,
  useStartServerMutation,
  useBuildAndStartMutation,
  useGetBuildStatusQuery,
  useInstallDependenciesMutation,
  useInstallPackageMutation,
  useUninstallPackageMutation,
  useHealthCheckQuery,
  useGetHtaccessQuery,
  useDeleteRedirectMutation,
  useAddRedirectMutation,
  useSaveHtaccessMutation,
  useGetRedirectsQuery,
  useGetSeoInfoQuery,
  useSaveSeoInfoMutation,
  useDeleteSeoInfoMutation
} = adminApi;