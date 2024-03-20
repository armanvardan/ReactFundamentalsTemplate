import styles from "./styles.module.css";
import { Button } from "../../../../common";

export const AuthorItem = ({ author, handleAddClick, handleDeleteClick }) => {
  return (
    <div className={styles.authorItem} data-testid="authorItem">
      <span>{author.name}</span>
      {handleAddClick && (
        <Button
          buttonText={"Add Author"}
          handleClick={(event) => handleAddClick(event, author.name)}
        />
      )}
      {handleDeleteClick && (
        <Button
          buttonText={"Delete Author"}
          handleClick={(event) => {
            handleDeleteClick(event, author.name);
          }}
        />
      )}
    </div>
  );
};
