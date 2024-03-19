import { Link } from "react-router-dom";
import { Button } from "../../../../common";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { getUserRoleSelector } from "../../../../store/selectors";

export const EmptyCourseList = ({ title, description, buttonText }) => {
  const userRole = useSelector(getUserRoleSelector);

  return (
    <div className={styles.container}>
      <div className={styles.blockContainer}>{title}</div>
      <div className={styles.blockContainer}>
        {userRole === "admin" && description}
      </div>
      <div className={styles.blockContainer}>
        {userRole === "admin" && (
          <Link to="/courses/add">
            <Button
              buttonText={buttonText}
              className={styles.blockContainer}
              data-testid="addCourse"
            />
          </Link>
        )}
        {userRole !== "admin" && (
          <span>
            You don't have permissions to create a course. Please log in as
            ADMIN
          </span>
        )}
      </div>
    </div>
  );
};
