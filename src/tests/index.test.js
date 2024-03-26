import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store";
import App from "../App";

describe("Index", () => {
  it("renders the application", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const textElement = getByText("LOGIN");
    expect(textElement).toBeInTheDocument();
  });
});
