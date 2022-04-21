import React, { useState, useEffect } from "react";

import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Image from "next/image";

import { numberWithoutCommas } from "../utils/number-helper";
import {
  getMinPrice,
  applyDiscount,
  getDiscountsRange,
} from "../utils/product-helper";

const Wraper = styled.div`
  position: relative;
  z-index: 1;
  .admin-btns-wraper {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }
  .discount-badge {
    position: absolute;
    top: 0;
    left: 10px;
    background-color: ${({ theme }) => theme.palette.error.main};
    border-bottom-right-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
    padding: 0 3px;
    padding-bottom: 4px;
    color: #fff;
    z-index: 1;
  }
  .img-wraper {
    position: relative;
  }
  .img-wraper:hover .product-colors {
    display: flex;
  }
  .product-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap-reverse;
  }
  .og-price {
    text-decoration: line-through;
    color: ${({ theme }) => theme.palette.error.main};
  }
  .product-sizes {
    display: flex;
    span {
      width: 27px;
      height: 27px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 2px;
      padding: 3px;
      border: 1px solid ${({ theme }) => theme.palette.text.secondary};
      color: ${({ theme }) => theme.palette.text.secondary};
      font-family: sans-serif;
      font-size: 0.9rem;
      box-sizing: content-box;
      text-transform: uppercase;
    }
  }
`;

const ProductColors = styled.div`
  display: none;
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  img {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.secondary.light};
    margin: 0 1px !important;
  }
`;

const Product = ({ product, children }) => {
  const [imageHovered, setImageHovered] = useState(false);

  const mouseHover = () => {
    setImageHovered(true);
  };
  const mouseOut = () => {
    setImageHovered(false);
  };

  useEffect(() => {
    let imgWraper = document.getElementById(`img-wraper${product.name}`);

    imgWraper.addEventListener("mouseover", mouseHover);

    imgWraper.addEventListener("mouseout", mouseOut);

    return () => {
      imgWraper.removeEventListener("mouseover", mouseHover);
      imgWraper.removeEventListener("mouseout", mouseOut);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Wraper>
      <Card
        sx={{
          bgcolor: "secondary.light",
          backgroundImage: "none",
          position: "relative",
        }}
      >
        <>
          {children}
          {product?.discounts?.length && (
            <div className="discount-badge">
              {getDiscountsRange(product?.discounts)}
            </div>
          )}
        </>
        <CardActionArea>
          <div className="img-wraper" id={`img-wraper${product.name}`}>
            <CardMedia
              sx={{ minHeight: "427px" }}
              component="img"
              image={
                imageHovered
                  ? product.images[0]?.imgSrc.length > 1
                    ? product.images[0]?.imgSrc[1]
                    : product.images[0]?.imgSrc[0]
                  : product.images[0].imgSrc[0]
              }
              alt="green iguana"
            />
            <ProductColors className="product-colors">
              {product.images.slice(1).map((img) => (
                <Image
                  src={img.imgSrc[0]}
                  key={`${product.name}-${img.color}`}
                  alt={`${product.name}-${img.color}`}
                  width={50}
                  height={50}
                />
              ))}
            </ProductColors>
          </div>
          <CardContent
            sx={{
              bgcolor: "secondary.light",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography gutterBottom variant="h6" component="div">
              {product?.name}
            </Typography>
            <div className="product-info">
              <div className="product-sizes">
                {product?.sizes.map((size) => (
                  <span key={size}>{size}</span>
                ))}
              </div>
              <div className="d-flex flex-column">
                {product?.discounts?.length ? (
                  <>
                    <span className="og-price">
                      {numberWithoutCommas(
                        product.inventory
                          .find((p) => p.size === product.discounts[0].size)
                          .price.toString()
                      )}
                    </span>
                    <span className="dc-price">
                      {`${numberWithoutCommas(
                        applyDiscount(
                          product.discounts[0].discount,
                          product.inventory.find(
                            (p) => p.size === product.discounts[0].size
                          ).price
                        ).toString()
                      )} `}
                      تومان
                    </span>
                  </>
                ) : (
                  <span className="dc-price">
                    {`${numberWithoutCommas(
                      getMinPrice(product.inventory).toString()
                    )} `}
                    تومان
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Wraper>
  );
};

export default Product;
