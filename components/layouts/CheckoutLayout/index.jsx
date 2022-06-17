import React, { useContext, useEffect, useState } from "react";

import { Button } from "@mui/material";
import axios from "axios";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addItemToDbCart, setCartItems } from "redux/slices/cart";
import { setUser } from "redux/slices/user";
import styled, { css } from "styled-components";
import { Typography } from "@mui/material";
import Image from "next/image";

import Header from "components/Header";
import { cleanStorage, loadState } from "utils/browser-storage";
import { numberWithCommas } from "utils/number-helper";
import useBreakpoints from "utils/useBreakPoints";
import CheckoutStepper from "./CheckoutStepper";
import { orderContext } from "context/order-context";
import RouteGuard from "components/RouteGuard";

const mobileStyle = css`
  .checkout-proceed {
    position: relative;
    top: unset;
    width: 100%;
  }
  .proceed-btn {
    display: none;
  }
  & {
    padding-bottom: 77px;
  }
`;

const StyledWraper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  .checkout-proceed {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 20px;
    border: 1px solid ${({ theme }) => theme.palette.grey[800]};
    border-radius: 4px;
    position: sticky;
    top: 58px;
    p {
      font-size: 0.7rem;
    }
  }
  .proceed-btn {
    margin-top: auto;
  }
  .proceed-btn-mobile {
    background-color: ${({ theme }) => theme.palette.secondary.main};
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    border-top: 1px solid ${({ theme }) => theme.palette.text.disabled};
  }
  ${({ isLg }) => !isLg && mobileStyle}
`;

const StyledEmptyWraper = styled.div`
  height: calc(100vh - 58px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CheckoutLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, cart } = useSelector((state) => state);
  const { isLg } = useBreakpoints();
  const { takeOrder } = useContext(orderContext);

  const handleProceed = () => {
    if (router.pathname === "/checkout/cart") {
      router.push("/checkout/shipping");
    } else if (router.pathname === "/checkout/shipping") {
      router.push("/checkout/payment");
    } else if (router.pathname === "/checkout/payment") {
      console.log("pay");
      takeOrder();
    }
  };

  return (
    <RouteGuard>
      {_.isEmpty(cart.items) ? (
        <StyledEmptyWraper>
          <img src="/images/empty-cart.svg" alt="empty-cart" />
          <Typography variant="h5">سبد خرید شما خالی می باشد!</Typography>
        </StyledEmptyWraper>
      ) : (
        <>
          <CheckoutStepper />
          <StyledWraper isLg={isLg}>
            {children}
            <aside className="checkout-proceed">
              <div className="total-price-original pt-3 d-flex justify-content-between">
                <span>{`قیمت کالا ها (${cart?.itemsCount})`}</span>
                <span>{`${numberWithCommas(cart?.totalPrice)} تومان`}</span>
              </div>
              <div className="total-price pt-3 d-flex justify-content-between">
                <span>جمع سبد خرید</span>
                <span>{`${numberWithCommas(cart?.totalPrice)} تومان`}</span>
              </div>
              <p className="text-muted pt-3 me-2">
                هزینه ارسال براساس آدرس، زمان تحویل، وزن و حجم مرسوله شما محاسبه
                می‌شود
              </p>
              <Button
                variant="contained"
                color="primary"
                onClick={handleProceed}
                className="w-100 proceed-btn"
              >
                {`${router.pathname !== "/checkout/cart" ? "پرداخت" : "ادامه"}`}
              </Button>
            </aside>
            <div className="proceed-btn-mobile d-flex d-lg-none py-3 px-4 justify-content-between">
              <Button
                variant="contained"
                color="primary"
                onClick={handleProceed}
                className="w-50"
              >
                {`${router.pathname !== "/checkout/cart" ? "پرداخت" : "ادامه"}`}
              </Button>
              <div className="total-price d-flex flex-column">
                <span>جمع سبد خرید</span>
                <span>{`${numberWithCommas(cart?.totalPrice)} تومان`}</span>
              </div>
            </div>
          </StyledWraper>
        </>
      )}
    </RouteGuard>
  );
};

export default CheckoutLayout;
