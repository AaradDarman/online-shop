import React, { useEffect, useState } from "react";

import { Paper, TableContainer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getRecentOrders } from "redux/slices/analytics";
import OrdersList from "./OrdersList";

const RecentOrders = () => {
  const dispatch = useDispatch();
  const { recentOrders } = useSelector((state) => state.analytics);

  const [sortBy, setSortBy] = useState({ sortLabel: "createAt", desc: true });
  const [search, setSearch] = useState("");

  const handleChangeSort = (target) => {
    setSortBy((prev) => {
      if (target === prev.sortLabel) {
        return { sortLabel: prev.sortLabel, desc: !prev.desc };
      } else {
        return { sortLabel: target, desc: true };
      }
    });
  };

  useEffect(() => {
    dispatch(
      getRecentOrders({
        search,
        sortBy: sortBy.sortLabel,
        desc: sortBy.desc,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, search]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        height: "100%",
        bgcolor: "secondary.light",
        backgroundImage: "none",
        color: "inherit",
        display: "flex",
        padding: "0.5rem",
        flexDirection: "revert",
        flexWrap: "wrap",
        alignItems: "center",
        alignContent: "flex-start",
      }}
    >
      <h5 style={{ padding: "6px", marginLeft: "auto" }}>سفارشات اخیر</h5>
      <OrdersList
        recentOrders={recentOrders.entity}
        sortBy={sortBy}
        handleChangeSort={handleChangeSort}
        handleChangeSearch={(searchTerm) => setSearch(searchTerm)}
        isLoading={recentOrders.status === "loading"}
        searchPlaceholder="شماره سفارش ..."
      />
    </TableContainer>
  );
};

export default RecentOrders;
