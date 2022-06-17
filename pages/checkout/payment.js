import React from "react";

import styled from "styled-components";
import Cookies from "cookies";
import _ from "lodash";

import MainLayout from "components/layouts/MainLayout";
import CheckoutLayout from "components/layouts/CheckoutLayout";

const Wraper = styled.div`
  direction: "rtl";
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Payment = () => {
  return <Wraper>Payment</Wraper>;
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
