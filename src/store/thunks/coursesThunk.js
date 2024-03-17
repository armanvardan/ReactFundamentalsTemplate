import { getCourses } from "../../services";
import { setCourses } from "../slices/coursesSlice";

// export const updateCourseThunk = () => {};

// export const deleteCourseThunk = () => {};

// export const createCourseThunk = () => {};

export const getCoursesThunk = () => {
  return async function (dispatch) {
    const courses = await getCourses();
    dispatch(setCourses(courses.result));
  };
};
