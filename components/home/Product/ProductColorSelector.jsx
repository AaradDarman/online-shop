import React from "react";

import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Image from "next/image";

const ImageRadio = ({ image, index, ...otherProps }) => {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={
        <Image
          alt={`product-img-${index}`}
          width={50}
          height={50}
          src={image}
        />
      }
      icon={
        <Image
          alt={`product-img-${index}`}
          width={50}
          height={50}
          src={image}
        />
      }
      {...otherProps}
    />
  );
};

const ProductColorSelector = ({ images, selectedColor, onChange }) => {
  return (
    <>
      <RadioGroup
        aria-labelledby="color-radio-buttons-group"
        defaultValue={selectedColor}
        name="color-radio-buttons-group"
        row
        value={selectedColor}
        onChange={(event) => onChange(event.target.value)}
      >
        {images.map((img) => (
          <FormControlLabel
            key={img.color}
            value={img.color}
            control={<ImageRadio image={img.imgSrc[0]} />}
            label={img.color}
            labelPlacement="bottom"
          />
        ))}
      </RadioGroup>
    </>
  );
};

export default ProductColorSelector;
