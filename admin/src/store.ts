import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/userApi";
import { claimsApi } from "./apis/claimsApi";
import { articlesApi } from "./apis/articlesApi";
import { filesApi } from "./apis/filesApi";
import { questionsApi } from "./apis/questionsApi";
import { adminApi } from "./apis/adminsApi";
import authReducer from "./slices/authSlice";
import { telegramApi } from "./apis/telegramApi";



export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [claimsApi.reducerPath]: claimsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [telegramApi.reducerPath]: telegramApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(claimsApi.middleware)
      .concat(articlesApi.middleware)
      .concat(filesApi.middleware)
      .concat(questionsApi.middleware)
      .concat(adminApi.middleware)
      .concat(telegramApi.middleware)
});

setupListeners(store.dispatch);