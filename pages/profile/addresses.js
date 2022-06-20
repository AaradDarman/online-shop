import React from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import Cookies from "cookies";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MainLayout from "components/layouts/MainLayout";
import ProfileLayout from "components/layouts/ProfileLayout";
import Icon from "components/shared/Icon";
import { decodeToken } from "utils/token-helper";

const StyledWraper = styled.div`
  .address {
    padding: 0.8rem;
  }
  .address :not(:first-child) {
    color: ${({ theme }) => theme.palette.grey[400]};
  }
  .address:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.palette.grey[800]};
  }
  .icon {
    color: ${({ theme }) => theme.palette.grey[400]};
    margin-left: 4px;
  }
`;

const Addresses = () => {
  const { user } = useSelector((state) => state);

  return (
    <StyledWraper>
      {user.user.addresses &&
        user.user.addresses.map((address) => (
          <div className="address" key={address._id}>
            <div className="d-flex justify-content-between align-items-center py-1">
              <span> {`${address.city} - ${address.postalAddress}`}</span>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
            <div className="d-flex flex-column">
              <div className="py-1">
                <Icon icon="address" size={20} className="icon" />
                {address.city}
              </div>
              <div className="py-1">
                <Icon icon="post" size={22} className="icon" />
                {address?.postalCode}
              </div>
              <div className="py-1">
                <Icon icon="call" size={20} className="icon" />
                {`0${address.receiver.phoneNumber}`}
              </div>
              <div className="py-1">
                <Icon icon="profile" size={20} className="icon" />
                {`${address.receiver.fName} ${address.receiver.lName}`}
              </div>
            </div>
          </div>
        ))}
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

Addresses.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  );
};

export default Addresses;
