import React, { useState } from "react";

import styled, { css } from "styled-components";
import _ from "lodash";
import { FormControl, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  addItemToDbCart,
  decreaseItemQuantity,
  removeItemFromDbCart,
} from "redux/slices/cart";
import api from "adapters/adapter";
import ProductImage from "components/home/Product/ProductImage";
import { numberWithCommas } from "utils/number-helper";
import ProductColorSelector from "components/home/Product/ProductColorSelector";
import ProductSizeSelector from "components/home/Product/ProductSizeSelector";
import useBreakpoints from "utils/useBreakPoints";
import MainLayout from "components/layouts/MainLayout";

const Wraper = styled.article`
  display: flex;
  justify-content: center;
  height: ${({ isMd }) => isMd && "calc(100vh - 58px)"};

  .product-info {
    padding-bottom: ${({ isMd }) => !isMd && "60px"};
  }
  .Mui-checked {
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 0.5rem;
  }
`;

const mobileStyle = css`
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0px;
  min-height: 50px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
`;

const StyledActionsWraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ isMd }) => !isMd && mobileStyle}
`;

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => state);
  const { isMd } = useBreakpoints();

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes ? product?.sizes[0] : ""
  );
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedImage, setSelectedImage] = useState(product.images[0].imgSrc);

  const cartItem = cart.items.find(
    (item) =>
      item.productId === product._id &&
      item.color === selectedColor &&
      item?.size == selectedSize
  );

  const handleChangeSelectedColor = (color) => {
    setSelectedColor(color);
    setSelectedImage(
      product.images.find((image) => image.color === color).imgSrc
    );
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const getPrice = () => {
    if (product.sizes.length) {
      return product.inventory.find(
        (inv) => inv.color === selectedColor && inv.size === selectedSize
      ).price;
    } else {
      return product.inventory.find((inv) => inv.color === selectedColor).price;
    }
  };

  const handleAddItemToCart = () => {
    let cloneProduct = {
      productId: product._id,
      name: product.name,
      size: selectedSize,
      color: selectedColor,
      price: getPrice(),
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
      productId: product._id,
      size: selectedSize,
      color: selectedColor,
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
    <Wraper isMd={isMd}>
      <Head>
        <title>{`محصول | ${product.name}`}</title>
      </Head>
      <FormControl className="flex-column flex-md-row align-items-center px-3">
        <ProductImage images={selectedImage} />
        <div className="product-info d-flex flex-column h-100 justify-content-around">
          <Typography gutterBottom variant="h5" component="h2">
            {product?.name}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {`${numberWithCommas(getPrice())} تومان`}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {`رنگ: ${selectedColor}`}
          </Typography>
          <ProductColorSelector
            images={product.images}
            selectedColor={selectedColor}
            onChange={handleChangeSelectedColor}
          />
          <Typography gutterBottom variant="h6" component="div">
            سایز:
          </Typography>
          <ProductSizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onChange={handleSizeChange}
          />
          <StyledActionsWraper isMd={isMd}>
            {cartItem ? (
              <>
                <div>
                  <IconButton onClick={handleAddItemToCart}>
                    <AddIcon />
                  </IconButton>
                  {cartItem.quantity}
                  <IconButton onClick={handleRemoveItemFromCart}>
                    <RemoveIcon />
                  </IconButton>
                </div>
                <Typography gutterBottom variant="body1" component="div">
                  {`${numberWithCommas(getPrice() * cartItem.quantity)} تومان`}
                </Typography>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddItemToCart}
                endIcon={<AddIcon />}
                className="w-100"
              >
                افزودن به سبد
              </Button>
            )}
          </StyledActionsWraper>
        </div>
      </FormControl>
    </Wraper>
  );
};

export const getStaticPaths = async () => {
  try {
    const { status, data } = await api.getProducts({
      page: 1,
      sortBy: "createAt",
    });
    if (status === 200) {
      const paths = data.products.map((product) => ({
        params: {
          id: product._id,
        },
      }));

      return { paths, fallback: true };
    }
  } catch (e) {
    return e;
  }
};

export const getStaticProps = async ({ params }) => {
  try {
    const { status, data } = await api.getProduct(params?.id);
    return {
      props: {
        product: data?.product,
      },
      revalidate: 120,
    };
  } catch (e) {
    return e;
  }
};

Product.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Product;
