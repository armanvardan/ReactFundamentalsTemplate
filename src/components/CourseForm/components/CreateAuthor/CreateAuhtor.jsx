import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button, Input } from "../../../../common";

export const CreateAuthor = ({ onCreateAuthor }) => {
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    event.preventDefault();
    setInputValue(event.target.value);
  }

  return (
    <div className={styles.newAuthorContainer}>
      <h2>Add author</h2>
      <Input
        labelText={"Author Name"}
        placeholderText={"Input text"}
        isValid={true}
        data-testid="createAuthorInput"
        onChange={(event) => handleChange(event)}
      />
      <Button
        buttonText={"Create Author"}
        handleClick={(event) => onCreateAuthor(event, inputValue)}
        data-testid="createAuthorButton"
      />
    </div>
  );
};
