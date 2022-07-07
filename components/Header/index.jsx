import React, { memo, useContext, useEffect, useState } from "react";

import styled from "styled-components";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Badge, Button, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import _ from "lodash";

import Icon from "components/shared/Icon";
import CategoryNavigation from "./CategoryNavigation";
import CategoryNavigationDrawer from "./CategoryNavigationDrawer";
import useBreakpoints from "utils/useBreakPoints";
import ThemeToggler from "components/ThemeToggler";
import { appContext } from "context/app-context";

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
  .menu-icon-wraper {
    margin-top: 58px;
  }
`;

const StyledMenuIconWraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 58px;
`;

const Header = () => {
  const router = useRouter();
  const { cart, user } = useSelector((state) => state);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isLg } = useBreakpoints();
  const { toggleTheme } = useContext(appContext);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    const handleChangeStart = () => setDrawerOpen(false);

    router.events.on("routeChangeStart", handleChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleChangeStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
          <span className="divider d-none d-lg-block" />
          {_.isEmpty(user?.user) ? (
            <Button variant="outlined" color="inherit">
              <Link href="/login" passHref>
                <a className={router.pathname === "/login" ? "active" : ""}>
                  <Icon icon="login" size={24} className="icon" />
                  ورود
                </a>
              </Link>
              <span className="divider d-none d-lg-block" />
              <Link href="/signup">
                <a
                  className={`d-none d-lg-block ${
                    router.pathname === "/signup" ? "active" : ""
                  }`}
                >
                  ثبت نام
                </a>
              </Link>
            </Button>
          ) : user?.user?.isAdmin ? (
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

      {isLg ? (
        <CategoryNavigation />
      ) : (
        <StyledMenuIconWraper>
          <IconButton onClick={handleOpenDrawer}>
            <MenuIcon />
          </IconButton>
          <ThemeToggler toggleTheme={toggleTheme} />
        </StyledMenuIconWraper>
      )}
      <CategoryNavigationDrawer
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        onOpen={handleOpenDrawer}
      />
    </>
  );
};

export default memo(Header);
