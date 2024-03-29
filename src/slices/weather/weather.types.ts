import { PayloadAction } from "@reduxjs/toolkit";

export type Location = {
  latitude: number;
  longitude: number;
};

export type TemperatureUnit = "celsius" | "fahrenheit";

export type FetchDataArgs = Location & {
  temperatureUnit: TemperatureUnit;
};

export type WeatherState = {
  location: Location;
  currentWhetherDetails: CurrentWhetherDetails | null;
  temperatureUnit: TemperatureUnit;
  forecast: Forecast;
};

export type SetLocation = PayloadAction<Location>;

// fetch current whether response
export interface CurrentWhetherDetails {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: WeatherUnits;
  current: WeatherValues;
}

export interface WeatherUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  is_day: string;
  precipitation: string;
  rain: string;
  weather_code: string;
  cloud_cover: string;
}

export interface WeatherValues {
  time: string;
  interval: number;
  temperature_2m: number;
  is_day: 1 | 0;
  precipitation: number;
  rain: number;
  weather_code: number;
  cloud_cover: number;
}

export type ForecastValue = {
  time: string;
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  uv_index_max: number;
  precipitation_probability_max: number;
};

export type Forecast = Record<string, ForecastValue>;

// fetch seven days forecast response
export interface ForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: DailyData;
}

export interface DailyUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  uv_index_max: string;
  precipitation_probability_max: string;
}

export interface DailyData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  uv_index_max: number[];
  precipitation_probability_max: number[];
}
