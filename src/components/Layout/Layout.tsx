import { Outlet } from "react-router";
import styles from "./layout.module.css";
import { useGeolocation } from "../../hooks/useGeoLocation.hook";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchCurrentWhether,
  selectLocation,
  selectTemperatureUnit,
  selectWeatherDetails,
  setLocation,
} from "../../slices/weather/weather.slice";
import { checkIfLoading } from "../../slices/loaders.slice";
import {
  FETCH_CURRENT_WEATHER,
  temperatureIcons,
  weatherIcons,
} from "../../constants";
import weatherStyles from "../WeatherCard/WeatherCard.module.css";
import { getDateTimeInfo } from "../../utils/getDateTimeInfo";

function Sidebar() {
  const location = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(checkIfLoading(FETCH_CURRENT_WEATHER));
  const weatherDetails = useAppSelector(selectWeatherDetails);
  const temperatureUnit = useAppSelector(selectTemperatureUnit);

  useEffect(() => {
    dispatch(
      fetchCurrentWhether({
        latitude: location.latitude,
        longitude: location.longitude,
        temperatureUnit,
      })
    );
  }, [location, temperatureUnit, dispatch]);

  if (isLoading && !weatherDetails?.latitude) {
    return <h1>Loading...</h1>;
  }

  const weatherCode = weatherDetails?.current.weather_code || 0;
  const timeOfDay = weatherDetails?.current.is_day || 0;

  const icon = weatherIcons[weatherCode][timeOfDay];
  const temp = weatherDetails?.current.temperature_2m || 0;
  const dayAndTime = getDateTimeInfo(weatherDetails?.current.time || "");

  return (
    <div className={weatherStyles.container}>
      <div className={weatherStyles.weatherDetails}>
        <img src={icon} alt="weather" height={200} width={200} />
        <div className={weatherStyles.temperature}>
          <h1 className={weatherStyles.temperatureText}>{temp}</h1>
          <h2 className={weatherStyles.temperatureUnit}>
            {temperatureIcons[temperatureUnit]}
          </h2>
        </div>
        <div className={weatherStyles.dayTimeContainer}>
          <h2 className={`${weatherStyles.dayTime} ${weatherStyles.day}`}>
            {dayAndTime.day}
            {","}
          </h2>
          <h2 className={`${weatherStyles.dayTime} ${weatherStyles.time}`}>
            &nbsp;
            {dayAndTime.time}
          </h2>
        </div>
      </div>
      <div className={weatherStyles.divider} />
      <div className={weatherStyles.extra}></div>
    </div>
  );
}

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
      <Sidebar />
      <div className={styles.contentContainer}>
        <Outlet />
      </div>
    </div>
  );
}
