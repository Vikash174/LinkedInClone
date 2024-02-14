import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import articlesReducer from "../slices/articlesSlice";
import utilsReducer from "../slices/utilsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    articles: articlesReducer,
    utils: utilsReducer,
  },
});
