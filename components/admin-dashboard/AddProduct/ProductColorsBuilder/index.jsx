import React, { useState } from "react";

import styled from "styled-components";
import { rgba } from "polished";
import {
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { AddBox } from "@mui/icons-material";

import ProductColors from "./ProductColors";

const Wraper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 4px;
  #icon-button-file {
    display: none;
  }
  .img-input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: 2px dashed ${({ theme }) => rgba(theme.palette.text.primary, 0.23)};
    border-radius: 4px;
    margin: 0 1rem;
    cursor: pointer;
  }
  .product-pic {
    width: 100%;
    height: 100%;
  }
`;

const ProductColorBuilder = ({ colors, onChange, error, helperText }) => {
  const [colorName, setColorName] = useState("");

  const handleAddColor = () => {
    if (colorName !== "") {
      onChange([...colors, colorName]);
      setColorName("");
    }
  };

  const handleDeleteColor = (selectedColor) => {
    onChange(colors.filter((color) => color != selectedColor));
  };

  return (
    <Wraper>
      <FormControl variant="outlined" size="small">
        <InputLabel error={error} htmlFor="color-input">
          رنگ
        </InputLabel>
        <OutlinedInput
          id="color-input"
          type="text"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value != "") {
              e.preventDefault();
              handleAddColor();
            }
          }}
          error={error}
          endAdornment={
            <InputAdornment position="end">
              <IconButton color="primary" onClick={handleAddColor} edge="end">
                <AddBox />
              </IconButton>
            </InputAdornment>
          }
          label="رنگ"
        />
        <FormHelperText error={error} id="color-error">
          {helperText}
        </FormHelperText>
      </FormControl>
      <ProductColors colors={colors} onDelete={handleDeleteColor} />
    </Wraper>
  );
};

export default ProductColorBuilder;
