import authorsReducer, { setAuthors, saveAuthor } from "../authorsSlice";

describe("authorsReducer", () => {
  const initialState = {
    value: [],
  };

  it("should handle initial state", () => {
    expect(authorsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle setAuthors", () => {
    const authorsData = [
      { id: 1, name: "Author 1" },
      { id: 2, name: "Author 2" },
    ];
    const newState = authorsReducer(initialState, setAuthors(authorsData));
    expect(newState).toEqual({
      value: authorsData,
    });
  });

  it("should handle saveAuthor", () => {
    const initialStateWithAuthors = {
      value: [{ id: 1, name: "Author 1" }],
    };
    const newAuthor = { id: 2, name: "Author 2" };
    const newState = authorsReducer(
      initialStateWithAuthors,
      saveAuthor(newAuthor)
    );
    expect(newState).toEqual({
      value: [...initialStateWithAuthors.value, newAuthor],
    });
  });
});
