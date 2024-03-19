import { getCurrentUser, logout } from "../../services";
import { removeUserData, setUserData } from "../slices/userSlice";

export const getUserThunk = (token) => {
  return async function (dispatch) {
    const user = await getCurrentUser(token);

    dispatch(setUserData(user.result));
  };
};

export const logoutThunk = () => {
  return async function (dispatch) {
    await logout();

    dispatch(removeUserData(null));
  };
};
