// api/telegramApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../config";

export const telegramApi = createApi({
  reducerPath: "telegramApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}telegram`,
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
  tagTypes: ["TelegramChats"],
  endpoints: (builder) => ({
    // Получение всех chat IDs
    getChatIds: builder.query({
      query: () => "/chat-ids",
      providesTags: ["TelegramChats"],
    }),

    // Добавление нового chat ID
    addChatId: builder.mutation({
      query: (chatId) => ({
        url: "/chat-ids",
        method: "POST",
        body: { chatId },
      }),
      invalidatesTags: ["TelegramChats"],
    }),

    // Удаление chat ID
    deleteChatId: builder.mutation({
      query: (chatId) => ({
        url: "/chat-ids",
        method: "DELETE",
        body: { chatId },
      }),
      invalidatesTags: ["TelegramChats"],
    }),

    // Обновление всех chat IDs
    updateChatIds: builder.mutation({
      query: (chatIds) => ({
        url: "/chat-ids",
        method: "PUT",
        body: { chatIds },
      }),
      invalidatesTags: ["TelegramChats"],
    }),

    // Отправка тестового уведомления
    sendTestNotification: builder.mutation({
      query: (message) => ({
        url: "/test-notification",
        method: "POST",
        body: { message },
      }),
    }),
  }),
});

export const {
  useGetChatIdsQuery,
  useAddChatIdMutation,
  useDeleteChatIdMutation,
  useUpdateChatIdsMutation,
  useSendTestNotificationMutation,
} = telegramApi;