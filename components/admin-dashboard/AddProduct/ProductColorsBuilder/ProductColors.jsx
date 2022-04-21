import React from "react";

import { Chip } from "@mui/material";
import styled from "styled-components";

const Wraper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ProductColors = ({ colors, onDelete }) => {
  return (
    <Wraper className="product-colors">
      {colors.map((color) => (
        <Chip
          key={color}
          className="mx-1"
          label={color}
          variant="outlined"
          onDelete={() => onDelete(color)}
        />
      ))}
    </Wraper>
  );
};

export default ProductColors;
