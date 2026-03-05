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
import type { ApiError } from "../user/userSlice";

export type airtimeInitialState = {
  isloading: boolean;
  localLoading: boolean;
  charge: number;
  amount: string | number;
  phoneNumber: string;
  providerArr: string[] | [];
  provider: string;
  ported: string;
  serverResponse: fetchAirtimeResult[] | [];
  subcategory_id: number;
};
const initialState: airtimeInitialState = {
  isloading: false,
  localLoading: false,
  charge: 0,
  amount: "",
  phoneNumber: "",
  provider: "",
  ported: "no",
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
    console.log(resp.data.airtime);
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
  { state: RootState; rejectValue: ApiError }
>("buyairtime", async (data, thunkApi) => {
  const { amount, phoneNumber, charge, subcategory_id, provider, ported } =
    data;
  try {
    const resp = await axios.post(
      `${url}/api/v1/purchase/airtime`,
      {
        amount,
        charge,
        phonenumber: phoneNumber,
        subcategory_id,
        provider,
        ported,
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

export const airtimeSlice = createSlice({
  name: "airtime",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
    handleChange: <K extends keyof airtimeInitialState>(
      state: airtimeInitialState,
      action: PayloadAction<{ name: K; value: string }>,
    ) => {
      const { name, value } = action.payload;
      if (name === "amount") {
        state.amount = value === "" ? "" : Number(value);
      } else state[name] = value as airtimeInitialState[typeof name];
    },
    handlePurpose: (
      state: airtimeInitialState,
      action: PayloadAction<String>,
    ) => {
      const airtime = action.payload;
      if (airtime === "MTN" || "AIRTEL") {
        state.charge = Number(state.amount) - Number(state.amount) * 0.02;
      }
      if (airtime === "GLO") {
        state.charge = Number(state.amount) - Number(state.amount) * 0.065;
      }
      if (airtime === "9MOBILE") {
        state.charge = Number(state.amount) - Number(state.amount) * 0.05;
      }
    },
    completeFields: (state, action: PayloadAction<string>) => {
      // console.log(action.payload);
      const item = state.serverResponse.find((item) => {
        return item.title === action.payload;
      });
      state.subcategory_id = item?.subcategory_id || 0;
    },
    handleChecked: (state, action: PayloadAction<string>) => {
      state.ported = action.payload;
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
      .addCase(getAirtimeProvider.rejected, (state) => {
        state.isloading = false;

        toast("somthing went wrong fetching");
      })
      .addCase(purchaseAirtime.pending, (state) => {
        state.localLoading = true;
      })
      .addCase(purchaseAirtime.fulfilled, (state) => {
        state.localLoading = false;
        toast("airtime bought succesfully");
      })
      .addCase(purchaseAirtime.rejected, (state, action) => {
        state.localLoading = false;
        toast(action.payload?.msg || "cant purchase data please try again");
      });
  },
});
export const {
  clearState,
  handleChange,
  handlePurpose,
  completeFields,
  handleChecked,
} = airtimeSlice.actions;
export default airtimeSlice.reducer;
