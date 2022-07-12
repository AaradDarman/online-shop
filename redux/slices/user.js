import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import api from "adapters/user-adapter";
import { decodeToken } from "utils/token-helper";

export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    console.log("username, password");
    console.log(username, password);
    try {
      const { status, data } = await api.login({ username, password });
      if (status === 200) {
        return decodeToken(data.token).user;
      }
    } catch (e) {
      if (!e.response) {
        throw e;
      }
      if (e.response.status != 500) {
        toast.error(e?.response?.data?.message, {
          position: "bottom-center",
          closeOnClick: true,
        });
      }
      return rejectWithValue(e?.response?.data);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (
    { fName, lName, email, phoneNumber, personalCode, password },
    { rejectWithValue }
  ) => {
    console.log("signup slice");
    try {
      const { status, data } = await api.signup({
        fName,
        lName,
        email,
        phoneNumber,
        personalCode,
        password,
      });
      if (status === 201) {
        toast.success(data?.message, {
          position: "bottom-center",
          closeOnClick: true,
        });
        return data;
      }
    } catch (e) {
      if (!e.response) {
        throw e;
      }
      if (e.response.status != 500) {
        toast.error(e?.response?.data?.message, {
          position: "bottom-center",
          closeOnClick: true,
        });
      }
      return rejectWithValue(e?.response?.data);
    }
  }
);

export const verify = createAsyncThunk(
  "user/verify",
  async (verificationCode, { rejectWithValue }) => {
    try {
      console.log(verificationCode);
      const { status, data } = await api.verify({ verificationCode });
      if (status === 200) {
        toast.success("اکانت شما با موفقیت فعال شد", {
          position: "bottom-center",
          closeOnClick: true,
        });
      }
    } catch (e) {
      if (!e.response) {
        throw e;
      }
      if (e.response.status != 500) {
        toast.error(e?.response?.data?.message, {
          position: "bottom-center",
          closeOnClick: true,
        });
      }
      return rejectWithValue(e?.response?.data);
    }
  }
);

export const resendVerificationCode = createAsyncThunk(
  "user/verify",
  async (userId, { rejectWithValue }) => {
    try {
      const { status, data } = await api.resend({ userId });
      if (status === 200) {
        toast.success(data.message, {
          position: "bottom-center",
          closeOnClick: true,
        });
      }
    } catch (e) {
      if (!e.response) {
        throw e;
      }
      if (e.response.status != 500) {
        toast.error(e?.response?.data?.message, {
          position: "bottom-center",
          closeOnClick: true,
        });
      }
      return rejectWithValue(e?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { status: "idle", user: {} },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state, action) => {
      state.user = {};
    },
    // logout: (state, action) => {
    //   return {};
    // },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "idle";
    },
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.rejected]: (state, action) => {
      state.status = "idle";
    },
    [signup.fulfilled]: (state, action) => {
      state.status = "idle";
    },
    [signup.pending]: (state, action) => {
      state.status = "loading";
    },
    [signup.rejected]: (state, action) => {
      state.status = "idle";
    },
    [verify.fulfilled]: (state, action) => {
      state.status = "idle";
    },
    [verify.pending]: (state, action) => {
      state.status = "loading";
    },
    [verify.rejected]: (state, action) => {
      state.status = "idle";
    },
    [resendVerificationCode.fulfilled]: (state, action) => {
      state.status = "idle";
    },
    [resendVerificationCode.pending]: (state, action) => {
      state.status = "loading";
    },
    [resendVerificationCode.rejected]: (state, action) => {
      state.status = "idle";
    },
  },
});
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
