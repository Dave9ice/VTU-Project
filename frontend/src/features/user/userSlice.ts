import type { RootState } from "@/Store";
import { url } from "@/utils/links";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from "@/utils/localStorage";
import type {
  registerData,
  User,
  userInitialState,
  verifyUserProps,
} from "@/utils/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
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
  password: "",
  email: "",
  newPassword: "",
  otp: "",
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
      { withCredentials: true },
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
  { msg: string; email: string },
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
    return resp.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const verifyUser = createAsyncThunk<
  string,
  verifyUserProps,
  { state: RootState; rejectValue: ApiError }
>("verifyUser", async (data, thunkApi) => {
  try {
    const resp = await axios.post(`${url}/api/v1/auth/verify-user`, {
      verifyToken: data.token,
      email: data.email,
    });
    return resp.data.msg;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const forgotPassword = createAsyncThunk<
  string,
  { password: string; email: string; token: string; confirmPassword: string },
  { state: RootState; rejectValue: ApiError }
>("forgotpassword", async (data, thunkApi) => {
  try {
    const resp = await axios.post(`${url}/api/v1/auth/password-forgot`, {
      password: data.password,
      email: data.email,
      token: data.token,
      confirmPassword: data.confirmPassword,
    });
    return resp.data.msg;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});
export const forgotPasswordRequest = createAsyncThunk<
  string,
  { email: string },
  { state: RootState; rejectValue: ApiError }
>("forgotpasswordRequest", async (data, thunkApi) => {
  try {
    const resp = await axios.post(
      `${url}/api/v1/auth/password-forgot-request`,
      {
        email: data.email,
      },
    );
    return resp.data.msg;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
    console.log(error);
  }
});

export const resetPassword = createAsyncThunk<
  string,
  { password: string; newPassword: string },
  { state: RootState; rejectValue: ApiError }
>("reset password", async (data, thunkApi) => {
  try {
    const resp = await axios.post(
      `${url}/api/v1/auth/password-reset`,
      { password: data.password, newPassword: data.newPassword },
      { withCredentials: true },
    );
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
        { withCredentials: true },
      );
      return resp.data.msg;
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
      console.log(error);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
    handleChange: <K extends keyof userInitialState>(
      state: userInitialState,
      action: PayloadAction<{ name: K; value: string }>,
    ) => {
      const { name, value } = action.payload;
      state[name] = value as userInitialState[typeof name];
    },
    clearState: () => {
      return initialState;
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
      .addCase(loginUser.fulfilled, (state: userInitialState, action) => {
        state.isLoading = false;
        state.user = action.payload;
        toast(`welcome back ${action.payload.firstName}`);
        setUserToLocalStorage(action.payload);
        // if (state.user) {
        //   const date = new Date(action.payload.joinDate).toISOString();
        //   state.user.email = action.payload.email;
        //   state.user.firstName = action.payload.firstName;
        //   state.user.lastName = action.payload.lastName;
        //   state.user.joinDate = date;
        //   state.user.phoneNumber = action.payload.phoneNumber;
        //   state.user.role = action.payload.role;
        //   state.user.wallet = action.payload.wallet;
        //   toast(`welcome back ${action.payload.firstName}`);
        //   setUserToLocalStorage(action.payload);
        // } else toast("something went wrong");
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
        state.succesMsg = action.payload.msg;
        state.email = action.payload.email;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        toast(action.payload?.msg);
      })
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        ((state.isLoading = false), (state.succesMsg = action.payload));
      })
      .addCase(verifyUser.rejected, (state, action) => {
        ((state.isLoading = false),
          // (state.succesMsg =
          //   action.payload?.msg || "somthing went wrong verifying");
          toast(action.payload?.msg));
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        toast(action.payload);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        toast(action.payload?.msg || "somthinge went wrong");
      })
      .addCase(forgotPasswordRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordRequest.fulfilled, (state, action) => {
        ((state.succesMsg = action.payload),
          ((state.isLoading = false),
          (state.succesMsg = action.payload),
          toast(action.payload)));
      })
      .addCase(forgotPasswordRequest.rejected, (state, action) => {
        ((state.isLoading = false),
          toast(action.payload?.msg || "something went wrong"));
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.succesMsg = action.payload),
          toast(action.payload));
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        ((state.isLoading = false),
          toast(action.payload?.msg || "somethinge went wrong"));
      });
  },
});

export const { toggleSidebar, handleChange, clearState } = userSlice.actions;

export default userSlice.reducer;
