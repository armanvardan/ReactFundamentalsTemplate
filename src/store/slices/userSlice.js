import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token"),
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.isAuth = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = localStorage.getItem("token");
      state.role = action.payload.role;
    },
    removeUserData: (state, action) => {
      state.isAuth = false;
      state.name = "";
      state.email = "";
      state.token = "";
      state.role = "";
    },
  },
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
