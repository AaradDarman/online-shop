import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import products from "../slices/products";
import analytics from "../slices/analytics";

const reducer = combineReducers({
  products,
  analytics,
});

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
