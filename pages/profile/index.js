import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Cookies from "cookies";
import PulseLoader from "react-spinners/PulseLoader";
import { css as Loadercss } from "@emotion/react";

import MainLayout from "components/layouts/MainLayout";
import ProfileLayout from "components/layouts/ProfileLayout";
import { decodeToken } from "utils/token-helper";
import styled from "styled-components";
import { Badge, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import Icon from "components/shared/Icon";
import userApi from "adapters/user-adapter";
import { useSelector } from "react-redux";
import useBreakpoints from "utils/useBreakPoints";

const override = Loadercss`
position: absolute;
left: 50%;
top: 50%;
z-index: 9999;
transform: translate(-50%, -50%);
`;

const StyledWraper = styled.div`
  height: 288px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem 2rem;
  .order-statuses > a {
    flex: 1;
  }
`;

const Profile = () => {
  const { user } = useSelector((state) => state);
  const [ordersCount, setOrdersCount] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const { isLg } = useBreakpoints();

  const getOrdersCount = async () => {
    setIsLoading(true);
    try {
      const { data, status } = await userApi.getUserOrdersCount(user.user._id);
      if (status === 200) {
        setIsLoading(false);
        setOrdersCount(data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getOrdersCount();
  }, []);

  return (
    <StyledWraper>
      {isLoading ? (
        <PulseLoader
          css={override}
          size={10}
          color={theme.palette.primary.main}
          loading={true}
        />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <Typography
              variant="h6"
              sx={{ borderBottom: "2px solid", borderColor: "primary.main" }}
            >
              سفارش های من
            </Typography>
            <Link href="/profile/orders" passHref>
              <a>
                مشاهده همه
                <Icon icon="chevron-left" size={24} />
              </a>
            </Link>
          </div>
          <div className="order-statuses d-flex justify-content-evenly align-items-center">
            <Link href="/profile/orders?activeTab=in-progress" passHref>
              <a className="d-flex flex-column flex-lg-row align-items-center">
                <Badge
                  overlap="circular"
                  invisible={isLg}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={ordersCount?.inProgressOrdersCount}
                  color="primary"
                >
                  <img
                    src="/images/order-in-progress.svg"
                    alt="order-in-progress"
                  />
                </Badge>
                <div className="px-2">
                  <Typography
                    variant="body1"
                    className="d-none d-lg-inline"
                  >{`${ordersCount?.inProgressOrdersCount} سفارش`}</Typography>
                  <Typography variant="subtitle2">جاری</Typography>
                </div>
              </a>
            </Link>
            <Link href="/profile/orders?activeTab=delivered" passHref>
              <a className="d-flex flex-column flex-lg-row align-items-center">
                <Badge
                  overlap="circular"
                  invisible={isLg}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={ordersCount?.deliveredOrdersCount}
                  color="primary"
                >
                  <img
                    src="/images/order-delivered.svg"
                    alt="order-delivered"
                  />
                </Badge>
                <div className="px-2">
                  <Typography
                    variant="body1"
                    className="d-none d-lg-inline"
                  >{`${ordersCount?.deliveredOrdersCount} سفارش`}</Typography>
                  <Typography variant="subtitle2">تحویل شده</Typography>
                </div>
              </a>
            </Link>
            <Link href="/profile/orders?activeTab=cancelled" passHref>
              <a className="d-flex flex-column flex-lg-row align-items-center">
                <Badge
                  overlap="circular"
                  invisible={isLg}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={ordersCount?.cancelledOrdersCount}
                  color="primary"
                >
                  <img
                    src="/images/order-cancelled.svg"
                    alt="order-cancelled"
                  />
                </Badge>
                <div className="px-2">
                  <Typography
                    variant="body1"
                    className="d-none d-lg-inline"
                  >{`${ordersCount?.cancelledOrdersCount} سفارش`}</Typography>
                  <Typography variant="subtitle2">لغو شده</Typography>
                </div>
              </a>
            </Link>
          </div>
        </>
      )}
    </StyledWraper>
  );
};

Profile.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
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

export default Profile;
