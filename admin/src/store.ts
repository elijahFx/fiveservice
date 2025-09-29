import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/userApi";
import { claimsApi } from "./apis/claimsApi";
import { articlesApi } from "./apis/articlesApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [claimsApi.reducerPath]: claimsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(claimsApi.middleware)
      .concat(articlesApi.middleware)
});

setupListeners(store.dispatch);