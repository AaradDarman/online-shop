import React, { useState } from "react";

import { productContext } from "./product-context";

const ProductContext = ({ children }) => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productSizes, setProductSizes] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productInventory, setProductInventory] = useState([]);

  return (
    <productContext.Provider
      value={{
        productName,
        setProductName,
        productCategory,
        setProductCategory,
        productDescription,
        setProductDescription,
        productSizes,
        setProductSizes,
        productColors,
        setProductColors,
        productImages,
        setProductImages,
        productInventory,
        setProductInventory,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductContext;
