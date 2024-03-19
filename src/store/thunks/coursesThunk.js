import {
  createCourse,
  deleteCourseService,
  getCourses,
  updateCourseService,
} from "../../services";
import {
  deleteCourse,
  saveCourse,
  setCourses,
  updateCourse,
} from "../slices/coursesSlice";

export const updateCourseThunk = (course) => {
  return async function (dispatch) {
    await updateCourseService(course);
    dispatch(updateCourse(course));
  };
};

export const deleteCourseThunk = (courseId) => {
  return async function (dispatch) {
    await deleteCourseService(courseId);
    dispatch(deleteCourse(courseId));
  };
};

export const createCourseThunk = (newCourse) => {
  return async function (dispatch) {
    await createCourse(newCourse);
    dispatch(saveCourse(newCourse));
  };
};

export const getCoursesThunk = () => {
  return async function (dispatch) {
    const courses = await getCourses();
    dispatch(setCourses(courses.result));
  };
};
