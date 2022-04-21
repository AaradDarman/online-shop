import React, { useState } from "react";

import { styled as MuiStyled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { productsContext } from "./products-context";
import ProductContext from "./ProductContext";
import EditProduct from "../components/admin-dashboard/EditProduct";
import { deleteProduct, editProduct } from "../redux/slices/products";

const CancelButton = MuiStyled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.text.secondary}`,
  "&:hover": {
    borderColor: "initial",
    backgroundColor: "initial",
  },
}));

const DeleteDialog = MuiStyled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: "none",
  },
  "& .MuiTypography-root": {
    color: theme.palette.text.primary,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    justifyContent: "flex-start",
  },
  ".product-name": {
    color: theme.palette.error.main,
  },
}));

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

const ProductsContext = ({ children }) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [deleteProductTarget, setDeleteProductTarget] = useState();
  const [editProductTarget, setEditProductTarget] = useState();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleShowDeleteDialog = (id) => {
    setDeleteProductTarget(id);
    setIsDeleteDialogOpen(true);
  };

  const handleShowEditModal = (product) => {
    setEditProductTarget(product);
    setIsEditProductModalOpen(true);
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(deleteProductTarget._id));
    setIsDeleteDialogOpen(false);
  };

  const handleEditProduct = async (editedProduct) => {
    dispatch(editProduct(editedProduct));
    setIsEditProductModalOpen(false);
  };

  return (
    <productsContext.Provider
      value={{
        page,
        setPage,
        sortBy,
        setSortBy,
        handleShowDeleteDialog,
        handleShowEditModal,
      }}
    >
      <>
        <DeleteDialog
          onClose={() => setIsDeleteDialogOpen(false)}
          open={isDeleteDialogOpen}
        >
          <DialogTitle>
            <>
              از حذف محصول
              <span className="product-name px-1">{` ${deleteProductTarget?.name} `}</span>
              مطمئن هستید؟
            </>
          </DialogTitle>
          <DialogActions>
            <CancelButton
              size="small"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              لغو
            </CancelButton>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleDeleteProduct}
            >
              حذف
            </Button>
          </DialogActions>
        </DeleteDialog>
        <Modal
          disable
          aria-labelledby="edit-product-modal-title"
          aria-describedby="edit-product-modal-description"
          open={isEditProductModalOpen}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isEditProductModalOpen}>
            <Box sx={modalStyle} className="col-12 col-sm-8 col-md-7 col-lg-5">
              <ProductContext>
                <EditProduct
                  onCancel={() => setIsEditProductModalOpen(false)}
                  onEdit={handleEditProduct}
                  product={editProductTarget}
                />
              </ProductContext>
            </Box>
          </Fade>
        </Modal>
        {children}
      </>
    </productsContext.Provider>
  );
};

export default ProductsContext;
