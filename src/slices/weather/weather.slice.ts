import { createSlice } from "@reduxjs/toolkit";
import { WeatherState, SetLocation } from "./weather.types";
import { RootState } from "../../store";

const initialState: WeatherState = {
  location: {
    latitude: 12.971599,
    longitude: 77.594566,
  },
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLocation(state, action: SetLocation) {
      state.location = action.payload;
    },
  },
});

export default weatherSlice.reducer;

export const { setLocation } = weatherSlice.actions;

export const selectLocation = (state: RootState) => state.weather.location;
