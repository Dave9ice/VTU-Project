import type { RootState } from "@/Store";
import { url } from "@/utils/links";
import type { fetchAirtimeResult, purchaseAirtimeProps } from "@/utils/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

export type airtimeInitialState = {
  isloading: Boolean;
  charge: number;
  amount: string | number;
  phoneNumber: string;
  providerArr: string[] | [];
  provider: string;
  serverResponse: fetchAirtimeResult[] | [];
  subcategory_id: number;
};
const initialState: airtimeInitialState = {
  isloading: false,
  charge: 0,
  amount: "",
  phoneNumber: "",
  provider: "",
  providerArr: [],
  serverResponse: [],
  subcategory_id: 0,
};

export const getAirtimeProvider = createAsyncThunk<
  fetchAirtimeResult[],
  null,
  { state: RootState }
>("getAirtime", async (_state, thunkApi) => {
  try {
    const resp = await axios.get(`${url}/api/v1/airtime`, {
      withCredentials: true,
    });
    return resp.data.airtime;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const purchaseAirtime = createAsyncThunk<
  string,
  purchaseAirtimeProps,
  { state: RootState }
>("buyairtime", async (data, thunkApi) => {
  const { amount, phoneNumber, charge, subcategory_id } = data;
  try {
    const resp = await axios.post(
      `${url}/api/v1/purchase/airtime`,
      {
        amount,
        charge,
        phonenumber: phoneNumber,
        subcategory_id,
      },
      { withCredentials: true }
    );
    return resp.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const airtimeSlice = createSlice({
  name: "airtime",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
    handleChange: <K extends keyof airtimeInitialState>(
      state: airtimeInitialState,
      action: PayloadAction<{ name: K; value: string }>
    ) => {
      const { name, value } = action.payload;
      if (name === "amount") {
        state.amount = value === "" ? "" : Number(value);
      } else state[name] = value as airtimeInitialState[typeof name];
    },
    handlePurpose: (
      state: airtimeInitialState,
      action: PayloadAction<String>
    ) => {
      const airtime = action.payload;
      if (airtime === "MTN") {
        state.charge = Number(state.amount) - Number(state.amount) * 0.01;
      }
      if (airtime === "dstv") {
        state.charge = Number(state.amount) - Number(state.amount) * 0.005;
      }
    },
    completeFields: (state, action: PayloadAction<string>) => {
      // console.log(action.payload);
      const item = state.serverResponse.find((item) => {
        return item.title === action.payload;
      });
      state.subcategory_id = item?.subcategory_id || 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAirtimeProvider.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getAirtimeProvider.fulfilled, (state, action) => {
        state.isloading = false;
        state.serverResponse = action.payload;
        state.providerArr = action.payload.map((item) => item.title);
      })
      .addCase(getAirtimeProvider.rejected, () => {
        toast("somthing went wrong fetching");
      })
      .addCase(purchaseAirtime.pending, (state) => {
        state.isloading = true;
      })
      .addCase(purchaseAirtime.fulfilled, (state) => {
        state.isloading = false;
        toast("airtime bought succesfully");
      })
      .addCase(purchaseAirtime.rejected, (state) => {
        state.isloading = false;
        toast("somthinge went wrong fetching");
      });
  },
});
export const { clearState, handleChange, handlePurpose, completeFields } =
  airtimeSlice.actions;
export default airtimeSlice.reducer;
