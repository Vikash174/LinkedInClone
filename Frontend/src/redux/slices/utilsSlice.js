import { createSlice } from "@reduxjs/toolkit";

export const utilsSlice = createSlice({
  name: "articles",
  initialState: {
    searchTerm: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = utilsSlice.actions;
export default utilsSlice.reducer;
