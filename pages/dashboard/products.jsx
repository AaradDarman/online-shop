import React, { useState, useEffect, useContext } from "react";

import styled from "styled-components";
import Head from "next/head";
import { Button, Backdrop, Fade, Modal, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "../../components/layouts/AdminLayout";
import ProductsComponent from "../../components/Products";
import AddProduct from "../../components/admin-dashboard/AddProduct";
import ProductContext from "../../context/ProductContext";
import ProductsContext from "../../context/ProductsContext";
import { productsContext } from "../../context/products-context";
import { getProducts, addNewProduct } from "../../redux/slices/products";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const Wraper = styled.div`
  width: 100%;
  height: 100%;
`;

const Products = (props) => {
  const { page, setPage, sortBy } = useContext(productsContext);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);


  const handleChangePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(getProducts({ page, sortBy }));
    // eslint-disable-next-line
  }, [page, sortBy]);

  return (
    <Wraper>
      <Head>
        <title>داشبورد | محصولات</title>
      </Head>
      <LoadingSpinner
        show={
          products?.status === "creating" ||
          products?.status === "editing" ||
          products?.status === "deleting"
        }
      />
      <ProductsComponent
        {...props}
        products={products}
        itemsPerPage={10}
        totalItems={products.count}
        pageRange={10}
        handleChangePage={handleChangePage}
      />
    </Wraper>
  );
};

Products.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <ProductsContext>{page}</ProductsContext>
    </AdminLayout>
  );
};

export default Products;
