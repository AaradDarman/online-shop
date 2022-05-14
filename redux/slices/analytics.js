import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "adapters/analytics-adapter";

import { toast } from "react-toastify";

export const getRecentOrders = createAsyncThunk(
  "analytics/recent-orders",
  async ({ search, sortBy, desc }) => {
    try {
      const { status, data } = await api.getRecentOrders(search, sortBy, desc);
      if (status === 200) {
        return data.recentOrders;
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  }
);

export const getProductsStock = createAsyncThunk(
  "analytics/products-stock",
  async ({ search, sortBy, desc }) => {
    try {
      const { status, data } = await api.getProductsStock(search, sortBy, desc);
      if (status === 200) {
        return data.productsStock;
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  }
);

export const getIncome = createAsyncThunk(
  "analytics/get-income",
  async (range) => {
    try {
      const { status, data } = await api.getIncome(range);
      if (status === 200) {
        return data;
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  }
);

// Slice
const slice = createSlice({
  name: "analytics",
  initialState: {
    status: "idle",
    recentOrders: [],
    productsStock: [],
    income: {
      data: [],
      range: [],
    },
  },
  reducers: {},
  extraReducers: {
    [getRecentOrders.fulfilled]: (state, action) => {
      state.recentOrders = action.payload;
      state.status = "idle";
    },
    [getRecentOrders.pending]: (state) => {
      state.status = "loading-recent-orders";
    },
    [getProductsStock.fulfilled]: (state, action) => {
      state.productsStock = action.payload;
      state.status = "idle";
    },
    [getProductsStock.pending]: (state) => {
      state.status = "loading-product-stock";
    },
    [getIncome.fulfilled]: (state, action) => {
      state.income.data = action.payload.incomes;
      state.income.range = action.payload.dateRange;
      state.status = "idle";
    },
    [getIncome.pending]: (state) => {
      state.status = "loading-income";
    },
  },
});
export default slice.reducer;
