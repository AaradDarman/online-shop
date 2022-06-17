import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { cleanStorage } from "utils/browser-storage";
import api from "adapters/adapter";
import basketApi from "adapters/basket-adapter";


export const getUserCartItems = createAsyncThunk(
  "cart/getItems",
  async (userId) => {
    try {
      const { status, data } = await api.getBasket(userId);
      if (status === 200) {
        return data.basket;
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  }
);

export const syncCartToDb = createAsyncThunk(
  "cart/cyncItemsToDb",
  async (items) => {
    try {
      const { status, data } = await basketApi.syncBasket({ items });
      if (status === 200) {
        cleanStorage();
        return data.basketItems;
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  }
);

export const addItemToDbCart = createAsyncThunk(
  "cart/addItemsTodb",
  async ({ item, userId }) => {
    try {
      const { status, data } = await basketApi.addToBasket({ item, userId });
      if (status === 200) {
        return data.basket;
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  }
);

export const removeItemFromDbCart = createAsyncThunk(
  "cart/removeItemsFromdb",
  async ({ item, userId }) => {
    try {
      const { status, data } = await basketApi.removeFromBasket({
        item,
        userId,
      });
      if (status === 200) {
        return data.basket;
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  }
);

const initialState = {
  status: "idle",
  itemsCount: 0,
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (state.itemsCount === 0) {
        state.items.push({ ...action.payload, quantity: 1 });
        state.itemsCount++;
        state.totalPrice = state.items.reduce(
          (total, item) => item.price * item.quantity + total,
          0
        );
      } else {
        let isExist = false;
        state.items.map((item) => {
          if (
            item.productId === action.payload.productId &&
            item.color === action.payload.color &&
            item?.size == action.payload.size
          ) {
            item.quantity += 1;
            isExist = true;
            state.totalPrice = state.items.reduce(
              (total, item) => item.price * item.quantity + total,
              0
            );
            return item;
          }
        });
        if (!isExist) {
          state.items.push({ ...action.payload, quantity: 1 });
          state.itemsCount++;
          state.totalPrice = state.items.reduce(
            (total, item) => item.price * item.quantity + total,
            0
          );
        }
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      state.itemsCount--;
    },
    decreaseItemQuantity(state, action) {
      console.log(action.payload);
      let itemIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      console.log(itemIndex);
      if (state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity -= 1;
        state.totalPrice = state.items.reduce(
          (total, item) => item.price * item.quantity + total,
          0
        );
      } else {
        state.items = state.items.filter(
          (item) => item != state.items[itemIndex]
        );
        state.itemsCount--;
        state.totalPrice = state.items.reduce(
          (total, item) => item.price * item.quantity + total,
          0
        );
      }
    },
    setCartItems(state, action) {
      state.items = action.payload;
      state.itemsCount = action.payload.length;
      state.totalPrice = state.items.reduce(
        (total, item) => item.price * item.quantity + total,
        0
      );
    },
    resetCart: () => initialState,
  },
  extraReducers: {
    [getUserCartItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.itemsCount = action.payload.length;
      state.totalPrice = state.items.reduce(
        (total, item) => item.price * item.quantity + total,
        0
      );
      state.status = "idle";
    },
    [getUserCartItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [syncCartToDb.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.itemsCount = action.payload.length;
      state.totalPrice = state.items.reduce(
        (total, item) => item.price * item.quantity + total,
        0
      );
      state.status = "idle";
    },
    [syncCartToDb.pending]: (state, action) => {
      state.status = "loading";
    },
    [addItemToDbCart.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.itemsCount = action.payload.length;
      state.totalPrice = state.items.reduce(
        (total, item) => item.price * item.quantity + total,
        0
      );
      state.status = "idle";
    },
    [addItemToDbCart.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeItemFromDbCart.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.itemsCount = action.payload.length;
      state.totalPrice = state.items.reduce(
        (total, item) => item.price * item.quantity + total,
        0
      );
      state.status = "idle";
    },
    [removeItemFromDbCart.pending]: (state, action) => {
      state.status = "loading";
    },
  },
});
export const {
  addItem,
  removeItem,
  decreaseItemQuantity,
  setCartItems,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
