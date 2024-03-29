import clearDay from "./assets/clear-day.svg";
import clearNight from "./assets/clear-night.svg";
import partlyCloudyDay from "./assets/partly-cloudy-day.svg";
import partlyCloudyNight from "./assets/partly-cloudy-night.svg";
import overcastDay from "./assets/overcast-day.svg";
import overcastNight from "./assets/overcast-night.svg";
import fogDay from "./assets/fog-day.svg";
import fogNight from "./assets/fog-night.svg";
import rimeFogDay from "./assets/partly-cloudy-day-fog.svg";
import rimeFogNight from "./assets/partly-cloudy-night-fog.svg";
import drizzleDay from "./assets/partly-cloudy-day-drizzle.svg";
import drizzleNight from "./assets/partly-cloudy-night-drizzle.svg";
import freezingDrizzleDay from "./assets/partly-cloudy-day-sleet.svg";
import freezingDrizzleNight from "./assets/partly-cloudy-night-sleet.svg";
import rainLightDay from "./assets/partly-cloudy-day-rain.svg";
import rainLightNight from "./assets/partly-cloudy-night-rain.svg";
import raindrop from "./assets/raindrop.svg";
import rainDrops from "./assets/raindrops.svg";
import freezingRainDay from "./assets/thunderstorms-day-snow.svg";
import freezingRainNight from "./assets/thunderstorms-night-snow.svg";
import snowFallLightDay from "./assets/partly-cloudy-day-snow.svg";
import snowFallLightNight from "./assets/partly-cloudy-night-snow.svg";
import snowModerate from "./assets/snow.svg";
import snowHeavyDay from "./assets/thunderstorms-day-snow.svg";
import showHeavyNight from "./assets/thunderstorms-night-snow.svg";
import snowGrains from "./assets/snowflake.svg";
import rain from "./assets/rain.svg";
import thunderStormsRainDay from "./assets/thunderstorms-day-rain.svg";
import thunderStormsRainNight from "./assets/thunderstorms-night-rain.svg";
import thunderStormsDay from "./assets/thunderstorms-day.svg";
import thunderStormsNight from "./assets/thunderstorms-rain.svg";
import { TemperatureUnit } from "./slices/weather/weather.types";

export const FETCH_CURRENT_WEATHER = "whether/fetchCurrentWeather";

export const FETCH_WEATHER_FORECAST = "whether/fetchWeatherForecast";

type TemperatureIcon = Record<TemperatureUnit, string>;

export const temperatureIcons: TemperatureIcon = {
  celsius: "°C",
  fahrenheit: "℉",
};

type WeatherIcon = {
  1: string;
  0: string;
};

// Map weather conditions to icons
export const weatherIcons: Record<number, WeatherIcon> = {
  0: {
    1: clearDay,
    0: clearNight,
  },
  1: {
    1: clearDay,
    0: clearNight,
  },
  2: {
    1: partlyCloudyDay,
    0: partlyCloudyNight,
  },
  3: {
    1: overcastDay,
    0: overcastNight,
  },
  45: {
    1: fogDay,
    0: fogNight,
  },
  48: {
    1: rimeFogDay,
    0: rimeFogNight,
  },
  51: {
    1: drizzleDay,
    0: drizzleNight,
  },
  53: {
    1: drizzleDay,
    0: drizzleNight,
  },
  55: {
    1: drizzleDay,
    0: drizzleNight,
  },
  56: {
    1: freezingDrizzleDay,
    0: freezingDrizzleNight,
  },
  57: {
    1: freezingDrizzleDay,
    0: freezingDrizzleNight,
  },
  61: {
    1: rainLightDay,
    0: rainLightNight,
  },
  63: {
    1: raindrop,
    0: raindrop,
  },
  65: {
    1: rainDrops,
    0: rainDrops,
  },
  66: {
    1: freezingRainDay,
    0: freezingRainNight,
  },
  67: {
    1: freezingRainDay,
    0: freezingRainNight,
  },
  71: {
    1: snowFallLightDay,
    0: snowFallLightNight,
  },
  73: {
    1: snowModerate,
    0: snowModerate,
  },
  75: {
    1: snowHeavyDay,
    0: showHeavyNight,
  },
  77: {
    1: snowGrains,
    0: snowGrains,
  },
  80: {
    1: rainLightDay,
    0: rainLightNight,
  },
  81: {
    1: rain,
    0: rain,
  },
  82: {
    1: thunderStormsRainDay,
    0: thunderStormsRainNight,
  },
  85: {
    1: raindrop,
    0: raindrop,
  },
  86: {
    1: rainDrops,
    0: rainDrops,
  },
  95: {
    1: thunderStormsDay,
    0: thunderStormsNight,
  },
  96: {
    1: thunderStormsRainDay,
    0: thunderStormsRainNight,
  },
  99: {
    1: freezingRainDay,
    0: freezingRainNight,
  },
};
