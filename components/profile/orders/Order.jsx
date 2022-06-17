import { Button, Typography } from "@mui/material";
import React, { useContext } from "react";

import styled from "styled-components";
import Link from "next/link";
import dayjs from "dayjs";

import {
  addHoursToDate,
  calculateExpireTime,
  getPersianDateWithMonthInLetters,
  getPersianDateWithTime,
} from "utils/date-helper";
import { numberWithCommas } from "utils/number-helper";
import DotDevider from "components/shared/DotDevider";
import OrderItem from "./OrderItem";
import Icon from "components/shared/Icon";
import { useCountdown } from "components/hooks/useCountDown";
import { orderContext } from "context/order-context";

const StyledWraper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.palette.grey[800]};
  border-radius: 4px;
  padding: 1rem;

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
`;

const optionsCase = {
  "wait-for-pay": "در انتظار پرداخت",
  "in-progress": "در حال پردازش",
  delivered: "تحویل شده",
  canceled: "لغو شده",
};

const StyledWaitForPaySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  p {
    font-size: 0.75rem;
    color: #f9a825;
  }
`;

const Order = ({ order }) => {
  const [days, hours, minutes, seconds] = useCountdown(
    addHoursToDate(order.createAt, 1)
  );
  const { payBill } = useContext(orderContext);
  return (
    <StyledWraper>
      <Link passHref href={`/profile/orders/${order.orderNumber}`}>
        <a>
          <div className="order-status d-flex align-items-center py-2">
            <img
              className="ms-2"
              src={`/images/${
                order.status === "wait-for-pay" ||
                order.status === "in-progress"
                  ? "in-progress"
                  : order.status
              }.svg`}
              alt="order-status"
            />
            {optionsCase[order.status]}
            <Icon className="me-auto" icon="chevron-left" size={24} />
          </div>
          <div className="d-none d-lg-flex py-2">
            <Typography variant="body1" className="order-date">
              {getPersianDateWithMonthInLetters(order.createAt)}
            </Typography>
            <DotDevider />
            <Typography variant="body1" className="order-number">
              <span className="mute">شماره سفارش</span>
              {order.orderNumber}
            </Typography>
            <DotDevider />
            <Typography variant="body1" className="order-price">
              <span className="mute">مبلغ</span>
              {`${numberWithCommas(order.totalPrice)} تومان`}
            </Typography>
          </div>
          <div className="d-flex d-lg-none py-2">
            <Typography variant="body1" className="order-number">
              <span className="mute">شماره سفارش</span>
              {order.orderNumber}
            </Typography>
          </div>
          <div className="d-flex d-lg-none justify-content-between align-items-center py-2">
            <Typography variant="body1" className="order-date">
              {getPersianDateWithMonthInLetters(order.createAt)}
            </Typography>
            <Typography variant="body1" className="order-price">
              <span className="mute">مبلغ</span>
              {`${numberWithCommas(order.totalPrice)} تومان`}
            </Typography>
          </div>
          <div className="items">
            {order.items.map((item) => (
              <OrderItem key={item._id} item={item} />
            ))}
          </div>
        </a>
      </Link>
      {order.status === "wait-for-pay" && (
        <StyledWaitForPaySection>
          <Typography variant="body1" className="order-date">
            <img
              className="ms-2"
              src="/images/in-progress.svg"
              alt="wait-for-pay"
              width={18}
              height={18}
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
    </StyledWraper>
  );
};

export default Order;
