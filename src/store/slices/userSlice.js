import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state = {
        isAuth: true,
        name: action.payload.name,
        email: action.payload.email,
        token: localStorage.getItem("token"),
      };
      console.log("arman state = ", state);
    },
    removeUserData: (state, action) => {
      console.log("arman state DELETE isAuth = ", state.isAuth);
      state = {
        isAuth: false,
        name: "",
        email: "",
        token: "",
      };
    },
  },
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
