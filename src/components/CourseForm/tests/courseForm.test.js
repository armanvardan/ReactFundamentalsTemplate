import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CourseForm } from "../CourseForm";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ courseId: 3 }),
}));

describe("CourseForm", () => {
  const mockStore = configureStore();

  it("CourseForm 'Create author' button click should call dispatch", () => {
    const store = mockStore({});
    const dispatch = jest.fn();
    store.dispatch = dispatch;

    render(
      <Provider store={store}>
        <Router>
          <CourseForm />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByTestId("createAuthorInput"), {
      target: { value: "inputValue" },
    });

    fireEvent.click(screen.getByTestId("createAuthorButton"));
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  //   it("should render authors lists (all and course authors)", () => {
  //     // Mock data for authors
  //     const firstRende = true;

  //     const authorList = [
  //       { id: 1, name: "Author 1" },
  //       { id: 2, name: "Author 2" },
  //     ];

  //     // Mock data for course authors
  //     const courseAuthorList = [
  //       { id: 3, name: "Course Author 1" },
  //       { id: 4, name: "Course Author 2" },
  //     ];

  //     // Mock data for currentAuthorList
  //     const currentAuthorList = [
  //       { id: 1, name: "Current Author 1" },
  //       { id: 6, name: "Current Author 2" },
  //     ];

  //     // Mock useSelector to return the mock data
  //     jest
  //       .spyOn(require("react-redux"), "useSelector")
  //       .mockImplementation((selector) => {
  //         switch (selector) {
  //           case "getAuthorsSelector":
  //             return authorList;
  //           case "getCoursesSelector":
  //             return courseAuthorList;
  //           case "getUserRoleSelector":
  //             return "admin";
  //           default:
  //             return null;
  //         }
  //       });

  //     const store = mockStore({
  //       // You can define initial state here if needed
  //     });

  //     render(
  //       <Provider store={store}>
  //         <Router>
  //           <CourseForm currentAuthorList={currentAuthorList} />
  //         </Router>
  //       </Provider>
  //     );

  //     // Check if "Authors List" and "Course authors" headings are rendered
  //     // expect(screen.getByText("Authors List")).toBeInTheDocument();
  //     // expect(screen.getByText("Course authors")).toBeInTheDocument();

  //     // // Check if all authors are rendered in the "Authors List" section
  //     // authorList.forEach((author) => {
  //     //   expect(screen.getByText(author.name)).toBeInTheDocument();
  //     // });

  //     // // Check if the "List is empty" message is displayed for course authors when the list is empty
  //     // expect(screen.getByText("List is empty")).toBeInTheDocument();

  //     // // Check if all course authors are rendered in the "Course authors" section
  //     // courseAuthorList.forEach((courseAuthor) => {
  //     //   expect(screen.getByText(courseAuthor.name)).toBeInTheDocument();
  //     // });

  //     // Check if current authors are rendered in the "Authors List" section
  //     currentAuthorList.forEach((currentAuthor) => {
  //       expect(screen.getByText(currentAuthor.name)).toBeInTheDocument();
  //     });
  //   });
});
