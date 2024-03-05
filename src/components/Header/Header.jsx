import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";
import { Logo } from "./components";
import { Button } from "../../common";
import { useLocation, useNavigate } from "react-router-dom";

// Module 1:
// * add Logo and Button components
// * add Header component to the App component
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#header

// Module 2:
// * show user's name if he is logged in.
// * navigate to the /login route after 'LOGOUT' button click
// * hide 'LOGOUT' button and user's name for Login and Registration pages
// * remove token from localStorage by LOGOUT button click.
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#header

// Module 3:
// * get user's name from the store. Use selector...
// * remove user's data from the store. Use action 'removeUserData' from the 'src/store/slices/userSlice by LOGOUT button click
// * remove token from localStorage by LOGOUT button click.
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#header

// Module 4:
// make a request to lod out on 'LOGOUT' button click
// use thunk 'logoutThunk' from 'src/store/thunks/userThunk.js' and service 'logout' from 'src/services.js'
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function

// Module 5:
// *proposed cases for unit tests:
//   ** Header should have logo and user's name.

export const Header = () => {
  // write your code here
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    setUser(currentUser);
  }, [location]);

  function btnLoginClick() {
    navigate("../login", { replace: true });
  }

  function btnLogoutClick() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("../login", { replace: true });
  }

  return (
    <div className={styles.headerContainer}>
      <Logo />
      <div className={styles.userContainer}>
        <p className={styles.userName}>{user && user.name}</p>
        {!user && <Button buttonText={"Login"} handleClick={btnLoginClick} />}
        {user && <Button buttonText={"Logout"} handleClick={btnLogoutClick} />}
      </div>
    </div>
  );
};
