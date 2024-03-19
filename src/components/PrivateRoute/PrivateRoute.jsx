// Module 1, 2, 3. You don't need to do anything with this component (we had to comment this component for tests)

// Module 4.
// * uncomment this component (ctrl + a => ctrl + /)
// * find example https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/private-routes
// * use 'PrivateRoute' to navigate to the routes:
//   ** '/courses/add';
//   ** '/courses/update/:courseId'.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#private-route-new-component

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserRoleSelector } from "../../store/selectors";

export const PrivateRoute = ({ children }) => {
  const userRole = useSelector(getUserRoleSelector);
  const auth = userRole === "admin";

  return auth ? children : <Navigate to="/courses" />;
};
