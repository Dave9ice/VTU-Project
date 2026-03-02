import type { RootState } from "@/Store";
import type { fetchCableResult, payCableBillProps } from "@/utils/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import type { ApiError } from "../user/userSlice";
import { toast } from "sonner";
import { url } from "@/utils/links";

export type cableInitialState = {
  isLoading: boolean;
  localLoading: boolean;
  verifyLoading: boolean;
  smartCardNumber: string;
  cable: string;
  cablePlans: string[] | [];
  amount: string | number;
  charge: number;
  phoneNumber: string;
  selectedCablePlan: string;
  verifyResult: string | undefined;
  cableVariationCode: string;
  cableResult: fetchCableResult[] | [];
};

const initialState: cableInitialState = {
  isLoading: false,
  localLoading: false,
  verifyLoading: false,
  smartCardNumber: "",
  cable: "",
  cablePlans: [],
  cableResult: [],
  amount: "",
  charge: 0,
  phoneNumber: "",
  selectedCablePlan: "",
  verifyResult: "",
  cableVariationCode: "",
};

export const fetchCable = createAsyncThunk<
  fetchCableResult[],
  string,
  { state: RootState }
>("fetchCable", async (cable, thunkApi) => {
  try {
    const resp = await axios.get(`${url}/api/v1/cable/${cable}`, {
      withCredentials: true,
    });
    // console.log(resp.data.result);
    return resp.data.result;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const verifyCableCard = createAsyncThunk<
  string,
  { cable: string; cableNumber: string },
  { state: RootState; rejectValue: ApiError }
>("verifyCable", async (data, thunkApi) => {
  try {
    const resp = await axios.post(`${url}/api/v1/verify/cable`, {
      cable: data.cable,
      cableNumber: data.cableNumber,
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

export const cablePayment = createAsyncThunk<
  string,
  payCableBillProps,
  { state: RootState; rejectValue: ApiError }
>("cablePayment", async (data, thunkApi) => {
  const {
    cable,
    cableVariationCode,
    amount,
    charge,
    phoneNumber,
    smartCardNumber,
  } = data;
  try {
    const resp = await axios.post(
      `${url}/api/v1/purchase/cable`,
      {
        plan: cable,
        cardno: smartCardNumber,
        amount,
        charge,
        variation_code: cableVariationCode,
        phonenumber: phoneNumber,
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

const cableSlice = createSlice({
  name: "cable",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
    handleChange: <K extends keyof cableInitialState>(
      state: cableInitialState,
      action: PayloadAction<{ name: K; value: string }>,
    ) => {
      const { name, value } = action.payload;
      if (name === "amount") {
        state.amount = value === "" ? "" : Number(value);
      } else state[name] = value as cableInitialState[typeof name];
    },
    handlePurpose: (
      state: cableInitialState,
      action: PayloadAction<String>,
    ) => {
      const airtime = action.payload;
      if (airtime === "dstv") {
        state.charge = Number(state.amount) - Number(state.amount) * 0.003;
      }
      if (airtime === "gotv") {
        state.charge = Number(state.amount) - Number(state.amount) * 0.005;
      }
      if (airtime === "startimes") {
        state.charge = Number(state.amount) - Number(state.amount) * 0.005;
      }
    },
    updateCableFields: (state, action) => {
      const passedValue = action.payload;
      const findValue = state.cableResult.find(
        (item) => item.name === passedValue,
      );
      state.cableVariationCode = findValue ? findValue.variation_code : "";
      state.amount = Number(findValue?.variation_amount);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCable.fulfilled,
        (state, action: PayloadAction<fetchCableResult[]>) => {
          const newCablePlans = action.payload.map((item) => item.name);
          state.isLoading = false;
          state.cablePlans = newCablePlans;
          state.cableResult = action.payload;
        },
      )
      .addCase(fetchCable.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyCableCard.pending, (state) => {
        state.verifyLoading = true;
      })
      .addCase(verifyCableCard.fulfilled, (state, action) => {
        state.verifyLoading = false;

        state.verifyResult = action.payload;
      })
      .addCase(verifyCableCard.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifyResult = action.payload?.msg;
        toast(
          action.payload?.msg || "unable to verify cable No..please try again",
        );
      })
      .addCase(cablePayment.pending, (state) => {
        state.localLoading = true;
      })
      .addCase(cablePayment.fulfilled, (state) => {
        state.localLoading = false;
      })
      .addCase(cablePayment.rejected, (state, action) => {
        state.localLoading = false;
        toast(
          action.payload?.msg || "unable to pay cable bill..please try again",
        );
      });
  },
});
export const { clearState, handlePurpose, updateCableFields, handleChange } =
  cableSlice.actions;

export default cableSlice.reducer;
