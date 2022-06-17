import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import _ from "lodash";
import styled from "styled-components";

import Products from "components/home/Products";
import api from "adapters/adapter";
import { useFirstRender } from "components/hooks/useFirstRender";
import MainLayout from "components/layouts/MainLayout";

const Wraper = styled.div`
  direction: "rtl";
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = ({ products, productsCount, ...otherProps }) => {
  const [testProducts, setTestProducts] = useState(products);
  const router = useRouter();
  const firstRender = useFirstRender();

  useEffect(() => {
    if (!firstRender) setTestProducts([...testProducts, ...products]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.page]);

  useEffect(() => {
    if (!firstRender) setTestProducts(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.sortBy]);

  return (
    <Wraper>
      <Products
        {...otherProps}
        products={testProducts}
        itemsPerPage={12}
        totalItems={productsCount}
      />
    </Wraper>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await api.getProducts(
    ctx.query.page ?? 1,
    ctx.query.sortBy ?? "newest"
  );

  return {
    props: {
      products: data.products,
      productsCount: data.productsCount,
    },
  };
}

Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
