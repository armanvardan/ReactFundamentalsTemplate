// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2927-216&mode=design&t=0FIG0iRzKcD0s16M-0
// * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-191&mode=design&t=0FIG0iRzKcD0s16M-0
// * render this component by route '/login'
// * use login service to submit form data and make POST API request '/login'.
// * component should have a link to the Registration page (see design)
// * save token from API after success login to localStorage.
// ** PAY ATTATION ** token should be saved to localStorage inside login handler function after login service responce
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#login-new-component

// Module 3.
// * save user's name, token and email to the store after success login.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#login-component

import React, { useState } from "react";

import styles from "./styles.module.css";
import { Input, Button } from "../../common";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services";

export const Login = () => {
  // write your code here
  const [hasReqError, setHasReqError] = useState("");
  const navigate = useNavigate();
  const [allForms, setAllForms] = useState([
    {
      name: "Email",
      isValid: true,
      value: "",
    },
    {
      name: "Password",
      isValid: true,
      value: "",
    },
  ]);

  function handleChange(event, type) {
    const oldForms = [...allForms];
    const currentForm = oldForms.find((form) => form.name === type);
    currentForm.value = event.target.value;
    setAllForms(oldForms);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    let hasError = checkErrors();
    if (!hasError) {
      const data = {
        email: allForms[0].value,
        password: allForms[1].value,
      };
      const createUserResponse = await login(data);
      if (createUserResponse.successful) {
        localStorage.setItem(
          "token",
          JSON.stringify(createUserResponse.result)
        );
        localStorage.setItem("user", JSON.stringify(createUserResponse.user));
        navigate("../courses", { replace: true });
      } else {
        setHasReqError(createUserResponse.errors.join("; "));
      }
    }
  }

  function checkErrors() {
    let hasError = false;
    let oldAllForms = [...allForms];
    for (let i = 0; i < oldAllForms.length; i++) {
      if (!oldAllForms[i].value) {
        oldAllForms[i].isValid = false;
        hasError = true;
      } else {
        oldAllForms[i].isValid = true;
      }
    }
    setAllForms(oldAllForms);
    return hasError;
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {allForms.map((form) => (
            <Input
              key={form.name}
              labelText={form.name}
              placeholderText={form.name}
              onChange={(event) => handleChange(event, form.name)}
              isValid={form.isValid}
            />
          ))}
          <Button buttonText={"Login"} />
        </form>
        <p className={hasReqError ? `${styles.inputInvalid}` : ``}>
          {hasReqError}
        </p>
        <p>
          If you don't have an account you can
          <Link to="/registration">Registration</Link>
        </p>
      </div>
    </div>
  );
};
