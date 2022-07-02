import React, { useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import Cookies from "cookies";
import _ from "lodash";

import api from "adapters/adapter";
import { useFirstRender } from "components/hooks/useFirstRender";
import MainLayout from "components/layouts/MainLayout";
import { setUser } from "redux/slices/user";
import { addItemToDbCart, setCartItems } from "redux/slices/cart";
import { decodeToken } from "utils/token-helper";
import { loadState } from "utils/browser-storage";
import Products from "components/home/Products";
import { productsContext } from "context/products-context";
import CheckoutLayout from "components/layouts/CheckoutLayout";
import Icon from "components/shared/Icon";
import { orderContext } from "context/order-context";
import OrderItem from "components/profile/orders/OrderItem";

const StyledWraper = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledAddressWraper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.grey[800]};
  border-radius: 4px;
  padding: 1rem;
`;

const StyledCartItemsWraper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.grey[800]};
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
`;

const Shipping = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => state);
  const { selectedAddress, setSelectedAddress } = useContext(orderContext);

  useEffect(() => {
    if (user?.user?.addresses) setSelectedAddress(user?.user?.addresses[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.user?.addresses]);

  return (
    <StyledWraper className="ps-0 ps-lg-3">
      <StyledAddressWraper>
        {!_.isEmpty(selectedAddress) && (
          <>
            <Icon icon="location" size={24} className="ms-2" />
            <div className="d-flex flex-column">
              <Typography
                variant="body1"
                component="div"
                color="text.secondary"
              >
                آدرس تحویل سفارش
              </Typography>
              <Typography variant="body1" component="div">
                {`${selectedAddress?.province} - ${selectedAddress?.city} - ${selectedAddress?.postalAddress}`}
              </Typography>
              <Typography
                variant="body1"
                component="div"
                color="text.secondary"
              >
                {`${selectedAddress?.receiver?.fName} ${selectedAddress?.receiver?.lName}`}
              </Typography>
            </div>
            <div className="me-auto">
              تغییر | ویرایش
              <Icon icon="chevron-left" size={24} />
            </div>
          </>
        )}
      </StyledAddressWraper>
      <StyledCartItemsWraper className="mb-3 mb-lg-0">
        {cart.items.map((item) => (
          <OrderItem key={item._id} item={item} />
        ))}
      </StyledCartItemsWraper>
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

Shipping.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <CheckoutLayout>{page}</CheckoutLayout>
    </MainLayout>
  );
};

export default Shipping;
