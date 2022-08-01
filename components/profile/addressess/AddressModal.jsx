import React, { useContext, useEffect, useState, useRef } from "react";

import {
  Button,
  TextField,
  Typography,
  Box,
  Modal,
  Fade,
  Backdrop,
  IconButton,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dynamic from "next/dynamic";
import { styled as MuiStyled } from "@mui/material/styles";
import styled from "styled-components";
import { rgba } from "polished";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Formik } from "formik";
import * as Yup from "yup";

import Icon from "components/shared/Icon";
import { mapContext } from "context/map-context";
import { addNewAddress } from "redux/slices/user";
import LoadingSpinner from "components/shared/LoadingSpinner";

const StyledBox = MuiStyled(Box)(({ theme }) => ({
  "&": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) !important",
    backgroundColor: theme.palette.background.default,
    border: "none",
    boxShadow: 0,
    px: 4,
    overFlow: "hidden",
    [theme.breakpoints.up("lg")]: {
      width: "780px",
    },
    height: "560px",
    maxHeight: "100%",
  },
  "& .edit-map-btn": {
    color: theme.palette.primary.main,
    cursor: "pointer",
    margin: "1rem 0",
  },
}));

const StyledMapWraper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  padding: 10px 0;
`;

const StyledInputWraper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding: 10px 0;
  padding-right: 4px;
`;

const StyledInput = styled.input`
  all: unset;
  padding: 2px 4px;
  color: ${({ theme }) => theme.palette.text.primary};
  ::placeholder {
    font-size: 14px;
  }
`;

const StyledFormWraper = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: scroll;
`;

const StyledSearchResult = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding: 5px;
  max-height: 50%;
  overflow-y: scroll;
  .result-item {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid
      ${({ theme }) => rgba(theme.palette.text.primary, 0.23)};
    padding: 5px;
    cursor: default;
  }
`;

const AddressModal = ({ isOpen, onClose, modalState = "map" }) => {
  const [state, setState] = useState(modalState);
  const [receiverIsMe, setReceiverIsMe] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    handleChangeSearch,
    searchResults,
    handleChangeView,
    findAddress,
    postalAddress,
    setPostalAddress,
    addressState,
    setAddressState,
    city,
    setCity,
    states,
    cities,
    receiverFName,
    setReceiverFName,
    receiverLName,
    setReceiverLName,
    receiverPhone,
    setReceiverPhone,
    postalCode,
    setPostalCode,
    plaque,
    setPlaque,
  } = useContext(mapContext);

  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const MyMap = React.useMemo(
    () =>
      dynamic(() => import("components/Map"), {
        ssr: false,
      }),
    []
  );

  const handleCheckChange = (e) => {
    setReceiverIsMe(e.target.checked);
    if (e.target.checked) {
      formikRef.current.setFieldValue("receiverFName", user.user.fName);
      formikRef.current.setFieldValue("receiverLName", user.user.lName);
      formikRef.current.setFieldValue("receiverPhone", user.user.phoneNumber);
    } else {
      formikRef.current.setFieldValue("receiverFName", "");
      formikRef.current.setFieldValue("receiverLName", "");
      formikRef.current.setFieldValue("receiverPhone", "");
    }
    if (formikRef.current) {
      formikRef.current.setTouched({});
    }
  };

  const handleAddNewAddress = async ({
    city,
    addressState,
    postalCode,
    plaque,
    receiverFName,
    receiverLName,
    receiverPhone,
  }) => {
    try {
      await dispatch(
        addNewAddress({
          userId: user.user._id,
          city: city.label,
          province: addressState.label,
          postalAddress,
          postalCode,
          plaque,
          receiver: {
            fName: receiverFName,
            lName: receiverLName,
            phoneNumber: receiverPhone,
          },
        })
      ).unwrap();
      setReceiverFName("");
      setReceiverLName("");
      setReceiverPhone("");
      setPostalCode("");
      setPlaque("");
      setPostalAddress("");
      setAddressState("");
      setCity("");
      setState("map");
      onClose();
    } catch (rejectedValueOrSerializedError) {
      onClose();
    }
  };

  useEffect(() => {
    if (state === "form") {
      findAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const NewAddressSchema = Yup.object().shape({
    postalAddress: Yup.string()
      .min(3, "آدرس وارد شده باید بیشتر از 3 حرف باشد")
      .max(90, "آدرس وارد شده نباید بیشتر از 90 حرف باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
    addressState: Yup.object().test(
      "objectSize",
      "پر کردن این فیلد الزامی می باشد",
      (value) => {
        return !_.isEmpty(value);
      }
    ),
    city: Yup.object().test(
      "objectSize",
      "پر کردن این فیلد الزامی می باشد",
      (value) => {
        return !_.isEmpty(value);
      }
    ),
    plaque: Yup.string().required("پر کردن این فیلد الزامی می باشد"),
    postalCode: Yup.number()
      .required("پر کردن این فیلد الزامی می باشد")
      .typeError("ارقام وارد کنید")
      .test(
        "len",
        "کد پستی باید 10 رقم باشد",
        (val) => val && val.toString().length === 10
      ),
    receiverFName: Yup.string()
      .required("پر کردن این فیلد الزامی می باشد")
      .min(2, "نام وارد شده باید بیشتر از 2 حرف باشد")
      .max(90, "نام وارد شده نباید بیشتر از 90 حرف باشد"),
    receiverLName: Yup.string()
      .required("پر کردن این فیلد الزامی می باشد")
      .min(2, "نام خانوادگی وارد شده باید بیشتر از 2 حرف باشد")
      .max(90, "نام خانوادگی وارد شده نباید بیشتر از 90 حرف باشد"),
    receiverPhone: Yup.string()
      .required("پر کردن این فیلد الزامی می باشد")
      .matches(/^\d+$/, "فرمت شماره همراه صحیح نمی باشد")
      .test(
        "len",
        "شماره همراه باید 11 رقم باشد",
        (val) => val && val.toString().length === 11
      )
      .test(
        "with zero",
        "شماره همراه باید با صفر شروع شود",
        (val) => val && val.toString().startsWith("0")
      ),
  });

  const formikRef = useRef(null);

  useEffect(() => {
    formikRef.current.setFieldValue("postalAddress", postalAddress);
  }, [postalAddress]);

  useEffect(() => {
    formikRef.current.setFieldValue(
      "addressState",
      addressState === null ? {} : addressState
    );
  }, [addressState]);

  useEffect(() => {
    formikRef.current.setFieldValue("city", city === null ? {} : city);
  }, [city]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        postalAddress,
        addressState,
        city,
        plaque,
        postalCode,
        receiverFName,
        receiverLName,
        receiverPhone,
      }}
      enableReinitialize={false}
      validationSchema={NewAddressSchema}
      onSubmit={handleAddNewAddress}
    >
      {({
        values,
        handleBlur,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
      }) => (
        <Modal
          disable
          aria-labelledby="edit-product-modal-title"
          aria-describedby="edit-product-modal-description"
          open={isOpen}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isOpen}>
            <StyledBox className="d-flex flex-column align-items-start col-12 col-sm-8 col-md-7 col-lg-5 px-1 px-sm-3 p-3">
              {user?.status === "loading" && <LoadingSpinner show={true} />}
              {state === "form" && (
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <IconButton
                      className="align-self-start"
                      onClick={() => setState("map")}
                    >
                      <Icon icon="arrow-right" size={24} />
                    </IconButton>
                    <Typography variant="h6" component="strong">
                      جزییات آدرس
                    </Typography>
                  </div>
                  <IconButton className="align-self-start" onClick={onClose}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              )}
              {state === "map" ? (
                <StyledMapWraper className="w-100">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-column">
                      <Typography variant="h6" component="strong">
                        آدرس جدید
                      </Typography>
                      <Typography variant="body1">
                        موقعیت مکانی آدرس را مشخص کنید.
                      </Typography>
                    </div>
                    <IconButton className="align-self-start" onClick={onClose}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </div>
                  <MyMap onInputClick={() => setState("search")} />
                </StyledMapWraper>
              ) : state === "form" ? (
                <StyledFormWraper>
                  <TextField
                    label="نشانی پستی"
                    variant="outlined"
                    multiline
                    required
                    margin="dense"
                    value={values.postalAddress}
                    onChange={(e) => {
                      // setPostalAddress(e.target.value);
                      setFieldValue("postalAddress", e.target.value);
                    }}
                    fullWidth
                    onBlur={handleBlur("postalAddress")}
                    error={errors.postalAddress && touched.postalAddress}
                    helperText={
                      errors.postalAddress && touched.postalAddress
                        ? errors.postalAddress
                        : ""
                    }
                  />
                  <Typography variant="body1" className="text-muted">
                    آدرس بالا بر اساس موقعیت انتخابی شما وارد شده است.
                  </Typography>
                  <button
                    className="edit-map-btn"
                    onClick={() => setState("map")}
                  >
                    اصلاح موقعیت مکانی بر روی نقشه
                    <Icon icon="chevron-left" size={24} />
                  </button>
                  <div className="d-flex">
                    <Autocomplete
                      disablePortal
                      options={states}
                      sx={{ width: 300 }}
                      value={values.addressState}
                      onChange={(event, newValue) => {
                        setAddressState(newValue === null ? "" : newValue);
                        setFieldValue(
                          "addressState",
                          newValue === null ? "" : newValue
                        );
                        setCity("");
                      }}
                      className="ms-2"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="استان"
                          required
                          onBlur={handleBlur("addressState")}
                          error={errors.addressState && touched.addressState}
                          helperText={
                            errors.addressState && touched.addressState
                              ? errors.addressState
                              : ""
                          }
                        />
                      )}
                    />
                    <Autocomplete
                      disablePortal
                      options={cities}
                      sx={{ width: 300 }}
                      value={values.city}
                      onChange={(event, newValue) => {
                        // setCity(newValue);
                        setFieldValue(
                          "city",
                          newValue === null ? "" : newValue
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="شهر"
                          required
                          onBlur={handleBlur("city")}
                          error={errors.city && touched.city}
                          helperText={
                            errors.city && touched.city ? errors.city : ""
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="d-flex">
                    <TextField
                      label="پلاک"
                      variant="outlined"
                      required
                      margin="dense"
                      className="ms-2"
                      inputProps={{
                        inputMode: "numeric",
                      }}
                      value={values.plaque}
                      onChange={(e) => {
                        // setPlaque(e.target.value);
                        setFieldValue("plaque", e.target.value);
                      }}
                      onBlur={handleBlur("plaque")}
                      error={errors.plaque && touched.plaque}
                      helperText={
                        errors.plaque && touched.plaque ? errors.plaque : ""
                      }
                    />
                    <TextField
                      label="کد پستی"
                      variant="outlined"
                      required
                      margin="dense"
                      inputProps={{
                        inputMode: "numeric",
                      }}
                      value={values.postalCode}
                      onChange={(e) => {
                        // setPostalCode(e.target.value);
                        setFieldValue("postalCode", e.target.value);
                      }}
                      onBlur={handleBlur("postalCode")}
                      error={errors.postalCode && touched.postalCode}
                      helperText={`
                      ${
                        errors.postalCode && touched.postalCode
                          ? errors.postalCode
                          : "کد‌پستی باید ۱۰ رقم و بدون خط تیره باشد."
                      }`}
                    />
                  </div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={receiverIsMe}
                        onChange={handleCheckChange}
                      />
                    }
                    label="گیرنده سفارش خودم هستم."
                  />
                  <div className="d-flex">
                    <TextField
                      label="نام گیرنده"
                      variant="outlined"
                      required
                      margin="dense"
                      disabled={receiverIsMe}
                      className="ms-2"
                      value={values.receiverFName}
                      inputProps={{
                        inputMode: "text",
                      }}
                      onChange={(e) => {
                        // setReceiverFName(e.target.value);
                        setFieldValue("receiverFName", e.target.value);
                      }}
                      onBlur={handleBlur("receiverFName")}
                      error={errors.receiverFName && touched.receiverFName}
                      helperText={
                        errors.receiverFName && touched.receiverFName
                          ? errors.receiverFName
                          : ""
                      }
                    />
                    <TextField
                      label="نام خانوادگی گیرنده"
                      variant="outlined"
                      margin="dense"
                      disabled={receiverIsMe}
                      required
                      inputProps={{
                        inputMode: "text",
                      }}
                      value={values.receiverLName}
                      onChange={(e) => {
                        // setReceiverLName(e.target.value);
                        setFieldValue("receiverLName", e.target.value);
                      }}
                      onBlur={handleBlur("receiverLName")}
                      error={errors.receiverLName && touched.receiverLName}
                      helperText={
                        errors.receiverLName && touched.receiverLName
                          ? errors.receiverLName
                          : ""
                      }
                    />
                  </div>
                  <TextField
                    label="شماره موبایل گیرنده"
                    variant="outlined"
                    margin="dense"
                    disabled={receiverIsMe}
                    required
                    inputProps={{
                      inputMode: "text",
                    }}
                    value={values.receiverPhone}
                    onChange={(e) => {
                      // setReceiverPhone(e.target.value);
                      setFieldValue("receiverPhone", e.target.value);
                    }}
                    onBlur={handleBlur("receiverPhone")}
                    error={errors.receiverPhone && touched.receiverPhone}
                    helperText={
                      errors.receiverPhone && touched.receiverPhone
                        ? errors.receiverPhone
                        : ""
                    }
                  />
                </StyledFormWraper>
              ) : (
                <div className="w-100">
                  <StyledInputWraper>
                    <Icon
                      icon="arrow-right"
                      size={24}
                      onClick={() => {
                        setState("map");
                        setSearchTerm("");
                      }}
                    />
                    <StyledInput
                      type="text"
                      onChange={handleChangeSearch}
                      value={searchTerm}
                      placeholder="جستجوی آدرس"
                      autoFocus
                    />
                  </StyledInputWraper>
                  {searchResults.length > 0 && (
                    <StyledSearchResult>
                      {searchResults.map((item) => (
                        <div
                          key={JSON.stringify(item.location)}
                          className="result-item"
                          onClick={() => {
                            handleChangeView(item);
                            setState("map");
                          }}
                        >
                          <span className="d-flex">{item.title}</span>
                          <span className="d-flex">{item.address}</span>
                        </div>
                      ))}
                    </StyledSearchResult>
                  )}
                </div>
              )}
              <div className="d-flex w-100 align-items-center justify-content-between px-2 px-lg-0">
                {state === "map" ? (
                  <>
                    <Typography variant="body1" className="ms-2">
                      مرسوله‌های شما به این موقعیت ارسال خواهد شد.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className="flex-shrink-0"
                      onClick={() => {
                        setState("form");
                      }}
                    >
                      تایید و ادامه
                      <Icon icon="chevron-left" size={24} />
                    </Button>
                  </>
                ) : state === "form" ? (
                  <Button
                    variant="contained"
                    color="primary"
                    // fullWidth
                    className="mt-auto me-0 me-lg-auto"
                    onClick={handleSubmit}
                  >
                    ثبت آدرس
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </StyledBox>
          </Fade>
        </Modal>
      )}
    </Formik>
  );
};

export default AddressModal;
