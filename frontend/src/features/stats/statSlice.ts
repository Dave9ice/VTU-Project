import type { RootState } from "@/Store";
import type { statsResult } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ApiError } from "../user/userSlice";
import axios, { isAxiosError } from "axios";
import { url } from "@/utils/links";
import { toast } from "sonner";

type statInitialStateType = {
  isLoading: Boolean;
  userCount: number;
  transactionCount: number;
  pendingTransaction: number;
  successfulTransaction: number;
  successfulPayment: number;
  expirePayment: number;
};
const statInitialState: statInitialStateType = {
  isLoading: false,
  userCount: 0,
  transactionCount: 0,
  pendingTransaction: 0,
  successfulTransaction: 0,
  successfulPayment: 0,
  expirePayment: 0,
};

export const fetchStats = createAsyncThunk<
  statsResult,
  null,
  { state: RootState; rejectValue: ApiError }
>("fetchStat", async (_data, thunkApi) => {
  try {
    const resp = await axios.get(`${url}/api/v1/admin/stats`, {
      withCredentials: true,
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

const statSlice = createSlice({
  name: "stats",
  initialState: statInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        ((state.isLoading = false),
          ((state.userCount = action.payload.userCount),
          state,
          (state.pendingTransaction = action.payload.pendingTransaction),
          (state.successfulPayment = action.payload.successfulPayment),
          (state.transactionCount = action.payload.transactionCount),
          (state.successfulTransaction =
            action.payload.successfulTransaction)));
        state.expirePayment = action.payload.expirePayment;
      })
      .addCase(fetchStats.rejected, (state) => {
        ((state.isLoading = false),
          toast("somthing went wrong, cant  fetch stats"));
      });
  },
});

export const {} = statSlice.actions;
export default statSlice.reducer;
