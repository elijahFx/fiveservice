import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../config";
const NEW_URL = `http://localhost:5000/api/`

export const questionsApi = createApi({
  reducerPath: "questionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${NEW_URL}questions`,
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
  tagTypes: ["Question"],
  endpoints: (builder) => ({
    // Получение всех вопросов
    getAllQuestions: builder.query({
      query: () => "/",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Question", id })), "Question"]
          : ["Question"],
    }),

    // Получение избранных вопросов
    getFeaturedQuestions: builder.query({
      query: () => "/featured",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Question", id })), "Question"]
          : ["Question"],
    }),

    // Получение неотвеченных вопросов
    getUnansweredQuestions: builder.query({
      query: () => "/unanswered",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Question", id })), "Question"]
          : ["Question"],
    }),

    // Получение отвеченных вопросов
    getAnsweredQuestions: builder.query({
      query: () => "/answered",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Question", id })), "Question"]
          : ["Question"],
    }),

    // Поиск вопросов
    searchQuestions: builder.query({
      query: (query) => `/search?query=${encodeURIComponent(query)}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Question", id })), "Question"]
          : ["Question"],
    }),

    // Получение вопросов по автору
    getQuestionsByAuthor: builder.query({
      query: (author) => `/author/${encodeURIComponent(author)}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Question", id })), "Question"]
          : ["Question"],
    }),

    // Получение конкретного вопроса по ID
    getQuestionById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Question", id }],
    }),

    // Создание нового вопроса
    createQuestion: builder.mutation({
      query: (questionData) => ({
        url: "/",
        method: "POST",
        body: questionData,
      }),
      invalidatesTags: ["Question"],
    }),

    // Ответ на вопрос
    answerQuestion: builder.mutation({
      query: ({ id, answer }) => ({
        url: `/${id}/answer`,
        method: "PUT",
        body: { answer },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Question", id }],
    }),

    // Изменение избранного статуса
    toggleFeatured: builder.mutation({
      query: ({ id, isFeatured }) => ({
        url: `/${id}/featured`,
        method: "PUT",
        body: { isFeatured },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Question", id }],
    }),

    // Редактирование вопроса
    updateQuestion: builder.mutation({
      query: ({ id, ...questionData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: questionData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Question", id }],
    }),

    // Удаление вопроса
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Question", id }],
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
  useGetFeaturedQuestionsQuery,
  useGetUnansweredQuestionsQuery,
  useGetAnsweredQuestionsQuery,
  useSearchQuestionsQuery,
  useGetQuestionsByAuthorQuery,
  useGetQuestionByIdQuery,
  useCreateQuestionMutation,
  useAnswerQuestionMutation,
  useToggleFeaturedMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionsApi;