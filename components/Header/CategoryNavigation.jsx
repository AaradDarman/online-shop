import React, { memo, useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import styled from "styled-components";

import { appContext } from "context/app-context";
import ThemeToggler from "components/ThemeToggler";
import Category from "./Category";
import { useSelector } from "react-redux";

const StyledNavigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 58px;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.palette.secondary.light};
  a {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
  }
  .main-list {
    display: flex;
    position: relative;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.secondary.light};
    margin: 0;
    padding: 0;
  }
  .main-list > li > .subcategories:first-of-type {
    position: absolute;
    padding: 18px 2rem;
    left: 0;
    right: 0;
    top: 40px;
  }
  .main-list > li > .subcategories:first-of-type > li > a:first-child {
    color: ${({ theme }) => theme.palette.text.primary};
  }
  .main-list > li:hover > a:first-of-type {
    color: ${({ theme }) => theme.palette.primary.main};
  }
  .subcategories a {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
  .subcategories a::after {
    content: " ";
    display: inline-block;
    height: 1px;
    width: 90%;
    border-bottom: 1px solid ${({ theme }) => theme.palette.primary.main};
    opacity: 0;
    transition: 0.3s opacity, transform 0.35s;
    transform: scale(0, 1);
  }
  a:hover {
    color: ${({ theme }) => theme.palette.primary.main} !important;
  }
  .subcategories a:hover:after {
    width: 100%;
    top: 4px;
    right: 0;
    left: 0;
    opacity: 1;
    transform: scale(1);
  }
  .parent > .subcategories {
    display: ${({ hideMenu }) => hideMenu && "none"};
  }
`;

const CategoryNavigation = () => {
  const { toggleTheme } = useContext(appContext);
  const { categories } = useSelector((state) => state);
  const router = useRouter();
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    const handleChangeStart = () => setHideMenu(true);
    const handleChangeEnd = () => setHideMenu(false);

    router.events.on("routeChangeStart", handleChangeStart);
    router.events.on("routeChangeComplete", handleChangeEnd);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleChangeStart);
      router.events.off("routeChangeComplete", handleChangeEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledNavigation hideMenu={hideMenu}>
      <ul className="main-list">
        {categories.entity.map((category) => (
          <Category key={category.name} {...category} />
        ))}
      </ul>
      <ThemeToggler toggleTheme={toggleTheme} />
    </StyledNavigation>
  );
};

export default memo(CategoryNavigation);
