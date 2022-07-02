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
import { useRouter } from "next/router";
import axios from "axios";
import Products from "components/home/Products";

const Wraper = styled.article`
  direction: "rtl";
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Category = ({ products, productsCount, categoryHierarchy }) => {
  const router = useRouter();
  const { isMd } = useBreakpoints();

  const generateCategoryHierarchy = () => {
    if (categoryHierarchy.length) {
      if (categoryHierarchy.length === 1) {
        return `پوشاک ${categoryHierarchy[0].name} | `;
      } else {
        return `${categoryHierarchy[0].name} ${
          categoryHierarchy[categoryHierarchy.length - 1].name
        } | `;
      }
    } else {
      return "دسته بندی | ";
    }
  };

  return (
    <Wraper isMd={isMd}>
      <Head>
        <title>{`${generateCategoryHierarchy()}${router.query.title}`}</title>
      </Head>
      <Products
        products={products}
        itemsPerPage={12}
        totalItems={productsCount}
      />
    </Wraper>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await api.getProductsByCategory(
    ctx.query.category,
    ctx.query.page ?? 1,
    ctx.query.sortBy ?? "newest"
  );

  return {
    props: {
      products: data?.products,
      productsCount: data?.productsCount,
      categoryHierarchy: data?.categoryHierarchy,
    },
  };
}

Category.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Category;
