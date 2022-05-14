import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { lighten, rgba } from "polished";
import {
  FormHelperText,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { tableCellClasses } from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { getRecentOrders } from "redux/slices/analytics";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { getPersianDate } from "utils/date-helper";
import { numberWithCommas } from "utils/number-helper";
// import withSearch from "components/HOC/withSearch";
import OrdersList from "./OrdersList";

// const SearchableOrdersList = withSearch(OrdersList);

const RecentOrders = () => {
  const dispatch = useDispatch();
  const { recentOrders, status } = useSelector((state) => state.analytics);

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
    console.log("changes");
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
        recentOrders={recentOrders}
        sortBy={sortBy}
        handleChangeSort={handleChangeSort}
        handleChangeSearch={(searchTerm) => setSearch(searchTerm)}
        isLoading={status === "loading-recent-orders"}
      />
    </TableContainer>
  );
};

export default RecentOrders;
