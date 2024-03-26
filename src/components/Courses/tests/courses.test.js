import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Courses } from "../Courses";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("Courses", () => {
  const mockStore = configureStore();
  let store;
  let authorList = [];
  let coursesList = [];

  beforeAll(() => {
    authorList = [
      { id: "1", name: "Author 1" },
      { id: "2", name: "Author 2" },
      { id: "3", name: "Author 3" },
    ];

    coursesList = [
      {
        id: "123",
        authors: [
          { id: "2", name: "Author 2" },
          { id: "3", name: "Author 3" },
        ],
        creationDate: "26/03/2024",
        description: "course descriptioon",
        duration: 10,
        title: "course duration",
      },
      {
        id: "456",
        authors: [
          { id: "1", name: "Author 1" },
          { id: "3", name: "Author 3" },
        ],
        creationDate: "26/03/2024",
        description: "course descriptioon",
        duration: 10,
        title: "course duration",
      },
    ];

    store = mockStore({
      courses: {
        coursesList: coursesList,
        authorList: authorList,
      },
    });
  });

  it("Courses should display amount of CourseCard equal length of courses array.", async () => {
    const dispatch = jest.fn();
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router>
          <Courses />
        </Router>
      </Provider>
    );

    waitFor(() => {
      expect(screen.getAllByTestId("courseCard")).toHaveLength(
        coursesList.length
      );
    });
  });

  it("CourseForm should be shown after a click on the 'Add new course' button.", async () => {
    const dispatch = jest.fn();
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(dispatch);
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue("admin");

    render(
      <Provider store={store}>
        <Router>
          <Courses />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText("ADD NEW COURSE"));

    waitFor(() => {
      expect(
        screen.getByText("Course edit or Create page")
      ).toBeInTheDocument();
    });
  });
});
