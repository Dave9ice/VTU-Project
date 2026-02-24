import type { RootState } from "@/Store";
import { url } from "@/utils/links";
import type {
  accountFetchResult,
  transactionStatusResult,
} from "@/utils/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

export type accountInitialState = {
  isLoading: Boolean;
  accountNumber: string;
  bankName: string;
  expiresIn: string;
  amount: number | string;
  trx_ref: string;
  status: string;
};
const accountinitialState: accountInitialState = {
  isLoading: false,
  accountNumber: "",
  bankName: "",
  expiresIn: "",
  amount: "",
  trx_ref: "",
  status: "",
};

export const createVirtualAccountNumber = createAsyncThunk<
  accountFetchResult,
  { amount: number },
  { state: RootState }
>("createVirtualAccount", async (data, thunkApi) => {
  try {
    const resp = await axios.post(
      `${url}/api/v1/account/create-dynamic-account`,
      { amount: data.amount },
      { withCredentials: true },
    );
    console.log(resp.data.account_Details);
    return resp.data.account_Details;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const fetchTransactionStatus = createAsyncThunk<
  transactionStatusResult,
  { trx_ref: string },
  { state: RootState }
>("fetchstatus", async (data, thunkApi) => {
  try {
    const resp = await axios.get(`${url}/api/v1/transaction/status`, {
      params: { trx_ref: data.trx_ref },
      withCredentials: true,
    });
    console.log(resp.data.transaction);
    return resp.data.transaction;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const accountSlice = createSlice({
  name: "account",
  initialState: accountinitialState,
  reducers: {
    handleChange: <k extends keyof accountInitialState>(
      state: accountInitialState,
      action: PayloadAction<{ name: k; value: string }>,
    ) => {
      const { name, value } = action.payload;
      if (name === "amount") {
        state.amount = value === "" ? "" : Number(value);
      } else state[name] = value as accountInitialState[typeof name];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVirtualAccountNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVirtualAccountNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accountNumber = action.payload.account_number;
        state.bankName = action.payload.bank_name;
        state.expiresIn = action.payload.expiresIn;
        state.trx_ref = action.payload.txRef;
        state.amount = action.payload.amount;
      })
      .addCase(createVirtualAccountNumber.rejected, (state) => {
        state.isLoading = false;
        toast("could not generate account number please try again");
      })
      .addCase(fetchTransactionStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactionStatus.fulfilled, (state, action) => {
        ((state.isLoading = false), (state.status = action.payload.status));
      })
      .addCase(fetchTransactionStatus.rejected, (state) => {
        ((state.isLoading = false),
          toast("could not verify transaction status"));
      });
  },
});
export const { handleChange } = accountSlice.actions;
export default accountSlice.reducer;
