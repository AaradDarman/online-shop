import React, { memo, useEffect } from "react";

import styled, { css } from "styled-components";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";

import Icon from "components/shared/Icon";
import { resetUser } from "redux/slices/user";
import { resetCart } from "redux/slices/cart";
import useBreakpoints from "utils/useBreakPoints";

const StyledWraper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  .profile-main-section {
    position: relative;
    border: 1px solid ${({ theme }) => theme.palette.grey[800]};
    border-radius: 4px;
    min-height: 288px;
  }
`;

const stickyStyle = css`
  position: sticky;
  top: 58px;
`;

const StyledAside = styled.nav`
  width: 205px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  border: 1px solid ${({ theme }) => theme.palette.grey[800]};
  border-radius: 4px;
  transition: width 1s ease;
  overflow-x: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;
  ${({ isLg }) => isLg && stickyStyle};
  .navigation-menu {
    list-style: none;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 0;
    padding: 0;
  }
  .menu-item {
    display: flex;
    align-items: center;
    width: inherit;
    position: relative;
    opacity: 0.7;
    margin: 0.6rem 0;
    padding: 0 0.7rem;
    transition: color 0.6s ease, background-color 0.3s ease, border 0.6s ease,
      opacity 0.3s;
  }
  .menu-item:not(.active):hover {
    opacity: 1;
    transition: color 0.3s ease;
  }
  .menu-item:not(.active):hover a {
    background-color: ${({ theme }) =>
      theme.mode === "dark" ? "#1b222d" : "rgba(0, 0, 0, 0.23)"};
  }
  .menu-item:not(.active):hover a .icon {
    color: ${({ theme }) => theme.palette.primary.main};
    transition: color 0.3s ease;
  }
  .menu-item:not(.active):hover a span::after {
    background-color: ${({ theme }) => theme.palette.primary.main};
    width: 100%;
  }
  .menu-item.active {
    opacity: 1;
  }
  .menu-item.active::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 7px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: ${({ theme }) => theme.palette.primary.main};
    transition: all 0.3s ease;
  }
  .menu-item a {
    text-decoration: none;
    color: inherit;
    width: 100%;
    flex: 1;
    padding: 0.3rem;
    border-radius: 0.6rem;
    transition: all 0.3s ease;
  }
  .menu-item a span {
    position: relative;
  }
  .menu-item a span::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    width: 0;
    background-color: transparent;
    transition: all 0.3s ease;
  }
  .menu-item .icon {
    margin-left: 1rem;
  }
`;

const routesTitles = {
  "/profile": "",
  "/profile/orders": "| سفارش ها",
  "/profile/addresses": "| آدرس ها",
  "/profile/personal-info": "| اطلاعات حساب کاربری",
};

const ProfileLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLg } = useBreakpoints();

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/api/auth/logout");
      dispatch(resetUser());
      dispatch(resetCart());
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledWraper className="container-lg py-4">
      <Head>
        <title>{`پروفایل ${
          router.pathname.includes("/profile/orders")
            ? routesTitles["/profile/orders"]
            : routesTitles[router.pathname]
        }`}</title>
      </Head>
      <StyledAside isLg={isLg}>
        <ul className="navigation-menu">
          <li
            className={`menu-item${
              router.pathname === "/profile" ? " active" : ""
            }`}
          >
            <Link href="/profile">
              <a>
                <Icon
                  className="icon"
                  icon={`${
                    router.pathname === "/profile" ? "home-fill" : "home"
                  }`}
                  size={22}
                />
                <span>خلاصه فعالیت ها</span>
              </a>
            </Link>
          </li>
          <li
            className={`menu-item${
              router.pathname.includes("/profile/orders") ? " active" : ""
            }`}
          >
            <Link href="/profile/orders">
              <a>
                <Icon
                  className="icon"
                  icon={`${
                    router.pathname === "/profile/orders"
                      ? "shopping-bag-filled"
                      : "shopping-bag"
                  }`}
                  size={24}
                />
                <span>سفارش ها</span>
              </a>
            </Link>
          </li>
          <li
            className={`menu-item${
              router.pathname === "/profile/addresses" ? " active" : ""
            }`}
          >
            <Link href="/profile/addresses">
              <a>
                <Icon
                  className="icon"
                  icon={`${
                    router.pathname === "/profile/addresses"
                      ? "address-filled"
                      : "address"
                  }`}
                  size={24}
                />
                <span>آدرس ها</span>
              </a>
            </Link>
          </li>
          <li
            className={`menu-item${
              router.pathname === "/profile/personal-info" ? " active" : ""
            }`}
          >
            <Link href="/profile/personal-info">
              <a>
                <Icon
                  className="icon"
                  icon={`${
                    router.pathname === "/profile/personal-info"
                      ? "profile-filled"
                      : "profile"
                  }`}
                  size={24}
                />
                <span>اطلاعات حساب کاربری</span>
              </a>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/logout">
              <a onClick={logout}>
                <Icon className="icon" icon="logout" size={22} />
                <span>خروج</span>
              </a>
            </Link>
          </li>
        </ul>
      </StyledAside>
      <section className="profile-main-section col-12 col-lg me-0 me-lg-2">
        {children}
      </section>
    </StyledWraper>
  );
};

export default memo(ProfileLayout);
