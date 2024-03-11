import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    setAuthors: (state, action) => {
      state.value = action.payload;
    },
    saveAuthor: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

// use these actions in your components / thunks
export const { setAuthors, saveAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
