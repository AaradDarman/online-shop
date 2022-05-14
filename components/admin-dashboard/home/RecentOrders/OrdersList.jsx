import React, { useEffect, useState } from "react";

import { styled as MuiStyled } from "@mui/material/styles";
import styled from "styled-components";

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
  useTheme,
  Skeleton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { tableCellClasses } from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { getRecentOrders } from "redux/slices/analytics";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PulseLoader from "react-spinners/PulseLoader";
import { css as Loadercss } from "@emotion/react";

import { getPersianDate } from "utils/date-helper";
import { numberWithCommas } from "utils/number-helper";
import useBreakpoints from "utils/useBreakPoints";
import withSearch from "components/HOC/withSearch";
import { useDebounce } from "components/hooks/useDebounce";

const StyledTableCell = MuiStyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = MuiStyled(TableRow)(({ theme }) => ({
  "&": {
    backgroundColor: theme.palette.secondary.light,
  },

  "& th:not(:nth-child(3))": {
    cursor: "pointer",
  },

  "& td, th": {
    border: 0,
    padding: "6px",
    zIndex: 1,
  },

  "& td:last-child": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  "& td,& th": {
    [theme.breakpoints.down("lg")]: {
      padding: "6px 6px",
    },
  },

  "& td span": {
    borderRadius: "5px",
    padding: "2px 4px",
  },

  "& th": {
    fontWeight: "bold",
  },

  "& .order-number": {
    fontFamily: "monospace",
  },

  "& td.in-progress": {
    "& > span": {
      color: theme.palette.warning.main,
      backgroundColor: rgba(theme.palette.warning.main, 0.2),
    },
  },

  "& td.canceled": {
    "& > span": {
      color: theme.palette.error.main,
      backgroundColor: rgba(theme.palette.error.main, 0.2),
    },
  },

  "& td.delivered": {
    "& > span": {
      color: theme.palette.success.main,
      backgroundColor: rgba(theme.palette.success.main, 0.2),
    },
  },

  "& td.wait-for-pay": {
    "& > span": {
      color: theme.palette.info.main,
      backgroundColor: rgba(theme.palette.info.main, 0.2),
    },
  },
}));

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: 100%;
  height: calc(100% - 44px);
  max-height: ${({ isLg }) => (isLg ? "unsent" : "50vh")};
  overflow-y: scroll;
`;

const override = Loadercss`
position: absolute;
left: 50%;
top: 50%;
z-index: 9999;
transform: translate(-50%, -50%);
`;

const OrdersList = ({
  recentOrders,
  sortBy,
  handleChangeSort,
  searchTerm,
  handleChangeSearch,
  isLoading,
}) => {
  const breakPoints = useBreakpoints();
  const theme = useTheme();

  const statusOptions = {
    "wait-for-pay": "در انتظار پرداخت",
    "in-progress": "در حال پردازش",
    canceled: "لغو شده",
    delivered: "تحویل شده",
  };

  let debouncedSeasrchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    handleChangeSearch(debouncedSeasrchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSeasrchTerm]);

  return (
    <StyledContainer {...breakPoints}>
      <Table stickyHeader aria-label="recent-order-table" size="small">
        {/*orders table head */}
        <TableHead>
          <StyledTableRow>
            <StyledTableCell
              onClick={() => handleChangeSort("createAt")}
              className="d-none d-sm-table-cell"
            >
              تاریخ
              {sortBy.sortLabel === "createAt" ? (
                sortBy.desc ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  <ArrowDownwardIcon fontSize="small" />
                )
              ) : (
                <ArrowUpwardIcon fontSize="small" />
              )}
            </StyledTableCell>
            <StyledTableCell onClick={() => handleChangeSort("orderNumber")}>
              شماره سفارش
              {sortBy.sortLabel === "orderNumber" ? (
                sortBy.desc ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  <ArrowDownwardIcon fontSize="small" />
                )
              ) : (
                <ArrowUpwardIcon fontSize="small" />
              )}
            </StyledTableCell>
            <StyledTableCell>نام خریدار</StyledTableCell>
            <StyledTableCell
              onClick={() => handleChangeSort("totalPrice")}
              className="d-none d-sm-table-cell"
            >
              مبلغ
              {sortBy.sortLabel === "totalPrice" ? (
                sortBy.desc ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  <ArrowDownwardIcon fontSize="small" />
                )
              ) : (
                <ArrowUpwardIcon fontSize="small" />
              )}
            </StyledTableCell>
            <StyledTableCell onClick={() => handleChangeSort("status")}>
              وضعیت
              {sortBy.sortLabel === "status" ? (
                sortBy.desc ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  <ArrowDownwardIcon fontSize="small" />
                )
              ) : (
                <ArrowUpwardIcon fontSize="small" />
              )}
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        {/* orders table body */}
        <TableBody>
          {isLoading ? (
            <PulseLoader
              css={override}
              size={10}
              color={theme.palette.primary.main}
              loading={true}
            />
          ) : (
            recentOrders?.map((order) => (
              <StyledTableRow key={order._id}>
                <TableCell className="d-none d-sm-table-cell">
                  {getPersianDate(order.createAt)}
                </TableCell>
                <TableCell className="order-number">
                  {order.orderNumber}
                </TableCell>
                <TableCell>{`${order.client.fName} ${order.client.lName}`}</TableCell>
                <TableCell className="d-none d-sm-table-cell">
                  {numberWithCommas(order.totalPrice)}
                </TableCell>
                <TableCell className={order.status}>
                  <span>{statusOptions[order.status]}</span>
                  <IconButton aria-label="show-order" size="small">
                    <ArrowBackIosNewIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </StyledContainer>
  );
};

export default withSearch(OrdersList);
