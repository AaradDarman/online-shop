import React from "react";

import { useRouter } from "next/router";
import Cookies from "cookies";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

import MainLayout from "components/layouts/MainLayout";
import ProfileLayout from "components/layouts/ProfileLayout";
import { decodeToken } from "utils/token-helper";

const StyledWraper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 2rem;
  grid-row-gap: 10px;
  .mute {
    color: ${({ theme }) => theme.palette.grey[500]};
    margin-left: 4px;
  }
  .info {
    flex-grow: 1;
    flex-basis: 50%;
  }
`;

const PersonalInfo = () => {
  const { user } = useSelector((state) => state);

  return (
    <StyledWraper>
      <Typography variant="body1" className="info d-flex flex-column">
        <span className="mute">نام و نام خانوادگی</span>
        {`${user.user.fName} ${user.user.lName}`}
      </Typography>
      <Typography variant="body1" className="info d-flex flex-column">
        <span className="mute">ایمیل</span>
        {user.user.email}
      </Typography>
      <Typography variant="body1" className="info d-flex flex-column">
        <span className="mute">شماره موبایل</span>
        {user.user.phoneNumber}
      </Typography>
      <Typography variant="body1" className="info d-flex flex-column">
        <span className="mute">کد ملی</span>
        {user.user.personalCode}
      </Typography>
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

PersonalInfo.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  );
};

export default PersonalInfo;
