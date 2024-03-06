// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * add functionality to create new course with:
//   ** title
//   ** description
//   ** duration (user enters in minutes, you should map in format «hh:mm»)
//   ** existing authors (use 'authorsList' prop)
//   ** new created author (create field and button, update 'authorsList')
//   ** user should be able to remove author from the course
//   ** add validation to the fields
//   ** add new course to the 'coursesList' and navigate to the '/courses' page => new course should be in the courses list
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#add-new-course

// Module 3.
// * save new course to the store. Use action 'saveCourse' from 'src/store/slices/coursesSlice'
// * save new author to the store. Use action 'saveAuthor' from 'src/store/slices/authorsSlice'
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#add-new-course

// Module 4.
// * render this component only for ADMIN user
// * in this module you should separate functionality for this component:
//   ** create mode:
//     * form for the course creation should be opened by 'courses/add' route by 'ADD NEW COURSE' button click (as before)
//     * make a request to save new course
//     * use 'createCourse' service from 'src/services.js' and 'createCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
//     * use 'createAuthor ' service from 'src/services.js' and 'createAuthorThunk' thunk from 'src/store/thinks/authorsThunk.js'
//     * save new course to the store after success response
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#add-new-course
//   ** update mode:
//     * form should be opened by route '/courses/update/:courseId' route by 'update' button click
//     * appropriate forms field should be prefilled with course's info
//     * user should have ability to modify course information in the fields and change authors list
//     * make a request to save updated course
//     * use 'updateCourseService' from 'src/services.js' and 'updateCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
//     save updated course to the store after success response.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#update-course

// Module 5:
// * proposed cases for unit tests:
//   ** CourseForm should show authors lists (all and course authors).
//   **  CourseForm 'Create author' button click should call dispatch.
//   **  CourseForm 'Add author' button click should add an author to the course authors list.
//   **  CourseForm 'Delete author' button click should delete an author from the course list.

import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";
import { Button, Input } from "../../common";
import { AuthorItem, CreateAuthor } from "./components";
import { getCourseDuration } from "../../helpers";
import { useNavigate } from "react-router-dom";

export const CourseForm = ({ authorsList, createCourse, createAuthor }) => {
  const navigate = useNavigate();
  const [currentAuthorList, setCureentAuthorList] = useState(authorsList);
  const [formValues, setFormValues] = useState({
    title: {
      name: "title",
      isValid: true,
      value: "",
    },
    description: {
      name: "description",
      isValid: true,
      value: "",
    },
    duration: {
      duration: "duration",
      isValid: true,
      value: 0,
    },
    courseAuthors: {
      name: "courseAuthors",
      isValid: true,
      value: [],
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("../login", { replace: false });
    }
  }, [navigate]);

  function handleClickAddAuthor(event, author) {
    event.preventDefault();
    const newList = currentAuthorList.filter((item) => {
      return author.id !== item.id;
    });
    setCureentAuthorList(newList);

    const oldFormsValue = { ...formValues.courseAuthors };
    oldFormsValue.value.push(author);
    setFormValues((prevState) => {
      return {
        ...prevState,
        courseAuthors: oldFormsValue,
      };
    });
  }

  function handleClickDeleteAuthor(event, author) {
    event.preventDefault();
    const oldCourseAuthors = { ...formValues.courseAuthors };
    const newList = oldCourseAuthors.value.filter((item) => {
      return author.id !== item.id;
    });
    oldCourseAuthors.value = newList;

    setFormValues((prevState) => {
      return {
        ...prevState,
        courseAuthors: oldCourseAuthors,
      };
    });

    setCureentAuthorList([...currentAuthorList, author]);
  }

  function createAuthorButton(event, authorName) {
    event.preventDefault();
    if (authorName.length > 2) {
      const newAuthor = {
        id: Math.round(Math.random() * 1000000).toString(),
        name: authorName,
      };
      setCureentAuthorList((prevState) => [...prevState, newAuthor]);
    }
  }

  function changeDuration(event) {
    const oldDuration = { ...formValues.duration };
    oldDuration.value = event.target.value;
    setFormValues((prevState) => {
      return {
        ...prevState,
        duration: oldDuration,
      };
    });
  }

  function handleCancelBut() {
    navigate("../courses", { replace: false });
  }

  function handleCreateCourseBut(event) {
    event.preventDefault();
    let hasError = checkErrors();
    if (!hasError) {
      navigate("../courses", { replace: false });
    }
  }

  function checkErrors() {
    let hasError = false;
    let oldForms = { ...formValues };
    for (let form in oldForms) {
      const formItem = { ...oldForms[form] };
      if (formItem.name === "duration") {
        console.log("duration = ", formItem.value);
      }
      if (formItem.name !== "duration") {
        if (formItem.value.length <= 2) {
          hasError = true;
          formItem.isValid = false;
          oldForms = {
            ...oldForms,
            [form]: formItem,
          };
        }
      } else if (formItem.value <= 2) {
        hasError = true;
        formItem.isValid = false;
        oldForms = {
          ...oldForms,
          [form]: formItem,
        };
      }
    }
    setFormValues(oldForms);
    return hasError;
  }

  return (
    <div className={styles.container}>
      <h2>Course edit or Create page</h2>

      <form>
        <Input
          labelText={"Title"}
          placeholderText={"Input text"}
          data-testid="titleInput"
          isValid={formValues.title.isValid}
        />

        <label>
          Description
          <textarea
            data-testid="descriptionTextArea"
            className={
              formValues.description.isValid
                ? `${styles.description}`
                : `${styles.description} ${styles.descriptionInvalid}`
            }
          />
        </label>

        <div className={styles.infoWrapper}>
          <div>
            <div className={styles.duration}>
              <Input
                labelText={"Duration"}
                placeholderText={"Input text"}
                isValid={formValues.duration.isValid}
                data-testid="durationInput"
                onChange={changeDuration}
                isNumber={true}
              />
              {formValues.duration.value &&
                getCourseDuration(formValues.duration.value)}
            </div>

            <h2>Authors</h2>
            <CreateAuthor
              onCreateAuthor={(event, inputValue) => {
                createAuthorButton(event, inputValue);
              }}
            />

            <div className={styles.authorsContainer}>
              <h3>Authors List</h3>
              {currentAuthorList.map((author) => (
                <AuthorItem
                  key={author.id}
                  author={author}
                  handleAddClick={(event) =>
                    handleClickAddAuthor(event, author)
                  }
                />
              ))}
            </div>
          </div>

          <div className={styles.courseAuthorsContainer}>
            <h2>Course authors</h2>
            {formValues.courseAuthors.value.length === 0 ? (
              <p className={styles.notification}>List is empty</p>
            ) : (
              formValues.courseAuthors.value.map((author) => (
                <AuthorItem
                  key={author.id}
                  author={author}
                  handleDeleteClick={(event) =>
                    handleClickDeleteAuthor(event, author)
                  }
                />
              ))
            )}
          </div>
        </div>
      </form>

      <div className={styles.buttonsContainer}>
        <Button buttonText={"Cancel"} handleClick={handleCancelBut} />
        <Button
          buttonText={"Create Course"}
          handleClick={handleCreateCourseBut}
          data-testid="createCourseButton"
        />
      </div>
    </div>
  );
};
