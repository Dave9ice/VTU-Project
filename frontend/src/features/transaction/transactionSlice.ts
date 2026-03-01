import type { RootState } from "@/Store";
import type { transactionsResult } from "@/utils/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ApiError } from "../user/userSlice";
import axios, { isAxiosError } from "axios";
import { url } from "@/utils/links";
import { toast } from "sonner";

export type TXinitialStateType = {
  isLoading: boolean;
  // localLoading: boolean;
  transactions: transactionsResult[] | [];
  status: string;
  page: number;
  sort: string;
  numOfPage: number;
};
const TXinitialState: TXinitialStateType = {
  isLoading: false,
  // localLoading: false,
  transactions: [],
  status: "",
  sort: "",
  page: 1,
  numOfPage: 1,
};

export const fetchTransaction = createAsyncThunk<
  { tx: transactionsResult[]; numOfPages: number; totalTX: number },
  { sort: string; status: string; page?: number },
  { state: RootState; rejectValue: ApiError }
>("transaction", async (data, thunkApi) => {
  try {
    const resp = await axios.get(`${url}/api/v1/admin/transactions`, {
      params: { sort: data.sort, status: data.status, page: data.page },
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const fetchUserTransaction = createAsyncThunk<
  { tx: transactionsResult[]; numOfPages: number; totalTX: number },
  { sort: string; status: string; page?: number },
  { state: RootState; rejectValue: ApiError }
>("userTransaction", async (data, thunkApi) => {
  try {
    const resp = await axios.get(`${url}/api/v1/transaction`, {
      params: { sort: data.sort, page: data.page, status: data.status },
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});
const transactionSlice = createSlice({
  name: "transaction",
  initialState: TXinitialState,
  reducers: {
    clearState: () => {
      return TXinitialState;
    },
    handleChange: <K extends keyof TXinitialStateType>(
      state: TXinitialStateType,
      action: PayloadAction<{ name: K; value: string }>,
    ) => {
      const { name, value } = action.payload;
      state[name] = value as TXinitialStateType[typeof name];
    },
    handlePage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.transactions = action.payload.tx),
          (state.numOfPage = action.payload.numOfPages));
      })
      .addCase(fetchTransaction.rejected, (state) => {
        ((state.isLoading = false),
          toast("could not fetch transactions please try again later"));
      })
      .addCase(fetchUserTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserTransaction.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.transactions = action.payload.tx),
          (state.numOfPage = action.payload.numOfPages));
      })
      .addCase(fetchUserTransaction.rejected, (state) => {
        ((state.isLoading = false),
          toast("could not fetch transactions please try again later"));
      });
  },
});

export const { clearState, handleChange, handlePage } =
  transactionSlice.actions;

export default transactionSlice.reducer;
