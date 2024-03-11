import { Link } from "react-router-dom";
import { Button } from "../../../../common";
import styles from "./styles.module.css";

export const EmptyCourseList = ({ title, description, buttonText }) => {
  return (
    <div className={styles.container}>
      <div className={styles.blockContainer}>{title}</div>
      <div className={styles.blockContainer}>{description}</div>
      <div className={styles.blockContainer}>
        <Link to="/courses/add">
          <Button
            buttonText={buttonText}
            className={styles.blockContainer}
            data-testid="addCourse"
          />
        </Link>
      </div>
    </div>
  );
};
