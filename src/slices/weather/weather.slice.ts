import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  WeatherState,
  SetLocation,
  CurrentWhetherDetails,
  FetchDataArgs,
  ForecastResponse,
  Forecast,
} from "./weather.types";
import { RootState } from "../../store";
import { FETCH_CURRENT_WEATHER, FETCH_WEATHER_FORECAST } from "../../constants";
import axios from "axios";
import { startAction, stopAction } from "../loaders.slice";

const initialState: WeatherState = {
  temperatureUnit: "celsius",
  location: {
    latitude: 12.971599,
    longitude: 77.594566,
  },
  currentWhetherDetails: null,
  forecast: {},
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLocation(state, action: SetLocation) {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentWhether.fulfilled, (state, action) => {
      state.currentWhetherDetails = action.payload;
    });
    builder.addCase(fetchSevenDaysForecast.fulfilled, (state, action) => {
      const { daily } = action.payload;

      const forecast: Forecast = {};

      for (let i = 0; i < daily.time.length; i++) {
        const time = daily.time[i];
        forecast[time] = {
          time,
          weather_code: daily.weather_code[i],
          temperature_2m_max: daily.temperature_2m_max[i],
          temperature_2m_min: daily.temperature_2m_min[i],
          uv_index_max: daily.uv_index_max[i],
          precipitation_probability_max: daily.precipitation_probability_max[i],
        };
      }

      state.forecast = forecast;
    });
  },
});

export default weatherSlice.reducer;

export const { setLocation } = weatherSlice.actions;

export const fetchSevenDaysForecast = createAsyncThunk<
  ForecastResponse,
  FetchDataArgs,
  { rejectValue: Error }
>(
  FETCH_WEATHER_FORECAST,
  async ({ latitude, longitude, temperatureUnit }, thunkApi) => {
    const { dispatch } = thunkApi;
    try {
      dispatch(startAction({ action: FETCH_WEATHER_FORECAST }));

      const { data } = await axios.get<ForecastResponse>(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max&timeformat=unixtime&temperature_unit=${temperatureUnit}`
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error);
      } else {
        const error = new Error("An unexpected error occurred");
        return thunkApi.rejectWithValue(error);
      }
    } finally {
      dispatch(stopAction({ action: FETCH_WEATHER_FORECAST }));
    }
  }
);

export const fetchCurrentWhether = createAsyncThunk<
  CurrentWhetherDetails,
  FetchDataArgs,
  { rejectValue: Error }
>(
  FETCH_CURRENT_WEATHER,
  async ({ latitude, longitude, temperatureUnit }, thunkApi) => {
    const { dispatch } = thunkApi;
    try {
      dispatch(startAction({ action: FETCH_CURRENT_WEATHER }));

      const { data } = await axios.get<CurrentWhetherDetails>(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,precipitation,rain,weather_code,cloud_cover&temperature_unit=${temperatureUnit}`
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error);
      } else {
        const error = new Error("An unexpected error occurred");
        return thunkApi.rejectWithValue(error);
      }
    } finally {
      dispatch(stopAction({ action: FETCH_CURRENT_WEATHER }));
    }
  }
);

export const selectLocation = (state: RootState) => state.weather.location;

export const selectTemperatureUnit = (state: RootState) =>
  state.weather.temperatureUnit;

export const selectWeatherDetails = (state: RootState) =>
  state.weather.currentWhetherDetails;

export const selectForecast = (state: RootState) => state.weather.forecast;
