import React, { useContext } from "react";

import { SwipeableDrawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

import Icon from "../../shared/Icon";
import { useRouter } from "next/router";
import Link from "next/link";
import ThemeToggler from "../../ThemeToggler";
import { appContext } from "../../../context/app-context";

const StyledNav = styled.nav`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    width: 200px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 0.5rem 0.7rem 0 0.7rem;
    font-size: 1rem;
  }
  .header i {
    padding: 0.5rem;
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
    width: 200px;
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
`;

const NavigationDrawer = ({ isOpen, onOpen, onClose }) => {
  const router = useRouter();
  const { toggleTheme } = useContext(appContext);

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <StyledNav className="navigation p-0">
        <div className="header">
          <ThemeToggler toggleTheme={toggleTheme} />
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
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
              <a>
                <Icon className="icon" icon="logout" size={24} />
                <span>خروج</span>
              </a>
            </Link>
          </li>
        </ul>
      </StyledNav>
    </SwipeableDrawer>
  );
};

export default NavigationDrawer;
