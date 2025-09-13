import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import dataSlice from "./features/data/dataSlice";
import electricitySlice from "./features/electricity/electricitySlice";
import airtimeSlice from "./features/airtime/airtimeSlice";
import cableSlice from "./features/cable/cableSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    data: dataSlice,
    electricity: electricitySlice,
    airtime: airtimeSlice,
    cable: cableSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
