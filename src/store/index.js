import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import coursesSlice from "./slices/coursesSlice";
import authorsSlice from "./slices/authorsSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  courses: coursesSlice,
  authors: authorsSlice,
  user: userSlice,
});

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
