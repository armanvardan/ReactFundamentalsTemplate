import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { PrivateRoute } from "../PrivateRoute";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockStore = configureStore([]);

describe("PrivateRoute component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders children when user has 'admin' role", () => {
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue("admin");

    const { queryByText } = render(
      <Router>
        <Provider store={mockStore({})}>
          <PrivateRoute>
            <div data-testid="child-component">Child Component</div>
          </PrivateRoute>
        </Provider>
      </Router>
    );

    expect(queryByText("Child Component")).toBeInTheDocument();
  });
});
