import { Outlet } from "react-router";
import styles from "./layout.module.css";

export function Layout() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>this is sidebar</div>
      <div className={styles.contentContainer}>
        <Outlet />
      </div>
    </div>
  );
}
