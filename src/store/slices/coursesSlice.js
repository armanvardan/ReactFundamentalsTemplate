import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.value = action.payload;
    },
    saveCourse: (state, action) => {
      state.value.push(action.payload);
    },
    deleteCourse: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },
    updateCourse: (state, action) => {
      let index = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value[index] = action.payload;
    },
  },
});

// use these actions in your components / thunks
export const { setCourses, saveCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;

export default coursesSlice.reducer;
