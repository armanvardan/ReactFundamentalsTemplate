import { createAuthor, getAuthors } from "../../services";
import { saveAuthor, setAuthors } from "../slices/authorsSlice";

export const createAuthorThunk = (author) => {
  return async function (dispatch) {
    const response = await createAuthor(author);

    dispatch(saveAuthor(response.result));
  };
};

export const getAuthorsThunk = () => {
  return async function (dispatch) {
    const authors = await getAuthors();

    dispatch(setAuthors(authors.result));
  };
};
