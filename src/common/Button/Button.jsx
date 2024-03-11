import React from "react";

import styles from "./styles.module.css";
import { ReactComponent as DeleteIcon } from "../../assets/deleteButtonIcon.svg";
import { ReactComponent as UpdateIcon } from "../../assets/editButtonIcon.svg";

// Module 1:
// * use this component in components: Header, Courses
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#button-component

export const Button = ({
  buttonText,
  handleClick,
  "data-testid": dataTestId,
}) => (
  <button
    className={styles.button}
    onClick={handleClick}
    data-testid={dataTestId}
  >
    {buttonText === "Delete" ? (
      <DeleteIcon />
    ) : buttonText === "Update" ? (
      <UpdateIcon />
    ) : (
      buttonText
    )}
  </button>
);
