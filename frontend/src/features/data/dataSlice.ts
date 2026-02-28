import type { RootState } from "@/Store";
import { url } from "@/utils/links";
import type {
  buyDataProps,
  dataInitialState,
  fetchDataResult,
} from "@/utils/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import type { ApiError } from "../user/userSlice";

const initialState: dataInitialState = {
  provider: "",
  dataProviderArr: [],
  dataPlans: [],
  selectedPlan: "",
  subCategoryId: 0,
  examType: "",
  resultType: "",
  resultTypeArr: [],
  phoneNumber: "",
  amount: "",
  charge: 0,
  isLoading: false,
  localLoading: false,
  error: "",
};

export const fetchDataProvider = createAsyncThunk<
  string[],
  null,
  { state: RootState; rejectValue: ApiError }
>("fetchProvider", async (_data, thunkApi) => {
  try {
    const resp = await axios.get(`${url}/api/v1/data`, {
      withCredentials: true,
    });
    // console.log(resp.data);
    return resp.data.provider;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const fetchData = createAsyncThunk<
  fetchDataResult[],
  string,
  { state: RootState }
>("fetchdata", async (provider, thunkApi) => {
  try {
    const resp = await axios.get(`${url}/api/v1/data/${provider}`, {
      withCredentials: true,
    });
    // console.log(resp.data.data);
    return resp.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const buyData = createAsyncThunk<
  string,
  buyDataProps,
  { state: RootState; rejectValue: ApiError }
>("buyData", async (data, thunkApi) => {
  const { provider, selectedPlan, amount, phoneNumber, subCategoryId } = data;
  try {
    const resp = await axios.post(
      `${url}/api/v1/purchase/data`,
      {
        amount,
        phoneNumber,
        plan: selectedPlan,
        subcategory_id: subCategoryId,
        provider,
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

const dataSlice = createSlice({
  name: "Data",
  initialState,
  reducers: {
    handleChange: <K extends keyof dataInitialState>(
      state: dataInitialState,
      action: PayloadAction<{ name: K; value: string }>,
    ) => {
      const { name, value } = action.payload;
      if (name === "amount") {
        state.amount = value === "" ? "" : Number(value);
      } else state[name] = value as dataInitialState[typeof name];
    },

    updateDataFields: (state, action) => {
      const passedValue = action.payload;
      const amount = passedValue.split("#").pop();
      state.amount = amount;
    },
    clearDataState: (_state: dataInitialState) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<fetchDataResult[]>) => {
          ((state.isLoading = false),
            (state.dataPlans = action.payload[0].plan),
            (state.subCategoryId = action.payload[0].subcategory_id));
        },
      )
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
        toast("somthing went wrong");
      })
      // add rejected

      .addCase(fetchDataProvider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDataProvider.fulfilled, (state, action) => {
        ((state.isLoading = false), (state.dataProviderArr = action.payload));
      })
      .addCase(fetchDataProvider.rejected, (state) => {
        state.isLoading = false;
        toast("somthing went wrong");
      })
      .addCase(buyData.pending, (state) => {
        state.localLoading = true;
      })
      .addCase(buyData.fulfilled, (state) => {
        state.isLoading = false;
        toast("successs");
      })
      .addCase(buyData.rejected, (state, action) => {
        state.localLoading = false;

        toast(action.payload?.msg || "somthing went wrong");
      });
  },
});

export const { handleChange, clearDataState, updateDataFields } =
  dataSlice.actions;
export default dataSlice.reducer;
