import { useEffect } from "react";
import {
  FETCH_CURRENT_WEATHER,
  weatherIcons,
  temperatureIcons,
} from "../../constants";
import { checkIfLoading } from "../../slices/loaders.slice";
import {
  selectLocation,
  selectWeatherDetails,
  selectTemperatureUnit,
  fetchCurrentWhether,
} from "../../slices/weather/weather.slice";
import { useAppSelector, useAppDispatch } from "../../store";
import { getDateTimeInfo } from "../../utils/getDateTimeInfo";
import { Spinner } from "../Spinner/Spinner";
import weatherStyles from "./WeatherCard.module.css";

export function Sidebar() {
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
    return <Spinner />;
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
    </div>
  );
}
