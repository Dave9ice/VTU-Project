import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import dataSlice from "./features/data/dataSlice";
import electricitySlice from "./features/electricity/electricitySlice";
import airtimeSlice from "./features/airtime/airtimeSlice";
import cableSlice from "./features/cable/cableSlice";
import accountSlice from "./features/account/accountSlice";
import statSlice from "./features/stats/statSlice";
import transactionSlice from "./features//transaction/transactionSlice";
import { transactionApi } from "./features/polling/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    user: userSlice,
    data: dataSlice,
    electricity: electricitySlice,
    airtime: airtimeSlice,
    cable: cableSlice,
    account: accountSlice,
    stat: statSlice,
    transaction: transactionSlice,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(transactionApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
