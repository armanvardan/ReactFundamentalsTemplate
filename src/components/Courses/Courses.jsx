import React, { useEffect } from "react";

import styles from "./styles.module.css";
import { CourseCard } from "./components";
import { Button } from "../../common";
import { EmptyCourseList } from "./components/EmptyCourseList/EmptyCourseList";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthorsSelector,
  getCoursesSelector,
  getUserRoleSelector,
  getUserTokenSelector,
} from "../../store/selectors";
import { getUserThunk } from "../../store/thunks/userThunk";

// Module 1:
// * render list of components using 'CourseCard' component for each course
// * render 'ADD NEW COURSE' button (reuse Button component)
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#courses-component
// * render EmptyCourseList component when no courses
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#emptycourselist-component

// Module 2:
// * render this component by route '/courses'
// * navigate to this component if 'localStorage' contains user's token
// * navigate to the route courses/add by clicking Add New Course button.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#courses

// Module 3:
// * stop using mocked courses and authors data
// * delete props 'coursesList' and 'authorsList'
// * use useSelector to get courses and authors from the store. Use selectors...
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#courses-component

// Module 4:
// navigate to '/courses/add' route by clicking 'ADD NEW COURSE' button in the 'EmptyCourseList'.
// show message 'You don't have permissions to create a course. Please log in as ADMIN' by clicking ADD NEW COURSE button in the 'EmptyCourseList'.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#emptycourselist-component

// Module 5:
// * proposed cases for unit tests:
//   ** Courses should display amount of CourseCard equal length of courses array.
//   ** CourseForm should be shown after a click on the "Add new course" button.

export const Courses = () => {
  const dispatch = useDispatch();
  const coursesList = useSelector(getCoursesSelector);
  const authorsList = useSelector(getAuthorsSelector);
  const token = useSelector(getUserTokenSelector);
  const userRole = useSelector(getUserRoleSelector);

  const authorMap = new Map(
    authorsList.map((author) => [author.id, author.name])
  );

  // Replace author IDs with names in coursesList
  const updatedCoursesList = coursesList.map((course) => ({
    ...course,
    authors: course.authors.map((authorId) => authorMap.get(authorId)),
  }));

  useEffect(() => {
    dispatch(getUserThunk(token));
  }, [dispatch, token]);

  return (
    <>
      {updatedCoursesList?.length > 0 && userRole === "admin" && (
        <div className={styles.panel}>
          <Link to="/courses/add">
            <Button buttonText={"ADD NEW COURSE"} />
          </Link>
        </div>
      )}
      {updatedCoursesList?.length > 0 ? (
        updatedCoursesList.map((courseItem) => (
          <CourseCard course={courseItem} key={courseItem.id} />
        ))
      ) : (
        <EmptyCourseList
          title={"Your List Is Empty"}
          description={
            "Please use 'Add New Course' button to add your first course"
          }
          buttonText={"ADD NEW COURSE"}
          data-testid="emptyContainer"
        />
      )}
    </>
  );
};
