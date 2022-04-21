import { createContext } from "react";

export const productContext = createContext({
  productName: "",
  setProductName: () => {},
  productCategory: "",
  setProductCategory: () => {},
  productDescription: "",
  setProductDescription: () => {},
  productSizes: [],
  setProductSizes: () => {},
  productColors: [],
  setProductColors: () => {},
  productImages: [],
  setProductImages: () => {},
  productInventory: [],
  setProductInventory: () => {},
});
