import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../config";
const NEW_URL = `http://localhost:5000/`
const SUPER_NEW_URL = `https://testend2.site/`
const LAST_URL = `https://backend.fsv.by/`

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${LAST_URL}`, // Базовый URL без дополнительных путей
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
  tagTypes: ["File"],
  endpoints: (builder) => ({
    // Загрузка файла
    uploadFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("requisites", file); // Используем "requisites" как в upload.js
        
        return {
          url: "/upload", // POST /upload
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["File"],
    }),

    // Получение списка всех файлов
    getFilesList: builder.query({
      query: () => "/upload", // GET /upload
      transformResponse: (response) => {
        // Преобразуем ответ в нужный формат
        return response.files.map(file => ({
          filename: file.name,
          originalName: file.originalName,
          size: file.size,
          uploadedAt: file.createdAt,
          downloadUrl: `/upload/download/${file.name}`
        }));
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ filename }) => ({ type: "File", filename })), "File"]
          : ["File"],
    }),

    // Скачивание файла
    downloadFile: builder.mutation({
      query: (filename) => ({
        url: `/upload/download/${filename}`, // GET /upload/download/filename
        method: "GET",
        responseHandler: async (response) => {
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Download failed');
          }
          
          const blob = await response.blob();
          
          // Получаем оригинальное имя файла из заголовков
          const contentDisposition = response.headers.get('content-disposition');
          let downloadFilename = filename;
          
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (filenameMatch) {
              downloadFilename = filenameMatch[1];
            }
          }
          
          // Создаем временную ссылку для скачивания
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = downloadFilename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          
          return { success: true, filename: downloadFilename };
        },
        cache: "no-cache",
      }),
    }),

    // Удаление файла
    deleteFile: builder.mutation({
      query: (filename) => ({
        url: `/upload/${filename}`, // DELETE /upload/filename
        method: "DELETE",
      }),
      invalidatesTags: (result, error, filename) => [{ type: "File", filename }],
    }),

    // Массовое удаление файлов (реализуем через цикл)
    deleteFiles: builder.mutation({
      queryFn: async (filenames, api, extraOptions, baseQuery) => {
        const results = [];
        for (const filename of filenames) {
          try {
            const result = await baseQuery({
              url: `/upload/${filename}`,
              method: 'DELETE',
            });
            results.push({ filename, success: !result.error, result });
          } catch (error) {
            results.push({ filename, success: false, error });
          }
        }
        return { data: results };
      },
      invalidatesTags: ["File"],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetFilesListQuery,
  useDownloadFileMutation,
  useDeleteFileMutation,
  useDeleteFilesMutation,
} = filesApi;

// Хук для удобной работы с файлами
export const useFileOperations = () => {
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();
  const [downloadFile, { isLoading: isDownloading }] = useDownloadFileMutation();

  const handleUpload = async (file) => {
    try {
      const result = await uploadFile(file).unwrap();
      return result;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  };

  const handleDownload = async (filename) => {
    try {
      await downloadFile(filename).unwrap();
    } catch (error) {
      console.error('File download failed:', error);
      throw error;
    }
  };

  const handleDelete = async (filename) => {
    try {
      const result = await deleteFile(filename).unwrap();
      return result;
    } catch (error) {
      console.error('File deletion failed:', error);
      throw error;
    }
  };

  return {
    uploadFile: handleUpload,
    deleteFile: handleDelete,
    downloadFile: handleDownload,
    isUploading,
    isDeleting,
    isDownloading,
  };
};