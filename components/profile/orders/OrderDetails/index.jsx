import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Typography } from "@mui/material";
import Image from "next/image";

import { numberWithCommas } from "utils/number-helper";
import api from "adapters/adapter";

const StyledWraper = styled.div`
  display: flex;
  align-items: stretch;
  padding: 0.8rem;
  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.palette.grey[800]};
  }
  .image-wraper {
    position: relative;
  }
  .item-quantity {
    position: absolute;
    bottom: 15px;
    left: 10px;
    min-width: 20px;
    height: 20px;
    line-height: 1.2;
    font-size: 1rem;
    text-align: center;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.secondary.light};
  }
  .item-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
  }
`;

const OrderDetails = ({ item }) => {
  const [product, setProduct] = useState(item);
  const [isLoading, setIsLoading] = useState(true);

  const getProduct = async () => {
    try {
      const { status, data } = await api.getProduct(item?.productId);
      if (status === 200) {
        setProduct(data.product);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      return e;
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledWraper className="order-item" key={item.productId}>
      {!isLoading && (
        <div className="image-wraper">
          <Image
            src={product.images[0].imgSrc[0]}
            alt="product-image"
            width={200}
            height={200}
          />
          <div className="item-quantity">{item.quantity}</div>
        </div>
      )}
      <div className="item-info">
        <Typography gutterBottom variant="h5" component="h2">
          {item?.name}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          {item?.size}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          {item?.color}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          {`${numberWithCommas(item?.price)} تومان`}
        </Typography>
      </div>
    </StyledWraper>
  );
};

export default OrderDetails;
