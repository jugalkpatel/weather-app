import { useEffect } from "react";
import {
  fetchSevenDaysForecast,
  selectForecast,
  selectLocation,
  selectTemperatureUnit,
} from "../../slices/weather/weather.slice";
import { useAppSelector, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { checkIfLoading } from "../../slices/loaders.slice";
import { FETCH_WEATHER_FORECAST, weatherIcons } from "../../constants";
import { ForecastValue } from "../../slices/weather/weather.types";
import { getDateTimeFromTimestamp } from "../../utils/getDateTimeInfo";
import styles from "./Forecast.module.css";
import { WhetherTimeline } from "../WeatherTimeline/WeatherTimeline";
import { Spinner } from "../Spinner/Spinner";

function useFetchForecast() {
  const location = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();
  const temperatureUnit = useAppSelector(selectTemperatureUnit);

  useEffect(() => {
    dispatch(
      fetchSevenDaysForecast({
        latitude: location.latitude,
        longitude: location.longitude,
        temperatureUnit,
      })
    );
  }, [location, temperatureUnit, dispatch]);
}

export function Forecast() {
  const isForecastLoading = useSelector(checkIfLoading(FETCH_WEATHER_FORECAST));
  const forecast = useAppSelector(selectForecast);
  const isLoading = isForecastLoading && !Object.keys(forecast).length;
  useFetchForecast();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.rootContainer}>
      <div className={styles.timelineRootContainer}>
        <p className={styles.heading}>Weekly Forecast Highlights</p>
        <div className={styles.daysListContainer}>
          {Object.keys(forecast).map((i) => {
            return <ForecastCard key={i} {...forecast[i]} />;
          })}
        </div>
      </div>

      <div className={styles.timelineRootContainer}>
        <p className={styles.heading}>Weekly Temperature Range</p>
        <div className={styles.timelineContainer}>
          <WhetherTimeline />
        </div>
      </div>
    </div>
  );
}

function ForecastCard(props: ForecastValue) {
  // const [searchParams, setSearchParams] = useSearchParams();
  const { day } = getDateTimeFromTimestamp(Number(props.time));
  const weatherCode = props.weather_code;
  const icon = weatherIcons[weatherCode][1];
  const maxTemp = props.temperature_2m_max;
  const minTemp = props.temperature_2m_min;

  // const handleClick = () => {
  //   searchParams.set("timestamp", props.time);
  //   setSearchParams(searchParams);
  // };

  return (
    <div className={styles.container}>
      <p className={styles.day}>{day}</p>
      <img
        src={icon}
        alt="weather"
        width={110}
        height={100}
        className={styles.icon}
      />
      <div className={styles.tempContainer}>
        <div className={styles.flexRowContainer}>
          <p className={`${styles.tmpText} ${styles.max}`}>
            {maxTemp.toFixed()}
          </p>

          <p className={`${styles.degree} ${styles.max}`}>°</p>
        </div>
        <div className={styles.flexRowContainer}>
          <p className={`${styles.tmpText} ${styles.min}`}>
            <span className={styles.slash}>/</span>
            {minTemp.toFixed()}
          </p>
          <p className={`${styles.degree} ${styles.min}`}>°</p>
        </div>
      </div>
    </div>
  );
}
