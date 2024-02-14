import { createSlice } from "@reduxjs/toolkit";

export const articlesSlice = createSlice({
  name: "articles",
  initialState: [],
  reducers: {
    addArticles: (state, action) => {
      return action.payload;
    },
  },
});

export const { addArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
