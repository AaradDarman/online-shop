import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import products from "../slices/products";

const reducer = combineReducers({
  products,
});

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
