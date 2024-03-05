import styles from "./styles.module.css";
import { Button } from "../../../../common";

export const AuthorItem = ({ author, handleButtonClick }) => {
  return (
    <div className={styles.authorItem} data-testid="authorItem">
      <span>{author.name}</span>
      <Button
        buttonText={"Add author"}
        data-testid="addAuthor"
        handleClick={(event) => handleButtonClick(event, author.name)}
      />
    </div>
  );
};
