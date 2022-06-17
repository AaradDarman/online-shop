import React, { useState, useEffect, useContext, useRef } from "react";

import {
  Button,
  Stack,
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormHelperText,
} from "@mui/material";
import styled from "styled-components";
import { styled as MuiStyled } from "@mui/material/styles";
import produce from "immer";
import { Formik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import Image from "next/image";

import ProductPriceInput from "../AddProduct/ProductInventory/ProductPriceInput";
import { productContext } from "context/product-context";

const Wraper = styled.div`
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  padding: 5px;
  margin: 10px 0;
`;

const CancelButton = MuiStyled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderColor: theme.palette.text.secondary,
  "&:hover": {
    borderColor: "initial",
    backgroundColor: "initial",
  },
}));

const StyledTableRow = MuiStyled(TableRow)(({ theme }) => ({
  "&": {
    backgroundColor: theme.palette.background.default,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.secondary.light,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td": {
    textAlign: "center",
  },
  "& td:first-child": {
    textTransform: "uppercase",
    position: "relative",
    fontFamily: "sans-serif",
  },
}));

const StyledTextField = MuiStyled(TextField)(({ theme }) => ({
  maxWidth: "50px",
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
    textAlign: "center",
  },
}));

const DeleteButton = MuiStyled(IconButton)(({ theme }) => ({
  "&": {
    position: "absolute",
    left: "5px",
    top: "50%",
    transform: "translateY(-50%)",
  },
}));

const ProductColor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 4px;
  }
`;

const EditProduct = ({ onEdit, onCancel, product }) => {
  const {
    productInventory,
    setProductInventory,
    productName,
    setProductName,
    productDescription,
    setProductDescription,
  } = useContext(productContext);

  const formikRef = useRef();

  useEffect(() => {
    setProductInventory([...product.inventory]);
    setProductName(product.name);
    setProductDescription(product.description);
    if (formikRef.current) {
      formikRef.current.setFieldValue("productName", product.name);
      formikRef.current.setFieldValue(
        "productDescription",
        product.description
      );
      formikRef.current.setFieldValue("productInventory", product.inventory);
    }
    // eslint-disable-next-line
  }, []);

  const EditProductSchema = Yup.object().shape({
    productName: Yup.string()
      .min(3, "عنوان وارد شده باید بیشتر از 3 حرف باشد")
      .max(90, "عنوان وارد شده نباید بیشتر از 90 حرف باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
    productDescription: Yup.string()
      .min(3, "زیر عنوان وارد شده باید بیشتر از 3 حرف باشد")
      .max(900, "زیر عنوان وارد شده نباید بیشتر از 90 حرف باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
    productInventory: Yup.array().test(
      "Inventory",
      "لطفا فرم را با دقت پر کنید",
      (value) => {
        return (
          !_.isEmpty(value) &&
          value.length ===
            value.map((obj) => obj.quantity).filter(Number).length &&
          value.length === value.map((obj) => obj.price).filter(Number).length
        );
      }
    ),
  });

  const handleInventoryChange = (quantity, tItem) => {
    const nextState = produce(productInventory, (cloneProductInventory) => {
      let targetItemIndex = cloneProductInventory.findIndex(
        (item) => item.size === tItem.size && item.color === tItem.color
      );
      let targetItem = cloneProductInventory[targetItemIndex];
      targetItem.quantity = +quantity;
      cloneProductInventory[targetItemIndex] = targetItem;
    });
    setProductInventory(nextState);
    formikRef.current.setFieldValue("productInventory", nextState);
  };

  const handlePriceChange = (price, tItem) => {
    const nextState = produce(productInventory, (cloneProductInventory) => {
      let targetItemIndex = cloneProductInventory.findIndex(
        (item) => item.size === tItem.size && item.color === tItem.color
      );
      let targetItem = cloneProductInventory[targetItemIndex];
      targetItem.price = +price;
      cloneProductInventory[targetItemIndex] = targetItem;
    });
    setProductInventory(nextState);
    formikRef.current.setFieldValue("productInventory", nextState);
  };

  const handleEditProduct = () => {
    onEdit({
      _id: product._id,
      inventory: productInventory,
      name: productName,
      description: productDescription,
    });
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        productName,
        productDescription,
        productInventory,
      }}
      enableReinitialize={false}
      validationSchema={EditProductSchema}
      onSubmit={handleEditProduct}
    >
      {({
        values,
        handleBlur,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
      }) => (
        <Wraper>
          <TextField
            variant="outlined"
            label="نام محصول"
            size="small"
            margin="dense"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
              setFieldValue("productName", e.target.value);
            }}
            onBlur={handleBlur("productName")}
            error={errors.productName && touched.productName}
            helperText={
              errors.productName && touched.productName
                ? errors.productName
                : ""
            }
          />
          <TextField
            variant="outlined"
            label="توضیحات"
            multiline
            minRows={3}
            maxRows={3}
            margin="dense"
            value={productDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
              setFieldValue("productDescription", e.target.value);
            }}
            onBlur={handleBlur("productDescription")}
            error={errors.productDescription && touched.productDescription}
            helperText={
              errors.productDescription && touched.productDescription
                ? errors.productDescription
                : ""
            }
          />
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 300 }}
              aria-label="product inventory table"
              size="small"
            >
              <TableHead>
                <TableRow sx={{ "& th": { textAlign: "center" } }}>
                  {/* <TableCell></TableCell> */}
                  <TableCell>سایز</TableCell>
                  <TableCell>رنگ</TableCell>
                  <TableCell>موجودی</TableCell>
                  <TableCell>قیمت(تومان)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productInventory.map((item) => (
                  <StyledTableRow
                    key={`${item.size}${item.color}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{item.size}</TableCell>
                    <TableCell>
                      <ProductColor>
                        <Image
                          src={
                            product.images.find(
                              (image) => image.color === item.color
                            )?.imgSrc[0]
                          }
                          alt="product-pic"
                          width={30}
                          height={30}
                        />
                        <span>{item.color}</span>
                      </ProductColor>
                    </TableCell>
                    <TableCell>
                      <StyledTextField
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 1,
                          },
                        }}
                        variant="standard"
                        onChange={(e) =>
                          handleInventoryChange(e.target.value, item)
                        }
                        value={item?.quantity}
                      />
                    </TableCell>
                    <TableCell>
                      <ProductPriceInput
                        onChange={(price) => handlePriceChange(price, item)}
                        value={item?.price}
                      />
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <FormHelperText
            sx={{ marginRight: "14px", marginLeft: "14px" }}
            error={errors.productInventory && touched.productInventory}
            id="inventory-error"
          >
            {errors.productInventory && touched.productInventory
              ? errors.productInventory
              : ""}
          </FormHelperText>
          <Stack spacing={1} direction="row" className="mt-3">
            <CancelButton
              variant="outlined"
              color="primary"
              size="small"
              onClick={onCancel}
            >
              لغو
            </CancelButton>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="small"
            >
              اعمال تغییرات
            </Button>
          </Stack>
        </Wraper>
      )}
    </Formik>
  );
};

export default EditProduct;
