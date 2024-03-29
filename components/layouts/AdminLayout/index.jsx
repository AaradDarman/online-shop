import React, { useState, useContext } from "react";

import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { resetUser } from "redux/slices/user";
import { resetCart } from "redux/slices/cart";
import axios from "axios";

import Icon from "components/shared/Icon";
import NavigationDrawer from "./NavigationDrawer";
import ThemeToggler from "components/ThemeToggler";
import { appContext } from "context/app-context";

const Wraper = styled.div`
  .header {
    display: flex;
    width: 150px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 0.5rem 0.7rem 0 0.7rem;
    font-size: 1rem;
  }
  .header i {
    padding: 0.5rem;
  }
  .navigation {
    height: 100vh;
    width: 150px;
    background-color: ${({ theme }) => theme.palette.secondary.main};
    border-left: 1px solid ${({ theme }) => theme.palette.secondary.light};
    transition: width 1s ease;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
  }
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
    width: 150px;
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
  .main-section {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    height: 100vh;
    margin-right: 150px;
  }
  .back-icon {
    color: ${({ theme }) => theme.palette.text.main};
  }
  .logo {
    transition: all 50ms ease-in-out;
    display: block;
    /* background: url("/logo.svg") no-repeat center center; */
    background-size: contain;
    width: 50px;
    height: 39px;
    line-height: 0;
    font-size: 0;
    color: transparent;
  }
  header {
    display: none;
    background-color: ${({ theme }) => theme.palette.secondary.main};
    padding-right: 4px;
    padding-left: 12px;
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  @media (max-width: 1128px) {
    .navigation {
      width: 56px;
    }
    .navigation:hover {
      width: 150px;
    }
    .main-section {
      margin-right: 56px;
    }
    .header {
      padding-right: 0.3rem;
    }
  }
  @media (max-width: 992px) {
    .main-section {
      height: unset;
    }
  }
  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    .navigation {
      display: none;
    }
    .main-section {
      overflow-y: hidden;
      margin-right: 0;
    }
    header {
      display: block;
    }
  }
`;

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const { toggleTheme } = useContext(appContext);
  const dispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

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
    <Wraper className="dashboard-layout rtl">
      <Head>
        <title>داشبورد</title>
        <meta charset="utf-8" />
        <link rel="icon" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <nav className="navigation p-0">
        <div className="header">
          <Link href="/">
            <a className="logo p-0">Logo</a>
          </Link>
          <ThemeToggler toggleTheme={toggleTheme} />
        </div>
        <ul className="navigation-menu">
          <li
            className={`menu-item${
              router.pathname === "/dashboard" ? " active" : ""
            }`}
          >
            <Link href="/dashboard">
              <a>
                <Icon
                  className="icon"
                  icon={`${
                    router.pathname === "/dashboard" ? "home-fill" : "home"
                  }`}
                  size={24}
                />
                <span>خانه</span>
              </a>
            </Link>
          </li>
          <li
            className={`menu-item${
              router.pathname === "/dashboard/products" ? " active" : ""
            }`}
          >
            <Link href="/dashboard/products">
              <a>
                <Icon
                  className="icon"
                  icon={`${
                    router.pathname === "/dashboard/products"
                      ? "tshirt-filled"
                      : "tshirt"
                  }`}
                  size={24}
                />
                <span>محصولات</span>
              </a>
            </Link>
          </li>
          <li className="menu-item mt-auto">
            <Link href="/logout">
              <a onClick={logout}>
                <Icon className="icon" icon="logout" size={24} />
                <span>خروج</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <header className="mb-3 py-2">
        <IconButton onClick={handleOpenDrawer}>
          <MenuIcon />
        </IconButton>
      </header>
      <NavigationDrawer
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        onOpen={handleOpenDrawer}
      />
      <section className="main-section">{children}</section>
    </Wraper>
  );
};

export default AdminLayout;
