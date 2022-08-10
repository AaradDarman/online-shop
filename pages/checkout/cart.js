import React, { useContext, useEffect } from "react";

import Head from "next/head";
import { useSelector } from "react-redux";
import MainLayout from "components/layouts/MainLayout";
import CheckoutLayout from "components/layouts/CheckoutLayout";
import CartItems from "components/CartItems";
import { orderContext } from "context/order-context";

const Cart = () => {
  const { user, cart } = useSelector((state) => state);
  const { setSelectedAddress } = useContext(orderContext);

  useEffect(() => {
    if (user?.user?.addresses) setSelectedAddress(user?.user?.addresses[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{`فروشگاه | سبد خرید`}</title>
      </Head>
      <CartItems items={cart?.items} className="col-12 col-lg" />
    </>
  );
};

Cart.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <CheckoutLayout>{page}</CheckoutLayout>
    </MainLayout>
  );
};

export default Cart;
