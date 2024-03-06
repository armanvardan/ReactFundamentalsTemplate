// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-219&mode=design&t=0FIG0iRzKcD0s16M-0
// * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-257&mode=design&t=0FIG0iRzKcD0s16M-0
// * render this component by route '/registration'
// * submit form data and make POST API request '/registration'.
// * after successful registration navigates to '/login' route.
// * component should have a link to the Login page (see design)
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#registration-new-component

import React, { useState } from "react";

import styles from "./styles.module.css";
import { Button, Input } from "../../common";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../services";

export const Registration = () => {
  // write your code here
  const [hasReqError] = useState("");
  const navigate = useNavigate();
  const [allForms, setAllForms] = useState([
    {
      name: "Name",
      isValid: true,
      value: "",
    },
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
        name: allForms[0].value,
        email: allForms[1].value,
        password: allForms[2].value,
      };
      await createUser(data);
      navigate("../login", { replace: true });
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
      <h1>Registration</h1>
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
          <Button buttonText={"Registration"} />
        </form>
        <p className={hasReqError ? `${styles.inputInvalid}` : ``}>
          {hasReqError}
        </p>
        <p>
          If you have an account you may&nbsp; <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
