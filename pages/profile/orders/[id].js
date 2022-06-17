import React, { useContext, useState } from "react";

import MainLayout from "components/layouts/MainLayout";
import ProfileLayout from "components/layouts/ProfileLayout";
import api from "adapters/analytics-adapter";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { Button, IconButton, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";

import {
  addHoursToDate,
  calculateExpireTime,
  getPersianDateWithMonthInLetters,
} from "utils/date-helper";
import DotDevider from "components/shared/DotDevider";
import Icon from "components/shared/Icon";
import { numberWithCommas } from "utils/number-helper";
import { useCountdown } from "components/hooks/useCountDown";
import { orderContext } from "context/order-context";
import useBreakpoints from "utils/useBreakPoints";

const mobliStyle = css`
  .order-number,
  .order-date,
  .order-receiver,
  .order-receiver-phone,
  .order-address {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .transaction {
    flex-direction: column;
  }
  .transaction-description,
  .transaction-tracking-number,
  .transaction-date,
  .transaction-price {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const StyledWraper = styled.div`
  .mute {
    color: ${({ theme }) => theme.palette.grey[500]};
    margin-left: 4px;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-top: 1px solid ${({ theme }) => theme.palette.grey[800]};
  }

  .order-number {
    font-family: monospace;
  }
  span.mute {
    font-family: "BYekan";
  }
  .back-wraper {
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[800]};
    /* position: relative; */
    bottom: 22px;
    left: 22px;
  }
  .transactions-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${({ theme }) => theme.palette.grey[800]};
    padding: 1rem;
    margin-top: 1rem;
  }
  .transaction {
    display: flex;
    align-items: flex-start;
    border: 1px solid ${({ theme }) => theme.palette.grey[800]};
    border-radius: 4px;
    padding: 0.7rem;
  }
  .more-details-icon {
    transform: rotate(
      ${({ isTransactionsDetailsOpen }) =>
        isTransactionsDetailsOpen ? "90deg" : "-90deg"}
    );
    transition: all 0.3s ease-in-out;
  }
  ${({ isLg }) => !isLg && mobliStyle}
`;

const StyledAccordion = styled.div`
  max-height: ${({ isTransactionsDetailsOpen }) =>
    isTransactionsDetailsOpen ? "1000px" : 0};
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
`;

const StyledWaitForPaySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[800]};
  p {
    font-size: 0.75rem;
    color: #f9a825;
  }
`;

const Order = ({ order }) => {
  const router = useRouter();
  const [isTransactionsDetailsOpen, setIsTransactionsDetailsOpen] =
    useState(false);

  const { payBill } = useContext(orderContext);
  const { isLg } = useBreakpoints();

  const { id } = router.query;

  const [days, hours, minutes, seconds] = useCountdown(
    addHoursToDate(order.createAt, 1)
  );

  return (
    <StyledWraper
      isLg={isLg}
      isTransactionsDetailsOpen={isTransactionsDetailsOpen}
    >
      <div className="back-wraper d-flex align-items-center">
        <IconButton onClick={router.back}>
          <ArrowForward />
        </IconButton>
        <Typography variant="body1">جزئیات سفارش</Typography>
      </div>
      {order.status === "wait-for-pay" && (
        <StyledWaitForPaySection>
          <Typography variant="body1" className="order-date">
            <img
              className="ms-2"
              src="/images/in-progress.svg"
              alt="wait-for-pay"
            />
            {`در صورت عدم پرداخت تا ${minutes} دقیقه دیگر، سفارش لغو می شود.`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => payBill(order._id)}
            className="me-auto"
          >
            پرداخت
          </Button>
        </StyledWaitForPaySection>
      )}
      <div className="p-3">
        <div className="d-flex flex-column flex-lg-row align-items-center">
          <Typography variant="body1" className="order-number">
            <span className="mute">شماره سفارش</span>
            {order.orderNumber}
          </Typography>
          <DotDevider className="d-none d-lg-inline-block" />
          <Typography variant="body1" className="order-date">
            <span className="mute">تاریخ ثبت سفارش</span>
            {getPersianDateWithMonthInLetters(order.createAt)}
          </Typography>
        </div>
        <div className="d-flex flex-column flex-lg-row align-items-center mt-4 py-3">
          <Typography variant="body1" className="order-receiver">
            <span className="mute">تحویل گیرنده</span>
            {` ${order.address.receiver.fName} ${order.address.receiver.lName}`}
          </Typography>
          <DotDevider className="d-none d-lg-inline-block" />
          <Typography variant="body1" className="order-receiver-phone">
            <span className="mute">شماره موبایل</span>
            {`0${order.address.receiver.phoneNumber}`}
          </Typography>
        </div>
        <Typography variant="body1" className="order-address">
          <span className="mute">آدرس</span>
          {` ${order.address.city} - ${order.address.postalAddress}`}
        </Typography>
      </div>
      <div className="transactions-section">
        <Typography variant="body1" className="order-total-price">
          <span className="mute">مبلغ</span>
          {`${numberWithCommas(order.totalPrice)} تومان`}
        </Typography>
        <button
          onClick={() =>
            setIsTransactionsDetailsOpen(!isTransactionsDetailsOpen)
          }
        >
          تاریخچه تراکنش ها
          <Icon icon="chevron-left" size={24} className="more-details-icon" />
        </button>
      </div>
      <div className="p-3">
        <StyledAccordion isTransactionsDetailsOpen={isTransactionsDetailsOpen}>
          {order.transactionDetails.map((transaction) => (
            <div key={transaction._id} className="transaction">
              <img
                className="ms-2"
                src={`/images/${
                  transaction.status === "failed" ? "failed" : "delivered"
                }.svg`}
                alt="transaction-status"
              />
              <div className="d-flex flex-column w-100 w-lg-auto">
                <Typography variant="body1" className="transaction-description">
                  <span className="mute d-inline d-lg-none">توضیحات</span>
                  {transaction.status === "failed"
                    ? "پرداخت ناموفق"
                    : "پرداخت موفق"}
                </Typography>
                <Typography
                  variant="body1"
                  className="transaction-tracking-number"
                >
                  <span className="mute">شماره پیگیری</span>
                  {transaction.trackingNumber}
                </Typography>
              </div>
              <div className="d-flex flex-column flex-lg-row align-items-center me-0 me-lg-auto w-100 w-lg-auto">
                <Typography variant="body1" className="transaction-date">
                  <span className="mute d-inline d-lg-none">زمان</span>
                  {getPersianDateWithMonthInLetters(transaction.paidAt)}
                </Typography>
                <DotDevider className="d-none d-lg-inline-block" />
                <Typography variant="body1" className="transaction-price">
                  <span className="mute d-inline d-lg-none">مبلغ</span>
                  {`${numberWithCommas(transaction.price)} تومان`}
                </Typography>
              </div>
            </div>
          ))}
        </StyledAccordion>
      </div>
    </StyledWraper>
  );
};

export async function getServerSideProps(ctx) {
  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=10, stale-while-revalidate=59"
  // );
  console.error("server side order");
  console.error(ctx.query);

  const { data, status } = await api.getOrder(ctx.query.id);

  return {
    props: { order: data.order },
  };
}

Order.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  );
};

export default Order;
