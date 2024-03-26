import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CourseForm } from "../CourseForm";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ courseId: 123 }),
}));

describe("CourseForm", () => {
  const mockStore = configureStore();

  it("adds an author to the course authors list when 'Add author' button is clicked", async () => {
    const dispatch = jest.fn();
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(dispatch);

    const mockCreateAuthorThunk = jest.spyOn(
      require("../../../store/thunks/authorsThunk"),
      "createAuthorThunk"
    );

    render(
      <Provider store={mockStore({})}>
        <Router>
          <CourseForm />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId("createAuthorInput")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("createAuthorInput"), {
      target: { value: "New Author" },
    });

    fireEvent.click(screen.getByTestId("createAuthorButton"));

    expect(mockCreateAuthorThunk).toHaveBeenCalledWith({ name: "New Author" });
  });

  it("should render authors lists (all and course authors)", async () => {
    const authorList = [
      { id: "1", name: "Author 1" },
      { id: "2", name: "Author 2" },
      { id: "3", name: "Author 3" },
    ];
    const courseId = "123";

    const coursesList = [
      {
        id: courseId,
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

    jest
      .spyOn(require("react-redux"), "useSelector")
      .mockImplementation((selector) => {
        switch (selector) {
          case "getAuthorsSelector":
            return authorList;
          case "getCoursesSelector":
            return coursesList; // Return coursesList here
          case "getUserRoleSelector":
            return "admin";
          default:
            return null;
        }
      });

    const store = mockStore({});

    render(
      <Provider store={store}>
        <Router>
          <CourseForm />
        </Router>
      </Provider>
    );

    authorList.forEach((author) => {
      waitFor(() => {
        expect(screen.getByText(author.name)).toBeInTheDocument();
      });
    });

    // Extract currentCourseAuthorList based on the courseId
    const currentCourse = coursesList.find((course) => course.id === courseId);
    const currentCourseAuthorList = currentCourse ? currentCourse.authors : [];

    currentCourseAuthorList.forEach((courseAuthor) => {
      waitFor(() => {
        expect(screen.getByText(courseAuthor.name)).toBeInTheDocument();
      });
    });
  });
});
