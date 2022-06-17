import React from "react";

import { Radio, RadioGroup } from "@mui/material";

const SizeRadio = ({ size, ...otherProps }) => {
  return (
    <Radio
      sx={{
        "&": {
          width: "34px",
          height: "34px",
          padding: "4px",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<div>{size}</div>}
      icon={<div>{size}</div>}
      {...otherProps}
    />
  );
};

const ProductSizeSelector = ({ sizes, selectedSize, onChange }) => {
  return (
    <RadioGroup
      aria-labelledby="size-radio-buttons-group"
      defaultValue={selectedSize}
      name="size-radio-buttons-group"
      row
      value={selectedSize}
      onChange={onChange}
    >
      {sizes.map((size) => (
        <SizeRadio
          className="text-uppercase"
          key={size}
          value={size}
          size={size}
        />
      ))}
    </RadioGroup>
  );
};

export default ProductSizeSelector;
