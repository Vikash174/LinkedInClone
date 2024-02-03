import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import articlesReducer from "../slices/articlesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    articles: articlesReducer,
  },
});
