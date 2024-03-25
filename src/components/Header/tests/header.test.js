import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("Header", () => {
  const mockStore = configureStore();

  it("Header should have logo and user's name", () => {
    const store = mockStore({
      userRole: "admin",
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const logoTest = screen.getByAltText("logo");
    expect(logoTest).toBeInTheDocument();
  });
});
