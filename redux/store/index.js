import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import products from "redux/slices/products";
import product from "redux/slices/product";
import cart from "redux/slices/cart";
import user from "redux/slices/user";
import analytics from "redux/slices/analytics";
import categories from "redux/slices/categories";
import { loadState } from "utils/browser-storage";
import { getCategories } from "redux/slices/categories";

const reducer = combineReducers({
  products,
  product,
  analytics,
  cart,
  user,
  categories,
});

const store = configureStore({
  reducer,
  devTools: true,
  preloadedState: { cart: loadState() },
});

store.dispatch(getCategories());

export default store;
