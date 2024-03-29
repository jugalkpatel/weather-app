import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type ILoaderState = {
  actions: string[];
};

const initialState: ILoaderState = {
  actions: [],
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startAction: (
      state: ILoaderState,
      { payload }: { payload: { action: string } }
    ) => {
      state.actions = state.actions.concat(payload.action);
    },
    stopAction: (
      state: ILoaderState,
      { payload }: { payload: { action: string } }
    ) => {
      state.actions = state.actions.filter((t) => t !== payload.action);
    },
  },
});

export const { startAction, stopAction } = loaderSlice.actions;

export const checkIfLoading = (type: string) => (state: RootState) =>
  state.loader.actions.includes(type);

export default loaderSlice.reducer;
