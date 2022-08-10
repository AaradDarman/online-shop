import React, { useContext, useState } from "react";

import { Button, Typography } from "@mui/material";
import Cookies from "cookies";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MainLayout from "components/layouts/MainLayout";
import ProfileLayout from "components/layouts/ProfileLayout";
import Icon from "components/shared/Icon";
import { decodeToken } from "utils/token-helper";
import { appContext } from "context/app-context";
import MyPopover from "components/shared/MyPopover";
import DeleteAddressModal from "components/profile/addressess/DeleteAddressModal";

const StyledWraper = styled.div`
  .address {
    padding: 0.8rem;
  }
  .address :not(:first-child) {
    color: ${({ theme }) => theme.palette.grey[600]};
  }
  .address:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[800]};
  }
  .icon {
    color: ${({ theme }) => theme.palette.grey[600]};
    margin-left: 4px;
  }
`;

const Addresses = () => {
  const { user } = useSelector((state) => state);
  const [deleteAddressModalOpen, setDeleteAddressModalOpen] = useState(false);
  const { setAddressModalOpen } = useContext(appContext);

  return (
    <StyledWraper>
      <div className="d-flex justify-content-between align-items-center p-3">
        <Typography
          variant="h6"
          sx={{ borderBottom: "2px solid", borderColor: "primary.main" }}
        >
          آدرس ها
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setAddressModalOpen(true)}
        >
          ثبت آدرس جدید
          <Icon icon="location" size={24} />
        </Button>
      </div>
      {user.user.addresses &&
        user.user.addresses.map((address) => (
          <div className="address" key={address._id}>
            <div className="d-flex justify-content-between align-items-center py-1">
              <span> {`${address.city} - ${address.postalAddress}`}</span>
              <MyPopover
                address={address}
                onDeleteClick={() => setDeleteAddressModalOpen(true)}
              />
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
                {address.receiver.phoneNumber}
              </div>
              <div className="py-1">
                <Icon icon="profile" size={20} className="icon" />
                {`${address.receiver.fName} ${address.receiver.lName}`}
              </div>
            </div>
          </div>
        ))}
      <DeleteAddressModal
        isOpen={deleteAddressModalOpen}
        onClose={() => setDeleteAddressModalOpen(false)}
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
