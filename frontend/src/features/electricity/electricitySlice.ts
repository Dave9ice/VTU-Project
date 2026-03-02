import type { RootState } from "@/Store";
import { electricProvider, url } from "@/utils/links";
import type { payElectricBillProps } from "@/utils/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import type { ApiError } from "../user/userSlice";

export type electricityInitialState = {
  isLoading: boolean;
  localLoading: boolean;
  verifyLoading: boolean;
  electricProvider: string;
  electricProviderType: string;
  amount: string | number;
  charge: number;
  phoneNumber: string;
  meterNumber: string;
  verifyResult: string | undefined;
};
const initialState: electricityInitialState = {
  isLoading: false,
  localLoading: false,
  verifyLoading: false,
  electricProvider: "",
  electricProviderType: "",
  amount: "",
  charge: 0,
  phoneNumber: "",
  meterNumber: "",
  verifyResult: "",
};

export const verifyMeterNo = createAsyncThunk<
  string,
  { plan: string; cardno: string; type: string },
  { state: RootState; rejectValue: ApiError }
>("verifyCable", async (data, thunkApi) => {
  try {
    const resp = await axios.post(`${url}/api/v1/verify/meter`, {
      cardno: data.cardno,
      plan: data.plan,
      type: data.type,
    });
    console.log(resp.data.msg);
    return resp.data.msg;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const payElectricBills = createAsyncThunk<
  string,
  payElectricBillProps,
  { state: RootState; rejectValue: ApiError }
>("payElectricBills", async (data, thunkApi) => {
  const {
    electricProvider,
    electricProviderType,
    phoneNumber,
    meterNumber,
    amount,
    charge,
  } = data;
  try {
    const resp = await axios.post(
      `${url}/api/v1/purchase/electricity`,
      {
        plan: electricProvider,
        phonenumber: phoneNumber,
        cardno: meterNumber,
        variation_code: electricProviderType,
        amount,
        charge,
      },
      { withCredentials: true },
    );
    return resp.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

const electricitySlice = createSlice({
  name: "Electricity",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
    handleChange: <K extends keyof electricityInitialState>(
      state: electricityInitialState,
      action: PayloadAction<{ name: K; value: string }>,
    ) => {
      const { name, value } = action.payload;
      if (name === "amount") {
        state.amount = value === "" ? "" : Number(value);
      } else state[name] = value as electricityInitialState[typeof name];
    },
    checkElectricProviderPercentage: (state, action: PayloadAction<string>) => {
      const { percent } = electricProvider.filter(
        (item) => item.provider === action.payload,
      )[0];
      if (percent === undefined) {
        return initialState;
      }
      state.charge = Number(state.amount) - Number(state.amount) * percent;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyMeterNo.pending, (state) => {
        state.verifyLoading = true;
      })
      .addCase(verifyMeterNo.fulfilled, (state, action) => {
        state.verifyLoading = false;

        state.verifyResult = action.payload;
      })
      .addCase(verifyMeterNo.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifyResult = action.payload?.msg;
        toast("could not verify meter number");
      })
      .addCase(payElectricBills.pending, (state) => {
        state.localLoading = true;
      })
      .addCase(payElectricBills.fulfilled, (state) => {
        state.localLoading = false;
      })
      .addCase(payElectricBills.rejected, (state, action) => {
        state.localLoading = false;
        toast(action.payload?.msg || "something went wrong");
      });
  },
});

export const { clearState, handleChange, checkElectricProviderPercentage } =
  electricitySlice.actions;
export default electricitySlice.reducer;
