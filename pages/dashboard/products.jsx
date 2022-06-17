import React, { useState, useEffect, useContext } from "react";

import styled from "styled-components";
import Head from "next/head";
import { Button, Backdrop, Fade, Modal, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "cookies";

import AdminLayout from "components/layouts/AdminLayout";
import ProductsComponent from "components/admin-dashboard/products";
import AddProduct from "components/admin-dashboard/products/dialogs/AddProduct";
import ProductContext from "context/ProductContext";
import ProductsContext from "context/ProductsContext";
import { productsContext } from "context/products-context";
import { getProducts, addNewProduct } from "redux/slices/products";
import LoadingSpinner from "components/shared/LoadingSpinner";
import { decodeToken } from "utils/token-helper";

const Wraper = styled.div`
  width: 100%;
  height: 100%;
  .new-product-wraper {
    background-color: ${({ theme }) => theme.palette.secondary.main};
  }
  @media (max-width: 576px) {
    .new-product-wraper {
      margin-top: 3rem;
    }
  }
`;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%) !important",
  bgcolor: "background.default",
  border: "none",
  boxShadow: 0,
  px: 4,
};

const Products = (props) => {
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const { page, setPage, sortBy } = useContext(productsContext);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);

  const handleOpen = () => setAddProductModalOpen(true);
  const handleClose = () => setAddProductModalOpen(false);

  const handleAddProduct = (formData) => {
    dispatch(addNewProduct(formData));
    setAddProductModalOpen(false);
  };

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
      <div className="new-product-wraper container-lg py-2">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleOpen}
          endIcon={<AddIcon />}
        >
          محصول جدید
        </Button>
      </div>
      <ProductsComponent
        {...props}
        products={products}
        itemsPerPage={10}
        totalItems={products.count}
        pageRange={10}
        handleChangePage={handleChangePage}
      />
      <Modal
        disable
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={addProductModalOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addProductModalOpen}>
          <Box sx={modalStyle} className="col-12 col-sm-8 col-md-7 col-lg-5">
            <ProductContext>
              <AddProduct onCancel={handleClose} onSave={handleAddProduct} />
            </ProductContext>
          </Box>
        </Fade>
      </Modal>
    </Wraper>
  );
};

export async function getServerSideProps(ctx) {
  const cookies = new Cookies(ctx.req, ctx.res);
  const authorization = cookies.get("authorization");

  if (!authorization) {
    return {
      redirect: {
        destination: `/login?returnUrl=${ctx.resolvedUrl}&forceLogout=true`,
        permanent: false,
      },
    };
  }

  const { user } = decodeToken(authorization);

  if (!user.isAdmin) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

Products.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <ProductsContext>{page}</ProductsContext>
    </AdminLayout>
  );
};

export default Products;
