import React, { useEffect } from "react";

import styles from "./App.module.css";
import {
  Header,
  Courses,
  Login,
  Registration,
  CourseInfo,
  CourseForm,
} from "./components";
import { Route, Routes } from "react-router-dom";
import { mockedAuthorsList, mockedCoursesList } from "./constants";
import { getAuthors, getCourses } from "./services";
import { setCourses } from "./store/slices/coursesSlice";
import { useDispatch } from "react-redux";
import { setAuthors } from "./store/slices/authorsSlice";

// Module 1:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * add next components to the App component: Header, Courses and CourseInfo
// * pass 'mockedAuthorsList' and 'mockedCoursesList' to the Courses and CourseInfo components

// Module 2:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * wrap your App with BrowserRouter in src/index.js
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#add-the-router-to-the-app-component

// Module 3:
// * wrap your App with Redux Provider in src/index.js
// * remove 'mockedAuthorsList' and 'mockedCoursesList' constants amd import and their use throughout the project
// * get courses and authors from the server. Use courses/all and authors/all GET requests.
// * save courses and authors to the store. Use 'setCourses' and 'setAuthors' actions from appropriate slices here 'src/store/slices'
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#app-component

// Module 4:
// * rewrite old GET requests /courses/all with 'getCoursesThunk' from 'src/store/thunks/coursesThunk.js' using getCourses service from 'src/services.js'.
// * rewrite old GET requests /authors/all with 'getAuthorsThunk' from 'src/store/thunks/authorsThunk.js' using getAuthors service from 'src/services.js'.
// * wrap 'CourseForm' in the 'PrivateRoute' component

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitData = async () => {
      const courses = await getCourses();
      dispatch(setCourses(courses.result));

      const authors = await getAuthors();
      dispatch(setAuthors(authors.result));
    };

    fetchInitData();
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/courses" element={<Courses />} />
          <Route
            path="/courses/:courseId"
            element={
              <CourseInfo
                coursesList={mockedCoursesList}
                authorsList={mockedAuthorsList}
              />
            }
          />
          <Route
            path="/courses/add"
            element={<CourseForm authorsList={mockedAuthorsList} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
