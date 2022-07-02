import React from "react";

import styled from "styled-components";
import Cookies from "cookies";
import _ from "lodash";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import MainLayout from "components/layouts/MainLayout";
import CheckoutLayout from "components/layouts/CheckoutLayout";

const StyledWraper = styled.div`
  display: flex;
  direction: "rtl";
  flex-direction: column;
  flex: 1;
  border: 1px solid ${({ theme }) => theme.palette.grey[800]};
  border-radius: 4px;
  padding: 1rem;
`;

const Payment = () => {
  return (
    <StyledWraper className="ms-0 ms-lg-3">
      <Typography variant="h6">انتخاب روش پرداخت</Typography>
      <FormControl>
        <RadioGroup
          className="mt-3"
          aria-labelledby="paymeny-radio-buttons-group"
          defaultValue="online"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="online"
            control={<Radio />}
            label="پرداخت اینترنتی"
          />
          <FormControlLabel
            disabled
            value="pay-in-place"
            control={<Radio />}
            label="پرداخت در محل(با کارت بانکی)"
          />
        </RadioGroup>
      </FormControl>
    </StyledWraper>
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
  return {
    props: {},
  };
}

Payment.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <CheckoutLayout>{page}</CheckoutLayout>
    </MainLayout>
  );
};

export default Payment;
