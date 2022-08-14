import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { useRouter } from "next/router";
import PulseLoader from "react-spinners/PulseLoader";
import { css as Loadercss } from "@emotion/react";

import Product from "components/Product";
import SkeletonProductLoading from "components/SkeletonProductLoading";
import SortOptions from "./SortOptions";
import useInfiniteScroll from "components/hooks/useInfiniteScroll";

const fetchMoreLoaderStyle = Loadercss`
position: absolute;
left: 50%;
bottom: 0;
z-index: 9999;
`;

const Wraper = styled.div`
  width: 100%;
  height: calc(100vh - 98px);
  overflow-y: scroll;
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .page {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.palette.secondary.main};
    width: 35px;
    height: 35px;
    padding: 0;
    margin-right: 5px;
    border-radius: 100%;
  }
  .link {
    color: inherit;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active-page {
    background: ${({ theme }) => theme.palette.primary.main};
  }
  .link:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const Products = ({ products, className = "", totalItems }) => {
  const router = useRouter();
  const parentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleScrollEnd = () => {
    if (products.length < totalItems) {
      handlePageChange(Math.ceil(products.length / 12) + 1);
    }
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(
    parentRef,
    handleScrollEnd,
    products.length === totalItems
  );

  const handleTabChange = (newValue) => {
    const { category } = router.query;
    if (category) {
      router.replace({
        pathname: `/${category}`,
        query: { sortBy: newValue },
      });
    } else {
      router.replace({
        pathname: router.pathname,
        query: { sortBy: newValue },
      });
    }
  };

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (+router.query.page > 1) {
        router.query.page = "1";
      }
    };

    const handleChangeStart = (url) => {
      if (url.includes("?sortBy")) setIsLoading(true);
    };

    const handleChangeEnd = (url) => {
      setIsLoading(false);
      setIsFetching(false);
    };

    const handleChangeError = (err) => {
      setIsLoading(false);
      setIsFetching(false);
    };

    router.events.on("beforeHistoryChange", handleRouteChange);
    router.events.on("routeChangeStart", handleChangeStart);
    router.events.on("routeChangeComplete", handleChangeEnd);
    router.events.on("routeChangeError", handleChangeError);

    return () => {
      router.events.off("beforeHistoryChange", handleRouteChange);
      router.events.off("routeChangeStart", handleChangeStart);
      router.events.off("routeChangeComplete", handleChangeEnd);
      router.events.off("routeChangeError", handleChangeError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (page) => {
    let prevQuery = router.query;
    router.replace(
      {
        pathname: "/",
        query: {
          ...prevQuery,
          page,
        },
      },
      `/${prevQuery?.sortBy ? "?sortBy=" + prevQuery?.sortBy : ""}`
    );
  };

  return (
    <Wraper
      ref={parentRef}
      className={`${className} products-list container-lg`}
    >
      <SortOptions onSortChange={handleTabChange} />
      <div className="products-wraper row justify-content-xs-center pt-1">
        {isLoading && !isFetching
          ? Array(6)
              .fill()
              .map(() => Math.round(Math.random() * 6))
              .map((num) => (
                // eslint-disable-next-line react/jsx-key
                <div className="col-12 col-sm-6 col-md-4 mb-3">
                  <SkeletonProductLoading />
                </div>
              ))
          : products.map((product) => (
              <div key={product._id} className="col-12 col-sm-6 col-md-4 mb-3">
                <Product product={product} />
              </div>
            ))}
      </div>
      {isFetching && (
        <PulseLoader
          css={fetchMoreLoaderStyle}
          size={10}
          // color={theme.palette.primary.main}
          loading={true}
        />
      )}
      {products.length === totalItems && <div>end of list</div>}
    </Wraper>
  );
};

export default Products;
