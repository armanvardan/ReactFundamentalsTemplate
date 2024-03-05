// Module 1.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#create-input-component

import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";

export const Input = ({
  placeholderText,
  labelText,
  onChange,
  "data-testid": dataTestId,
  isValid,
}) => {
  const [isInvalid, setIsInvalid] = useState(isValid);
  useEffect(() => {
    setIsInvalid(isValid);
  }, [isValid]);

  return (
    <>
      <label className={styles.label}>
        {labelText}
        <input
          onChange={onChange}
          placeholder={placeholderText}
          className={
            isInvalid
              ? `${styles.input}`
              : `${styles.input} ${styles.inputInvalid}`
          }
          data-testid={dataTestId}
        />
        {!isInvalid && (
          <span className={styles.invalid}>{labelText} is required</span>
        )}
      </label>
    </>
  );
};
