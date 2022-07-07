import React, { useEffect } from "react";

import Header from "components/Header";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";

import { setUser } from "redux/slices/user";
import { syncCartToDb, setCartItems } from "redux/slices/cart";
import { loadState } from "utils/browser-storage";
import OrderContext from "context/OrderContext";
import userApi from "adapters/user-adapter";


const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state);

  const getUserData = async () => {
    try {
      const { data, status } = await userApi.getUserData();
      if (status === 200) {
        if (_.isEmpty(user.user)) {
          dispatch(setUser(data.user));
        }
        let localBasket = loadState();
        if (!_.isEmpty(localBasket?.items)) {
          dispatch(syncCartToDb(localBasket?.items));
        } else {
          dispatch(setCartItems(data.userBasket));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.user]);

  return (
    <OrderContext>
      <>
        <Header />
        <section className="main-section">{children}</section>
      </>
    </OrderContext>
  );
};

export default MainLayout;
