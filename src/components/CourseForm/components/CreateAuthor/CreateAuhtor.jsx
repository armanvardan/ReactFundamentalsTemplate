import React from "react";
import styles from "./styles.module.css";
import { Button, Input } from "../../../../common";

export const CreateAuthor = ({ onCreateAuthor }) => {
  // write your code here
  return (
    <div className={styles.newAuthorContainer}>
      <h2>Add author</h2>
      <Input
        labelText={"Author Name"}
        placeholderText={"Input text"}
        isValid={true}
        data-testid="createAuthorInput"
      />
      <Button
        buttonText={"Login"}
        handleClick={onCreateAuthor}
        data-testid="createAuthorButton"
      />
    </div>
  );
};
