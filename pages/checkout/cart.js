import React from "react";

import Head from "next/head";
import { useSelector } from "react-redux";
import MainLayout from "components/layouts/MainLayout";
import CheckoutLayout from "components/layouts/CheckoutLayout";
import CartItems from "components/CartItems";

const Cart = () => {
  const { cart } = useSelector((state) => state);

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
