import React, { useCallback, useState } from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  Button,
  TextField,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
  Modal,
  Fade,
  Backdrop,
  Stack,
} from "@mui/material";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Link from "next/link";
import PulseLoader from "react-spinners/PulseLoader";
import { css as Loadercss } from "@emotion/react";
import ReactInputVerificationCode from "react-input-verification-code";
import { styled as MuiStyled } from "@mui/material/styles";

import { resendVerificationCode, signup, verify } from "redux/slices/user";
import MainLayout from "components/layouts/MainLayout";
import { resetCart } from "redux/slices/cart";
import CountDownTimer from "components/CountDownTimer";

const override = Loadercss`
position: absolute;
left: 50%;
top: 50%;
z-index: 9999;
transform: translate(-50%, -50%);
`;

const CancelButton = MuiStyled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderColor: theme.palette.text.secondary,
  "&:hover": {
    borderColor: "initial",
    backgroundColor: "initial",
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

const StyledWraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 58px);
  .form-wraper {
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.palette.grey[800]};
    border-radius: 4px;
    padding: 2rem;
  }
  a,
  a:hover {
    color: ${({ theme }) => theme.palette.primary.main} !important;
  }
`;

const VerificationWraper = styled.div`
  direction: ltr;
  --ReactInputVerificationCode-itemWidth: 2.5rem;
  --ReactInputVerificationCode-itemHeight: 3.5rem;
  .ReactInputVerificationCode__container {
    width: unset;
  }
  & .ReactInputVerificationCode__item {
    position: relative;
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: 500;
  }
  & .ReactInputVerificationCode__item,
  & .ReactInputVerificationCode__item.is-active {
    box-shadow: none;
  }
  & .ReactInputVerificationCode__item:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 2px;
    background-color: #ebebeb;
    transition: background-color 0.2s ease-out;
  }
  & .ReactInputVerificationCode__item.is-active:after {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
  .action-buttons {
    direction: rtl;
  }
`;

const Signup = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [personalCode, setPersonalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const theme = useTheme();

  const SignupSchema = Yup.object().shape({
    fName: Yup.string()
      .min(3, "نام وارد شده باید بیشتر از 3 حرف باشد")
      .max(50, "نام وارد شده نباید بیشتر از 50 حرف باشد")
      .required("پر کردن این فیلد الزامی می باشد")
      .test("alphabets", "نام وارد شده نباید حاوی اعداد باشد", (value) => {
        return !/\d/g.test(value);
      }),
    lName: Yup.string()
      .min(3, "نام وارد شده باید بیشتر از 3 حرف باشد")
      .max(50, "نام وارد شده نباید بیشتر از 50 حرف باشد")
      .required("پر کردن این فیلد الزامی می باشد")
      .test("alphabets", "نام وارد شده نباید حاوی اعداد باشد", (value) => {
        return !/\d/g.test(value);
      }),
    email: Yup.string()
      .email("فرمت وارد شده صحیح نمی باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
    personalCode: Yup.number()
      .required("پر کردن این فیلد الزامی می باشد")
      .typeError("ارقام وارد کنید")
      .test(
        "len",
        "کد ملی باید 10 رقم باشد",
        (val) => val && val.toString().length === 10
      ),
    phoneNumber: Yup.string()
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
    password: Yup.string()
      .label("Password")
      .required("پر کردن این فیلد الزامی می باشد")
      .min(8, "رمز عبور باید بیشتر از 8 حرف باشد"),
  });

  const handleSignup = () => {
    console.log("signup");
    const payload = {
      fName,
      lName,
      email,
      personalCode,
      phoneNumber,
      password,
    };
    dispatch(signup(payload))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult.user);
        setUserId(originalPromiseResult.user._id);
        setVerifyModalOpen(true);
      });
  };

  const handleVerify = () => {
    console.log(verificationCode);
    dispatch(verify(verificationCode))
      .unwrap()
      .then((originalPromiseResult) => {
        setVerifyModalOpen(false);
        router.replace("/login");
      });
  };

  const handleResendVerificationCode = useCallback(async () => {
    console.log("userId");
    console.log(userId);
    dispatch(resendVerificationCode(userId));
  }, []);

  return (
    <Formik
      initialValues={{
        fName,
        lName,
        email,
        personalCode,
        phoneNumber,
        password,
      }}
      enableReinitialize={false}
      validationSchema={SignupSchema}
      onSubmit={handleSignup}
    >
      {({
        values,
        handleBlur,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
      }) => (
        <StyledWraper>
          {user?.status === "loading" && (
            <PulseLoader
              css={override}
              size={10}
              color={theme.palette.primary.main}
              loading={true}
            />
          )}
          <Form className="form-wraper col-12 col-lg-3" onSubmit={handleSubmit}>
            <Typography variant="h5" marginBottom={2} className="text-center">
              ثبت نام
            </Typography>
            <TextField
              variant="outlined"
              label="نام"
              size="small"
              margin="dense"
              value={fName}
              onChange={(e) => {
                setFName(e.target.value);
                setFieldValue("fName", e.target.value);
              }}
              onBlur={handleBlur("fName")}
              error={errors.fName && touched.fName}
              helperText={errors.fName && touched.fName ? errors.fName : ""}
            />
            <TextField
              variant="outlined"
              label="نام خانوادگی"
              size="small"
              margin="dense"
              value={lName}
              onChange={(e) => {
                setLName(e.target.value);
                setFieldValue("lName", e.target.value);
              }}
              onBlur={handleBlur("lName")}
              error={errors.lName && touched.lName}
              helperText={errors.lName && touched.lName ? errors.lName : ""}
            />
            <TextField
              variant="outlined"
              label="ایمیل"
              size="small"
              margin="dense"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldValue("email", e.target.value);
              }}
              onBlur={handleBlur("email")}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email ? errors.email : ""}
            />
            <TextField
              variant="outlined"
              label="کد ملی"
              size="small"
              margin="dense"
              value={personalCode}
              onChange={(e) => {
                setPersonalCode(e.target.value);
                setFieldValue("personalCode", e.target.value);
              }}
              onBlur={handleBlur("personalCode")}
              error={errors.personalCode && touched.personalCode}
              helperText={
                errors.personalCode && touched.personalCode
                  ? errors.personalCode
                  : ""
              }
            />
            <TextField
              variant="outlined"
              label="شماره همراه"
              size="small"
              margin="dense"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setFieldValue("phoneNumber", e.target.value);
              }}
              onBlur={handleBlur("phoneNumber")}
              error={errors.phoneNumber && touched.phoneNumber}
              helperText={
                errors.phoneNumber && touched.phoneNumber
                  ? errors.phoneNumber
                  : ""
              }
            />
            <TextField
              variant="outlined"
              label="رمز عبور"
              size="small"
              margin="dense"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldValue("password", e.target.value);
              }}
              type="password"
              autoComplete="current-password"
              onBlur={handleBlur("password")}
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password ? errors.password : ""
              }
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="mt-4"
            >
              ثبت نام
            </Button>
            <Typography variant="body2" className="mt-3 mb-2">
              قبلا ثبت نام کردی؟
              <Link href={"/login"}>
                <a className="changePageBtn">{` ورود`}</a>
              </Link>
            </Typography>
          </Form>
          <Modal
            disable
            aria-labelledby="edit-product-modal-title"
            aria-describedby="edit-product-modal-description"
            open={verifyModalOpen}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={verifyModalOpen}>
              <Box
                sx={modalStyle}
                className="col-12 col-sm-8 col-md-7 col-lg-5"
              >
                <VerificationWraper className="custom-styles py-5 p-lg-5">
                  <Typography
                    variant="h5"
                    marginBottom={2}
                    className="text-center"
                  >
                    فعال سازی حساب کاربری
                  </Typography>
                  <ReactInputVerificationCode
                    length={6}
                    placeholder=""
                    autoFocus
                    onChange={(val) => {
                      setVerificationCode(val);
                      // setFieldValue("verificationCode", val);
                    }}
                    // value={values.verificationCode}
                    // onBlur={handleBlur("verificationCode")}
                  />
                  <CountDownTimer
                    handleResendVerificationCode={handleResendVerificationCode}
                  />
                  {/* <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="mt-4"
                    onClick={handleVerify}
                  >
                    فعال سازی
                  </Button> */}
                  <Stack
                    spacing={1}
                    direction="row"
                    className="mt-3 action-buttons"
                  >
                    <CancelButton
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => setVerifyModalOpen(false)}
                    >
                      لغو
                    </CancelButton>
                    <Button
                      onClick={handleVerify}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      فعال سازی
                    </Button>
                  </Stack>
                </VerificationWraper>
              </Box>
            </Fade>
          </Modal>
        </StyledWraper>
      )}
    </Formik>
  );
};

Signup.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Signup;
