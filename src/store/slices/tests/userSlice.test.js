import userReducer, { setUserData, removeUserData } from "../userSlice";

describe("userReducer", () => {
  const initialState = {
    isAuth: false,
    name: "",
    email: "",
    token: localStorage.getItem("token"),
    role: "",
  };

  it("should handle initial state", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle setUserData", () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
    };
    const newState = userReducer(initialState, setUserData(userData));
    expect(newState).toEqual({
      isAuth: true,
      name: "John Doe",
      email: "john@example.com",
      token: localStorage.getItem("token"),
      role: "admin",
    });
  });

  it("should handle removeUserData", () => {
    const newState = userReducer(initialState, removeUserData());
    expect(newState).toEqual({
      isAuth: false,
      name: "",
      email: "",
      token: "",
      role: "",
    });
  });
});
