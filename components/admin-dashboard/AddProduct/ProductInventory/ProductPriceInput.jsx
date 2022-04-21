import React from "react";

import { Input } from "@mui/material";
import { styled as MuiStyled } from "@mui/material/styles";

import NumberFormat from "react-number-format";

const StyledInput = MuiStyled(Input)(({ theme }) => ({
  maxWidth: "70px",
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
    textAlign: "center",
  },
}));

const ProductPriceInput = ({ onChange, value }) => {
  const handlePriceChange = (vals) => {
    onChange(vals.floatValue);
  };

  return (
    <NumberFormat
      customInput={StyledInput}
      variant="standard"
      isNumericString={true}
      thousandSeparator={true}
      value={value}
      decimalScale={2}
      onValueChange={(vals) => handlePriceChange(vals)}
    />
  );
};

export default React.memo(ProductPriceInput);
