import React, { useState, useEffect, useContext } from "react";

import {
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Stack,
  Divider,
} from "@mui/material";
import styled from "styled-components";
import { styled as MuiStyled } from "@mui/material/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { useDispatch } from "react-redux";

import ProductColorsBuilder from "./ProductColorsBuilder";
import ProductSizes from "./ProductSizes";
import Categories from "./Categories";
import ProductImages from "./ProductImages";
import FinalProductReview from "./FinalProductReview";
import ProductInventory from "./ProductInventory";
import { productContext } from "../../../context/product-context";
import { extractImages } from "../../../utils/product-helper";

const Wraper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 1rem;
  height: 90vh;
  overflow: hidden;
  padding: 1rem 0;
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
    padding: 5px;
    margin: 10px 0;
  }
`;

const CancelButton = MuiStyled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderColor: theme.palette.text.secondary,
  "&:hover": {
    borderColor: "initial",
    backgroundColor: "initial",
  },
}));

const AddProduct = ({ onCancel, onSave }) => {
  const [activeStep, setActiveStep] = useState(0);
  const {
    productName,
    setProductName,
    productCategory,
    setProductCategory,
    productDescription,
    setProductDescription,
    productSizes,
    setProductSizes,
    productColors,
    setProductColors,
    productImages,
    setProductImages,
    productInventory,
    setProductInventory,
  } = useContext(productContext);

  const AddProductSchema = Yup.object().shape({
    productName: Yup.string()
      .min(3, "عنوان وارد شده باید بیشتر از 3 حرف باشد")
      .max(90, "عنوان وارد شده نباید بیشتر از 90 حرف باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
    productDescription: Yup.string()
      .min(3, "زیر عنوان وارد شده باید بیشتر از 3 حرف باشد")
      .max(900, "زیر عنوان وارد شده نباید بیشتر از 90 حرف باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
    productCategory: Yup.object().test(
      "objectSize",
      "وارد کردن حداقل یک دسته بندی الزامی می باشد",
      (value) => {
        return !_.isEmpty(value);
      }
    ),
    productColors: Yup.array()
      .min(1, "وارد کردن حداقل یک رنگ الزامی می باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
    productImages: Yup.array().test(
      "Images",
      "انتخاب تصاویر محصول الزامی است",
      (value) => {
        if (activeStep !== 1) return true;
        return !_.isEmpty(value) && value.length == productColors.length;
      }
    ),
    productInventory: Yup.array().test(
      "Inventory",
      "لطفا فرم را با دقت پر کنید",
      (value) => {
        if (activeStep !== 2) return true;
        return (
          !_.isEmpty(value) &&
          value.length ===
            value.map((obj) => obj.quantity).filter(Number).length &&
          value.length === value.map((obj) => obj.price).filter(Number).length
        );
      }
    ),
  });

  const dispatch = useDispatch();

  const handleSizesChange = (event, newSizes) => {
    setProductSizes(newSizes);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      onCancel();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddProduct = async () => {
    let formData = new FormData();
    let images = extractImages(productName, productImages);
    for (let i = 0; i < images.length; i++) {
      formData.append(images[i].name, images[i]);
    }
    formData.append(
      "product",
      JSON.stringify({
        name: productName,
        description: productDescription,
        category: productCategory.value,
        sizes: productSizes,
        colors: productColors,
        inventory: productInventory,
      })
    );
    onSave(formData);
  };

  const handlePopulateData = () => {
    if (activeStep === 3) {
      handleAddProduct();
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    if (productSizes.length && productColors.length) {
      setProductInventory(
        productSizes.flatMap((size) =>
          productColors.map((color) => {
            return { size, color };
          })
        )
      );
    } else if (productSizes.length === 0 && productColors.length) {
      setProductInventory(
        productColors.map((color) => {
          return { color };
        })
      );
    }
    // eslint-disable-next-line
  }, [productSizes, productColors]);

  const steps = ["مشخصات محصول", "تصاویر محصول", "موجودی محصول", "بررسی نهایی"];

  return (
    <Formik
      // innerRef={formikRef}
      initialValues={{
        productName,
        productDescription,
        productCategory,
        productColors,
        productImages,
        productInventory,
      }}
      enableReinitialize={false}
      validationSchema={AddProductSchema}
      onSubmit={handlePopulateData}
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
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className="content">
            {activeStep === 0 && (
              <>
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
                  error={
                    errors.productDescription && touched.productDescription
                  }
                  helperText={
                    errors.productDescription && touched.productDescription
                      ? errors.productDescription
                      : ""
                  }
                />
                <Categories
                  onChange={(newCat) => {
                    setProductCategory(newCat);
                    setFieldValue("productCategory", newCat);
                  }}
                  onBlur={() => {
                    handleBlur("productCategory");
                  }}
                  category={productCategory}
                  error={errors.productCategory && touched.productCategory}
                  helperText={
                    errors.productCategory && touched.productCategory
                      ? errors.productCategory
                      : ""
                  }
                />
                <ProductColorsBuilder
                  colors={productColors}
                  onChange={(newColors) => {
                    setProductColors(newColors);
                    setFieldValue("productColors", newColors);
                  }}
                  error={errors.productColors && touched.productColors}
                  helperText={
                    errors.productColors && touched.productColors
                      ? errors.productColors
                      : ""
                  }
                />
                <Divider variant="fullWidth" className="mx-1 my-2" />
                <ProductSizes
                  sizes={productSizes}
                  onChange={handleSizesChange}
                />
              </>
            )}
            {activeStep === 1 && (
              <ProductImages
                colors={productColors}
                images={productImages}
                onChange={(newImages) => {
                  setProductImages(newImages);
                  setFieldValue("productImages", newImages);
                }}
                error={errors.productImages && touched.productImages}
                helperText={
                  errors.productImages && touched.productImages
                    ? errors.productImages
                    : ""
                }
              />
            )}
            {activeStep === 2 && (
              <ProductInventory
                onChange={(newInventory) => {
                  setProductInventory(newInventory);
                  setFieldValue("productInventory", newInventory);
                }}
                inventory={productInventory}
                error={errors.productInventory && touched.productInventory}
                helperText={
                  errors.productInventory && touched.productInventory
                    ? errors.productInventory
                    : ""
                }
              />
            )}
            {activeStep === 3 && <FinalProductReview />}
          </div>
          <Stack spacing={1} direction="row" pl={1}>
            <CancelButton
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleBack}
            >
              {activeStep === 0 ? "لغو" : "قبلی"}
            </CancelButton>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSubmit}
            >
              {activeStep === 3 ? "ذخیره" : "ادامه"}
            </Button>
          </Stack>
        </Wraper>
      )}
    </Formik>
  );
};

export default AddProduct;
