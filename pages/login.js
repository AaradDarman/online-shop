import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Link from "next/link";

import { login, resetUser } from "redux/slices/user";
import MainLayout from "components/layouts/MainLayout";
import { resetCart } from "redux/slices/cart";

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

const Login = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => state);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!_.isEmpty(user.user && router.query.forceLogout)) {
      dispatch(resetUser());
      dispatch(resetCart());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (event) => {
    const payload = {
      username,
      password,
    };
    dispatch(login(payload))
      .unwrap()
      .then((originalPromiseResult) => {
        if (router.query.returnUrl) {
          router.replace(router.query.returnUrl);
        } else {
          router.replace("/");
        }
      });
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      // .email("فرمت وارد شده صحیح نمی باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
    password: Yup.string()
      .label("Password")
      .required("پر کردن این فیلد الزامی می باشد"),
  });

  return (
    <Formik
      // innerRef={formikRef}
      initialValues={{
        username,
        password,
      }}
      enableReinitialize={false}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
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
          <Form className="form-wraper col-12 col-lg-3" onSubmit={handleSubmit}>
            <Typography variant="h5" marginBottom={2} className="text-center">
              ورود
            </Typography>
            <TextField
              variant="outlined"
              label="ایمیل یا شماره موبایل"
              size="medium"
              margin="dense"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setFieldValue("username", e.target.value);
              }}
              onBlur={handleBlur("username")}
              error={errors.username && touched.username}
              helperText={
                errors.username && touched.username ? errors.username : ""
              }
            />
            <TextField
              variant="outlined"
              label="رمز عبور"
              size="medium"
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
              ورود
            </Button>
            <Typography variant="body2" className="mt-3 mb-2">
              هنوز ثبت نام نکردی؟
              <Link href={"/signup"}>
                <a className="changePageBtn">{` ثبت نام`}</a>
              </Link>
            </Typography>
            <Typography variant="body2">
              رمزتو فراموش کردی؟
              <Link href="/forget-password">
                <a className="forgetPassBtn">{` بازیابی`}</a>
              </Link>
            </Typography>
          </Form>
        </StyledWraper>
      )}
    </Formik>
  );
};

Login.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Login;
