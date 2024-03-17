// export const createAuthorThunk = () => {};

import { getAuthors } from "../../services";
import { setAuthors } from "../slices/authorsSlice";

export const getAuthorsThunk = () => {
  return async function (dispatch) {
    const authors = await getAuthors();

    dispatch(setAuthors(authors));
  };
};
