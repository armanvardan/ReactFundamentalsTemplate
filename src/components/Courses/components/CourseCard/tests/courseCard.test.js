import React from "react";
import { render, screen } from "@testing-library/react";
import { CourseCard } from "../CourseCard";
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

describe("Course Card", () => {
  const mockStore = configureStore();
  const mockCourse = {
    id: 1,
    title: "Test Title",
    description: "Test Description",
    authors: ["Author 1", "Author 2"],
    duration: "01:30 hours",
    creationDate: "2024.03.24",
  };

  it("CourseCard should display title", () => {
    const store = mockStore({
      userRole: "admin",
    });

    render(
      <Provider store={store}>
        <CourseCard course={mockCourse} />
      </Provider>
    );

    const titleTest = screen.getByTestId("title");
    expect(titleTest).toHaveTextContent("Test Title");
  });

  it("CourseCard should display description", () => {
    const store = mockStore({
      userRole: "admin",
    });

    render(
      <Provider store={store}>
        <CourseCard course={mockCourse} />
      </Provider>
    );

    const desctiptionTest = screen.getByText("Test Description");
    expect(desctiptionTest).toBeInTheDocument();
  });

  it("CourseCard should display duration in the correct format", () => {
    const store = mockStore({
      userRole: "admin",
    });

    render(
      <Provider store={store}>
        <CourseCard course={mockCourse} />
      </Provider>
    );

    const durationText = screen.getByTestId("duration");
    expect(durationText.textContent).toMatch(/\d{2}:\d{2} hours/);
  });

  it("CourseCard should display created date in the correct format", () => {
    const store = mockStore({
      userRole: "admin",
    });

    render(
      <Provider store={store}>
        <CourseCard course={mockCourse} />
      </Provider>
    );

    const dateText = screen.getByTestId("date");
    expect(dateText.textContent).toMatch(/\d{4}.\d{2}.\d{2}/);
  });

  it("CourseCard should display authors list", () => {
    const store = mockStore({
      userRole: "admin",
    });

    render(
      <Provider store={store}>
        <CourseCard course={mockCourse} />
      </Provider>
    );

    const authorsSpan = screen.getByTestId("authors");

    expect(authorsSpan).toBeInTheDocument();

    expect(authorsSpan.textContent.trim()).toBeTruthy();
  });
});
