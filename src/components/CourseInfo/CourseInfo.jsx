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

import React, { useEffect } from "react";

import { formatCreationDate, getCourseDuration } from "../../helpers";

import styles from "./styles.module.css";
import { Button } from "../../common";

// props description
// * 'coursesList' - list of all courses. You need it to get chosen course from the list
// * 'authorsList' - list of all authors. You need it to get authors' names for chosen course
// * 'showCourseId' - id of chosen course. Use it to find needed course on the 'coursesList'.
export const CourseInfo = ({
  coursesList,
  authorsList,
  onBack,
  showCourseId,
}) => {
  // write your code here

  const [selectedCourse, setSelectedCours] = React.useState();
  const [courseAuthors, setAuthors] = React.useState();

  useEffect(() => {
    const course = coursesList.find((course) => course.id === showCourseId);
    setSelectedCours(course);

    const authors = course.authors.map((courseAuthor) => {
      return authorsList.find((author) => {
        return author.id === courseAuthor;
      });
    });
    let showingAuthor;
    if (authors.length > 1) {
      showingAuthor = authors[0].name + "...";
    } else {
      showingAuthor = authors[0].name;
    }
    setAuthors(showingAuthor);
  }, [coursesList, showCourseId, authorsList]);

  return (
    <div className={styles.container} data-testid="courseInfo">
      <h1>{selectedCourse && selectedCourse.title}</h1>
      <div className={styles.courseInfo}>
        <p className={styles.description}>
          {selectedCourse && selectedCourse.description}
        </p>
        <div>
          <p>
            <b>ID: </b>
            {selectedCourse && selectedCourse.id}
          </p>
          <p>
            <b>Duration: </b>
            {selectedCourse && getCourseDuration(selectedCourse.duration)}
          </p>
          <p>
            <b>Created: </b>
            {selectedCourse && formatCreationDate(selectedCourse.creationDate)}
          </p>
          <div>
            <b>Authors</b>
            <ul className={styles.authorsList}>
              <li>{courseAuthors}</li>
            </ul>
          </div>
        </div>
      </div>
      <Button buttonText={"BACK"} handleClick={onBack} />
      // Module 1: reuse Button component for 'onBack' functionality // Module
      2: use 'react-router-dom' 'Link' component for button 'Back' and remove
      'onBack' prop
    </div>
  );
};
