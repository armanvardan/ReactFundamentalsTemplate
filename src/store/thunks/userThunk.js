import { getCurrentUser } from "../../services";

export const getUserThunk = (token) => {
  return async function (dispatch) {
    const user = await getCurrentUser(token);
    console.log("arman = ", user);

    //dispatch(setUserData(authors));
  };
};

// export const logoutThunk = () => {};
