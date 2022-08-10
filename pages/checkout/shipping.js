import React, { useContext, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import styled from "styled-components";
import Cookies from "cookies";
import _ from "lodash";

import MainLayout from "components/layouts/MainLayout";
import CheckoutLayout from "components/layouts/CheckoutLayout";
import Icon from "components/shared/Icon";
import { orderContext } from "context/order-context";
import OrderItem from "components/profile/orders/OrderItem";
import SelectAddressModal from "components/checkout/SelectAddressModal";

const StyledWraper = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  .edit-map-btn {
    color: ${({ theme }) => theme.palette.primary.main};
    cursor: pointer;
    margin: 1rem 0;
  }
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
  const [selectAddressModalOpen, setSelectAddressModalOpen] = useState(false);
  const { user, cart } = useSelector((state) => state);
  const { selectedAddress, setSelectedAddress } = useContext(orderContext);

  useEffect(() => {
    _.isEmpty(selectedAddress) && setSelectAddressModalOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledWraper className="ps-0 ps-lg-3">
      {!_.isEmpty(selectedAddress) ? (
        <>
          <StyledAddressWraper>
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
              <button
                className="me-auto"
                onClick={() => setSelectAddressModalOpen(true)}
              >
                تغییر | ویرایش
                <Icon icon="chevron-left" size={24} />
              </button>
            </>
          </StyledAddressWraper>
          <StyledCartItemsWraper className="mb-3 mb-lg-0">
            {cart.items.map((item) => (
              <OrderItem key={item._id} item={item} />
            ))}
          </StyledCartItemsWraper>
        </>
      ) : (
        <button
          className="edit-map-btn pe-4"
          onClick={() => setSelectAddressModalOpen(true)}
        >
          انتخاب آدرس
          <Icon icon="chevron-left" size={24} />
        </button>
      )}
      <SelectAddressModal
        isOpen={selectAddressModalOpen}
        onClose={() => setSelectAddressModalOpen(false)}
      />
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
