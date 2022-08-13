import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import styled from "styled-components";
import Image from "next/image";
import { Typography, useTheme, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import PulseLoader from "react-spinners/PulseLoader";
import { css as Loadercss } from "@emotion/react";

import api from "adapters/analytics-adapter";
import { getPersianDateWithTime } from "utils/date-helper";
import { numberWithCommas } from "utils/number-helper";
import { applyDiscount } from "utils/product-helper";
import { shorten } from "utils/string-helper";
import Stepper from "components/shared/Stepper";

const StyledWraper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem 0;
  overflow: hidden;
  max-height: 90vh;
  min-height: 455px;
  .price {
    font-family: system-ui;
  }
  .og-price {
    text-decoration: line-through;
    color: ${({ theme }) => theme.palette.error.main};
  }
  .items-wraper {
    flex: 1;
    overflow-y: scroll;
  }
  .close-btn {
    position: absolute;
    top: 0;
    left: 0;
  }
  .quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.palette.error.main};
    border: 1px solid ${({ theme }) => theme.palette.error.main};
    border-radius: 1rem;
    padding: 2px;
  }
`;

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 1rem;
  padding-bottom: 0.7rem;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 4px;
  color: ${({ theme }) => theme.palette.text.secondary};
  strong {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const StyledItem = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.light};
  width: 130px;
  position: relative;
  padding: 4px;
  border-radius: 0.3rem;
`;

const override = Loadercss`
position: absolute;
left: 50%;
top: 50%;
z-index: 9999;
transform: translate(-50%, -50%);
`;

const OrderDetails = ({ orderNumber, onClose }) => {
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleGetOrder = async () => {
    try {
      setIsLoading(true);
      const { data, status } = await api.getOrder(orderNumber);
      if (status === 200) {
        setOrder(data.order);
        setIsLoading(false);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderNumber]);

  const statusOptions = {
    "wait-for-pay": "در انتظار پرداخت",
    "in-progress": "در حال پردازش",
    delivered: "تحویل شده",
    cancelled: "لغو شده",
  };

  const activeStep = Object.keys(statusOptions).indexOf(order?.status);

  return (
    <StyledWraper>
      <IconButton className="close-btn" onClick={onClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
      {isLoading ? (
        <PulseLoader
          css={override}
          size={10}
          color={theme.palette.primary.main}
          loading={true}
        />
      ) : (
        <>
          {order?.status !== "cancelled" && (
            <Stepper className="mt-3" step={activeStep + 1} />
          )}
          <Typography className="mb-3" variant="body1" component="div">
            {order?.status === "cancelled" && (
              <CancelIcon fontSize="small" color="error" />
            )}
            {statusOptions[order?.status]}
          </Typography>
          <StyledRow>
            <StyledTextContainer>
              <Typography variant="body1" component="div">
                تاریخ ثبت سفارش
              </Typography>
              <Typography variant="body1" component="strong">
                {getPersianDateWithTime(order?.createAt)}
              </Typography>
            </StyledTextContainer>
            <StyledTextContainer>
              <Typography variant="body1" component="div">
                کد سفارش
              </Typography>
              <Typography className="price" variant="body1" component="strong">
                {order?.orderNumber}
              </Typography>
            </StyledTextContainer>
          </StyledRow>
          <StyledRow>
            <StyledTextContainer>
              <Typography variant="body1" component="div">
                تحویل گیرنده
              </Typography>
              <Typography variant="body1" component="strong">
                {`${order?.address?.receiver?.fName} ${order?.address?.receiver?.lName}`}
              </Typography>
            </StyledTextContainer>
            <StyledTextContainer>
              <Typography variant="body1" component="div">
                شماره موبایل
              </Typography>
              <Typography variant="body1" component="strong">
                {order?.address?.receiver?.phoneNumber}
              </Typography>
            </StyledTextContainer>
          </StyledRow>
          <StyledRow>
            <StyledTextContainer>
              <Typography variant="body1" component="div">
                آدرس
              </Typography>
              <Typography variant="body1" component="strong">
                {`${order?.address?.province} - ${order?.address?.city} - ${order?.address?.postalAddress}`}
              </Typography>
            </StyledTextContainer>
            <StyledTextContainer>
              <Typography variant="body1" component="div">
                مبلغ
              </Typography>
              <Typography variant="body1" component="strong">
                {numberWithCommas(order?.totalPrice)}
              </Typography>
            </StyledTextContainer>
          </StyledRow>
          <StyledRow className="items-wraper">
            {order?.items?.map(
              ({ _id, name, price, discount, images, quantity }) => (
                <StyledItem key={_id}>
                  <div className="quantity">
                    <span>{quantity}</span>
                  </div>
                  <Image
                    src={images}
                    alt="product-pic"
                    width={130}
                    height={130}
                  />
                  <Typography gutterBottom variant="body1" component="div">
                    {shorten(name, 32)}
                  </Typography>
                  {discount != 0 ? (
                    <>
                      <Typography
                        variant="body1"
                        component="div"
                        className="og-price"
                      >
                        {numberWithCommas(price)}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="div"
                        className="dc-price"
                      >
                        {`${numberWithCommas(
                          applyDiscount(discount, price).toString()
                        )} `}
                        تومان
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      variant="body1"
                      component="div"
                      className="dc-price"
                    >
                      {`${numberWithCommas(price)} `}
                      تومان
                    </Typography>
                  )}
                </StyledItem>
              )
            )}
          </StyledRow>
        </>
      )}
    </StyledWraper>
  );
};

export default OrderDetails;
