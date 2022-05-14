import React, { useEffect, useState } from "react";

import { Paper, TableContainer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ProductsList from "./ProductsList";
import { getProductsStock } from "redux/slices/analytics";

const StockReport = ({ className }) => {
  const dispatch = useDispatch();
  const { productsStock, status } = useSelector((state) => state.analytics);

  const [sortBy, setSortBy] = useState({ sortLabel: "createAt", desc: true });
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      getProductsStock({
        search,
        sortBy: sortBy.sortLabel,
        desc: sortBy.desc,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, search]);

  useEffect(() => {
    console.log("status");
    console.log(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleChangeSort = (target) => {
    setSortBy((prev) => {
      if (target === prev.sortLabel) {
        return { sortLabel: prev.sortLabel, desc: !prev.desc };
      } else {
        return { sortLabel: target, desc: true };
      }
    });
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: "secondary.light",
        backgroundImage: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "revert",
        flexWrap: "wrap",
        alignItems: "center",
        alignContent: "flex-start",
        padding: "0.5rem",
      }}
      className={className}
    >
      <h5 style={{ padding: "6px", marginLeft: "auto" }}>گزارش موجودی</h5>
      <ProductsList
        productsStock={productsStock}
        sortBy={sortBy}
        handleChangeSearch={(searchTerm) => setSearch(searchTerm)}
        handleChangeSort={handleChangeSort}
        isLoading={status === "loading-product-stock"}
      />
    </TableContainer>
  );
};

export default StockReport;
