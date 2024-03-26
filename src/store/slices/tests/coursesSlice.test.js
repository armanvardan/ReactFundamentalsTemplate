import coursesReducer, {
  setCourses,
  saveCourse,
  deleteCourse,
  updateCourse,
} from "../coursesSlice";

describe("coursesReducer", () => {
  const initialState = {
    value: [],
  };

  it("should handle initial state", () => {
    expect(coursesReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle setCourses", () => {
    const courses = [
      { id: 1, title: "Course 1" },
      { id: 2, title: "Course 2" },
    ];
    const newState = coursesReducer(initialState, setCourses(courses));
    expect(newState).toEqual({
      value: courses,
    });
  });

  it("should handle saveCourse", () => {
    const course = { id: 3, title: "Course 3" };
    const newState = coursesReducer(initialState, saveCourse(course));
    expect(newState).toEqual({
      value: [course],
    });
  });

  it("should handle deleteCourse", () => {
    const initialStateWithCourses = {
      value: [
        { id: 1, title: "Course 1" },
        { id: 2, title: "Course 2" },
        { id: 3, title: "Course 3" },
      ],
    };
    const newState = coursesReducer(initialStateWithCourses, deleteCourse(2));
    expect(newState).toEqual({
      value: [
        { id: 1, title: "Course 1" },
        { id: 3, title: "Course 3" },
      ],
    });
  });

  it("should handle updateCourse", () => {
    const initialStateWithCourses = {
      value: [
        { id: 1, title: "Course 1" },
        { id: 2, title: "Course 2" },
        { id: 3, title: "Course 3" },
      ],
    };
    const updatedCourse = { id: 2, title: "Updated Course 2" };
    const newState = coursesReducer(
      initialStateWithCourses,
      updateCourse(updatedCourse)
    );
    expect(newState).toEqual({
      value: [
        { id: 1, title: "Course 1" },
        { id: 2, title: "Updated Course 2" },
        { id: 3, title: "Course 3" },
      ],
    });
  });
});
