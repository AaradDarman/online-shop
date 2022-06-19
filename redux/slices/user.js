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
  },
});
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
