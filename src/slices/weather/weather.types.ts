import { PayloadAction } from "@reduxjs/toolkit";

export type Location = {
  latitude: number;
  longitude: number;
};

export type WeatherState = {
  location: Location;
};

export type SetLocation = PayloadAction<Location>;
