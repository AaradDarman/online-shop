import React from "react";

import {
  ToggleButton,
  ToggleButtonGroup,
  FormLabel,
  FormGroup,
} from "@mui/material";
import styled from "styled-components";

const Wraper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: "sans-serif";
`;

const ProductSizes = ({ sizes, onChange }) => {
  return (
    <Wraper className="product-sizes">
      <FormGroup>
        <FormLabel component="legend">سایز</FormLabel>
        <ToggleButtonGroup
          className="my-1"
          value={sizes}
          onChange={onChange}
          color="primary"
        >
          <ToggleButton value="s" aria-label="s">
            S
          </ToggleButton>
          <ToggleButton value="m" aria-label="m">
            M
          </ToggleButton>
          <ToggleButton value="l" aria-label="l">
            L
          </ToggleButton>
          <ToggleButton value="xl" aria-label="xl">
            XL
          </ToggleButton>
          <ToggleButton value="2xl" aria-label="2xl">
            2XL
          </ToggleButton>
          <ToggleButton value="3xl" aria-label="3xl">
            3XL
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          className="my-1"
          value={sizes}
          onChange={onChange}
          color="primary"
        >
          <ToggleButton value="28" aria-label="28">
            28
          </ToggleButton>
          <ToggleButton value="29" aria-label="29">
            29
          </ToggleButton>
          <ToggleButton value="30" aria-label="30">
            30
          </ToggleButton>
          <ToggleButton value="31" aria-label="31">
            31
          </ToggleButton>
          <ToggleButton value="32" aria-label="32">
            32
          </ToggleButton>
          <ToggleButton value="33" aria-label="33">
            33
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          className="my-1"
          value={sizes}
          onChange={onChange}
          color="primary"
        >
          <ToggleButton value="34" aria-label="34">
            34
          </ToggleButton>
          <ToggleButton value="36" aria-label="36">
            36
          </ToggleButton>
          <ToggleButton value="38" aria-label="38">
            38
          </ToggleButton>
          <ToggleButton value="40" aria-label="40">
            40
          </ToggleButton>
          <ToggleButton value="42" aria-label="42">
            42
          </ToggleButton>
          <ToggleButton value="44" aria-label="44">
            44
          </ToggleButton>
        </ToggleButtonGroup>
      </FormGroup>
    </Wraper>
  );
};

export default ProductSizes;
