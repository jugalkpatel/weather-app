import { Outlet } from "react-router";
import styles from "./layout.module.css";
import { useGeolocation } from "../../hooks/useGeoLocation.hook";
import { useEffect } from "react";
import { useAppDispatch } from "../../store";
import { setLocation } from "../../slices/weather/weather.slice";

export function Layout() {
  const state = useGeolocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.latitude && state.longitude) {
      dispatch(
        setLocation({ latitude: state.latitude, longitude: state.longitude })
      );
    }
  }, [state, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>this is sidebar</div>
      <div className={styles.contentContainer}>
        <Outlet />
      </div>
    </div>
  );
}
