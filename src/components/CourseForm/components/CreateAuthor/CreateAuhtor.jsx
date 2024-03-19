import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button, Input } from "../../../../common";
import { useDispatch } from "react-redux";
import { createAuthorThunk } from "../../../../store/thunks/authorsThunk";

export const CreateAuthor = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    event.preventDefault();
    setInputValue(event.target.value);
  }

  function handleCreateAuthor(event) {
    event.preventDefault();
    if (inputValue.length > 2) {
      dispatch(createAuthorThunk({ name: inputValue }));
    }
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
        handleClick={(event) => handleCreateAuthor(event)}
        data-testid="createAuthorButton"
      />
    </div>
  );
};
