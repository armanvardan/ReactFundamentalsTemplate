import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Login } from "../Login";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";

const mockStore = configureStore([]);

describe("Login component", () => {
  it("should redirect to registration page when link is clicked", () => {
    const store = mockStore({});

    const { container } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const registrationButton = screen.getByText("Registration");

    expect(registrationButton).toBeInTheDocument();

    fireEvent.click(registrationButton);

    expect(container.innerHTML).toMatch("/registration");
  });

  it("should redirect to '/courses' if token exists in local storage", async () => {
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue("fakeToken"),
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    const navigateMock = jest.fn();

    const store = mockStore({});

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/courses", { replace: false });
    });
  });

  it("should not redirect if token does not exist in local storage", () => {
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(null),
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    const navigateMock = jest.fn();

    const store = mockStore({});

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("should call handleChange function with correct arguments when input value changes", () => {
    const store = mockStore({});

    const { getByLabelText } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = getByLabelText("Email");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  });
});
