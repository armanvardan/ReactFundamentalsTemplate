// This component shows information about the current chosen course.

// Module 1.
// * Use template to show course's information:
// ** ID of course;
// ** Title;
// ** Description;
// ** Duration;
// ** List of authors;
// ** Creation date;
// * use <Button /> component to replace CourseInfo component with Courses component
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#course-info

// Module 2.
// * render component by route '/courses/:courseId'
// * use 'useParam' hook to get course id, remove prop 'showCourseId'
// * remove 'onBack' prop
// * use '<Link />' instead <Button /> component for 'BACK' button
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#course-info

// Module 3.
// * remove props 'coursesList', 'authorsList'
// * use selectors from store/selectors.js to get coursesList, authorsList from store

import React, { useEffect, useState } from "react";

import { formatCreationDate, getCourseDuration } from "../../helpers";

import styles from "./styles.module.css";
import { Button } from "../../common";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthorsSelector, getCoursesSelector } from "../../store/selectors";

export const CourseInfo = () => {
  let { courseId } = useParams();
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCours] = useState();
  const [courseAuthors, setAuthors] = useState();

  const coursesList = useSelector(getCoursesSelector);
  const authorsList = useSelector(getAuthorsSelector);

  useEffect(() => {
    const course = coursesList?.find((course) => course.id === courseId);
    setSelectedCours(course);

    const authors = course.authors.map((courseAuthor) => {
      return authorsList?.find((author) => {
        return author.id === courseAuthor;
      });
    });
    let showingAuthor;
    if (authors?.length > 1) {
      showingAuthor = authors[0].name + "...";
    } else {
      showingAuthor = authors[0].name;
    }
    setAuthors(showingAuthor);
  }, [authorsList, courseId, coursesList, navigate]);

  return (
    <div className={styles.container} data-testid="courseInfo">
      <h1>{selectedCourse?.title}</h1>
      <div className={styles.courseInfo}>
        <p className={styles.description}>{selectedCourse?.description}</p>
        <div>
          <p>
            <b>ID: </b>
            {selectedCourse?.id}
          </p>
          <p>
            <b>Duration: </b>
            {getCourseDuration(selectedCourse?.duration)}
          </p>
          <p>
            <b>Created: </b>
            {formatCreationDate(selectedCourse?.creationDate)}
          </p>
          <div>
            <b>Authors</b>
            <ul className={styles.authorsList}>
              <li>{courseAuthors}</li>
            </ul>
          </div>
        </div>
      </div>
      <Link to="/courses">
        <Button buttonText={"BACK"} />
      </Link>
    </div>
  );
};
