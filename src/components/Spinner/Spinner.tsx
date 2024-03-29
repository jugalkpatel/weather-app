import styles from "./Spinner.module.css";

export function Spinner() {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progress}></div>
    </div>
  );
}
