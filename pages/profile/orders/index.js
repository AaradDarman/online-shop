import React, { useContext, useEffect, useState, memo } from "react";

import { useRouter } from "next/router";

import MainLayout from "components/layouts/MainLayout";
import { orderContext } from "context/order-context";
import ProfileLayout from "components/layouts/ProfileLayout";
import OrdersSortOption from "components/profile/orders/OrdersSortOption";
import userApi from "adapters/user-adapter";
import { useSelector } from "react-redux";
import Order from "components/profile/orders/Order";
import Cookies from "cookies";
import PulseLoader from "react-spinners/PulseLoader";
import { css as Loadercss } from "@emotion/react";
import { useTheme } from "@mui/system";
import { decodeToken } from "utils/token-helper";

const override = Loadercss`
position: absolute;
left: 50%;
top: 50%;
z-index: 9999;
transform: translate(-50%, -50%);
`;

const Orders = () => {
  const router = useRouter();
  const { handleShowPaymentStatusDialog } = useContext(orderContext);
  const { user } = useSelector((state) => state);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const { data, status } = await userApi.getUserOrders(
        user.user._id,
        router.query.activeTab
      );
      if (status === 200) {
        setIsLoading(false);
        setOrders(data.orders);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [router.query.activeTab]);

  useEffect(() => {
    if (router.query.status) {
      handleShowPaymentStatusDialog(
        router.query.status,
        router.query.orderNumber,
        router.query.trackId
      );
    }
  }, [router.query]);

  const handleTabChange = (newValue) => {
    router.replace({
      pathname: "/profile/orders",
      query: { activeTab: newValue },
    });
  };

  return (
    <div>
      <OrdersSortOption
        onSortChange={handleTabChange}
        value={router.query.activeTab}
      />
      {isLoading ? (
        <PulseLoader
          css={override}
          size={10}
          color={theme.palette.primary.main}
          loading={true}
        />
      ) : (
        orders.map((order) => <Order key={order._id} order={order} />)
      )}
    </div>
  );
};

export async function getServerSideProps(ctx) {
  console.error("server side orders");
  console.log(ctx.query);
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

  const { user } = decodeToken(authorization);

  if (user.isAdmin) {
    return {
      redirect: {
        destination: `/dashboard`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

Orders.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  );
};

export default Orders;
