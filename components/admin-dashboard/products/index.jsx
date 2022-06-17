import React, { useContext } from "react";

import styled from "styled-components";

import Product from "components/Product";
import SkeletonProductLoading from "components/SkeletonProductLoading";
import withPagination from "components/HOC/withPagination";
import withAdminPrivileges from "components/HOC/withAdminPrivileges";
import { productsContext } from "context/products-context.js";
import SortOptions from "components/shared/SortOptions";

const ProductWithOptions = withAdminPrivileges(Product);

const Wraper = styled.div`
  width: 100%;
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

const Products = ({ products, className }) => {
  const { setSortBy, handleShowDeleteDialog, handleShowEditModal } =
    useContext(productsContext);

  return (
    <Wraper className={`${className} products-list container-lg`}>
      <SortOptions onSortChange={setSortBy} />
      <div className="row justify-content-xs-center pt-1">
        {products?.status === "loading"
          ? Array(6)
              .fill()
              .map(() => Math.round(Math.random() * 6))
              .map((num) => (
                // eslint-disable-next-line react/jsx-key
                <div className="col-12 col-sm-6 col-md-4 mb-3">
                  <SkeletonProductLoading />
                </div>
              ))
          : products.entity.map((product) => (
              <div key={product._id} className="col-12 col-sm-6 col-md-4 mb-3">
                <ProductWithOptions
                  handleDelete={() => handleShowDeleteDialog(product)}
                  handleEdit={() => handleShowEditModal(product)}
                  product={product}
                />
              </div>
            ))}
      </div>
    </Wraper>
  );
};

export default withPagination(Products);
