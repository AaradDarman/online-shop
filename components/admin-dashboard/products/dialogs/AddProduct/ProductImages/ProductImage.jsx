import React from "react";

import styled from "styled-components";
import { lighten } from "polished";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import Image from "next/image";

const Wraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) =>
    lighten(0.2, theme.palette.secondary.main)};
  font-size: 0.8rem;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  text-align: center;
  margin-right: 4px;
  margin-bottom: 4px;

  img {
    border-radius: 5px;
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #141921;
    opacity: 0;
    transition: inherit;
  }

  :hover .overlay {
    opacity: 0.3;
  }

  .delete-btn {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  :hover .delete-btn {
    display: inline-flex;
  }
`;

const ProductImage = ({ image, onDelete }) => {
  return (
    <Wraper className="product-image">
      <Image
        src={URL.createObjectURL(image)}
        alt="product-pic"
        width={40}
        height={40}
      />
      <div className="overlay"></div>
      <IconButton
        color="error"
        aria-label="delete color"
        className="delete-btn"
        onClick={onDelete}
      >
        <DeleteForeverIcon />
      </IconButton>
    </Wraper>
  );
};

export default ProductImage;
