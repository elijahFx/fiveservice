import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  tagTypes: ["Files", "Build"],
  endpoints: (builder) => ({
    // Получение списка файлов
    getFiles: builder.query({
  query: (folder) => `/files?folder=${folder}`,
  providesTags: ["Files"],
  // Добавляем transformResponse для обработки обоих форматов
  transformResponse: (response) => {
    // Если response уже содержит items, используем его
    if (response.items) {
      return response;
    }
    // Иначе создаем items из files для обратной совместимости
    return {
      ...response,
      items: response.files || []
    };
  }
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
  }),
});

export const {
  useGetFilesQuery,
  useGetFileContentQuery,
  useSaveFileMutation,
  useCreateFileMutation,
  useBuildProjectMutation,
  useStartServerMutation,
  useBuildAndStartMutation,
  useGetBuildStatusQuery,
  useInstallDependenciesMutation,
  useInstallPackageMutation,
  useUninstallPackageMutation,
  useHealthCheckQuery,
} = adminApi;
