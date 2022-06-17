import React, { memo, useEffect } from "react";

import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Badge, Button, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Icon from "components/shared/Icon";
import _ from "lodash";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  border-bottom: 2px solid ${({ theme }) => theme.palette.text.disabled};
  padding: 0.5rem;
  .divider {
    display: block;
    width: 1px;
    height: 20px;
    background-color: ${({ theme }) => theme.palette.text.primary};
    margin: 0 0.8rem;
  }
  .icon {
    margin-left: 2px;
  }
  a.active {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const Header = () => {
  const router = useRouter();
  const { cart, user } = useSelector((state) => state);

  return (
    <StyledHeader>
      <div className="d-flex align-items-center flex-row-reverse">
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          badgeContent={cart?.itemsCount}
          color="error"
        >
          <Link href="/checkout/cart" passHref>
            <IconButton
              color={`${
                router.pathname === "/checkout/cart" ? "primary" : "inherit"
              }`}
            >
              <Icon icon="cart" size={24} />
            </IconButton>
          </Link>
        </Badge>
        <span className="divider" />
        {_.isEmpty(user.user) ? (
          <Button variant="outlined" color="inherit">
            <Link href="/login" passHref>
              <a className={router.pathname === "/login" ? "active" : ""}>
                <Icon icon="login" size={24} className="icon" />
                ورود
              </a>
            </Link>
            <span className="divider" />
            <Link href="/signup">
              <a className={router.pathname === "/signup" ? "active" : ""}>
                ثبت نام
              </a>
            </Link>
          </Button>
        ) : user.user.isAdmin ? (
          <Link href="/dashboard" passHref>
            داشبورد
          </Link>
        ) : (
          <Link href="/profile" passHref>
            <IconButton
              color={`${
                router.pathname === "/profile" ? "primary" : "inherit"
              }`}
            >
              <PersonOutlinedIcon />
            </IconButton>
          </Link>
        )}
      </div>
      <Typography
        variant="h5"
        component="h1"
        color={`${router.pathname === "/" ? "primary" : "inherit"}`}
      >
        <Link href="/">فروشگاه</Link>
      </Typography>
    </StyledHeader>
  );
};

export default memo(Header);
