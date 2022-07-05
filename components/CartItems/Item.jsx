import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { IconButton, Typography } from "@mui/material";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";

import { numberWithCommas } from "utils/number-helper";
import api from "adapters/adapter";
import Icon from "components/shared/Icon";
import {
  addItem,
  addItemToDbCart,
  decreaseItemQuantity,
  removeItemFromDbCart,
} from "redux/slices/cart";
import { shimmer, toBase64 } from "utils/image-helper";

const StyledWraper = styled.div`
  display: flex;
  align-items: stretch;
  padding: 0.8rem;
  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.palette.grey[800]};
  }
  .actions-wraper {
    border: 1px solid ${({ theme }) => theme.palette.grey[800]};
    border-radius: 4px;
  }
  .item-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
  }
  .loader-shimmer {
    border-radius: 0.5rem;
    margin-left: 5px;
  }
`;

const Item = ({ item }) => {
  const [product, setProduct] = useState(item);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

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

  const handleAddItemToCart = () => {
    let cloneProduct = {
      productId: item?._id,
      name: item?.name,
      size: item?.size,
      color: item?.color,
      price: item?.price,
      quantity: 1,
    };
    if (_.isEmpty(user.user)) {
      dispatch(addItem(cloneProduct));
    } else {
      dispatch(addItemToDbCart({ item: cloneProduct, userId: user.user._id }));
    }
  };

  const handleRemoveItemFromCart = () => {
    let cloneProduct = {
      productId: product?._id,
      size: item?.size,
      color: item?.color,
      quantity: 1,
    };
    if (_.isEmpty(user.user)) {
      dispatch(decreaseItemQuantity(cloneProduct));
    } else {
      dispatch(
        removeItemFromDbCart({ item: cloneProduct, userId: user.user._id })
      );
    }
  };

  return (
    <StyledWraper className="item" key={item.productId}>
      {!isLoading ? (
        <Image
          src={product.images[0].imgSrc[0]}
          alt="product-image"
          width={200}
          height={200}
        />
      ) : (
        <img
          className="loader-shimmer"
          src={`data:image/svg+xml;base64,${toBase64(shimmer(200, 200))}`}
        />
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
        <div className="actions-wraper">
          <IconButton onClick={handleAddItemToCart}>
            <AddIcon />
          </IconButton>
          {item.quantity}
          <IconButton onClick={handleRemoveItemFromCart}>
            {item.quantity > 1 ? (
              <RemoveIcon />
            ) : (
              <Icon icon="delete" size={19} />
            )}
          </IconButton>
        </div>
      </div>
    </StyledWraper>
  );
};

export default Item;
