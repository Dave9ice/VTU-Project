import type { RootState } from "@/Store";
import { url } from "@/utils/links";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from "@/utils/localStorage";
import type { registerData, User, userInitialState } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

export type ApiError = {
  msg: string;
};
const initialState: userInitialState = {
  user: getUserFromLocalStorage(),
  isLoading: false,
  showSideBar: false,
  succesMsg: "",
};

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { state: RootState; rejectValue: ApiError }
>("loginUser", async (data, thunkApi) => {
  try {
    const resp = await axios.post(
      `${url}/api/v1/auth/login`,
      {
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    );
    return resp.data.user;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const registerUser = createAsyncThunk<
  string,
  registerData,
  { state: RootState; rejectValue: ApiError }
>("registerUser", async (data, thunkApi) => {
  const { firstName, lastName, email, password, phoneNumber } = data;
  try {
    const resp = await axios.post(`${url}/api/v1/auth/register`, {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });
    return resp.data.msg;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const logoutUser = createAsyncThunk<string, {}, { state: RootState }>(
  "logoutUser",
  async (_data, thunkApi) => {
    try {
      const resp = await axios.post(
        `${url}/api/v1/auth/logout`,
        {},
        { withCredentials: true }
      );
      return resp.data.msg;
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
    // logoutUser: (state) => {
    //   removeUserFromLocalStorage();
    //   return initialState;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        toast(`welcome back ${action.payload.firstName}`);
        setUserToLocalStorage(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        const msg = action.payload?.msg;
        toast(msg);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, () => {
        removeUserFromLocalStorage();
        return initialState;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        toast("somthing went wrong");
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.succesMsg = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        toast(action.payload?.msg);
      });
  },
});

export const { toggleSidebar } = userSlice.actions;

export default userSlice.reducer;
