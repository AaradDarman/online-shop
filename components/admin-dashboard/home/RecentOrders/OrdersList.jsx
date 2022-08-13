import React, { useEffect, useState } from "react";

import { styled as MuiStyled } from "@mui/material/styles";
import styled from "styled-components";

import { rgba } from "polished";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Backdrop,
  Fade,
  Modal,
  Box,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { tableCellClasses } from "@mui/material/TableCell";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PulseLoader from "react-spinners/PulseLoader";
import { css as Loadercss } from "@emotion/react";

import { getPersianDate } from "utils/date-helper";
import { numberWithCommas } from "utils/number-helper";
import useBreakpoints from "utils/useBreakPoints";
import withSearch from "components/HOC/withSearch";
import { useDebounce } from "components/hooks/useDebounce";
import OrderDetails from "./OrderDetails";

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

  "& td.cancelled": {
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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%) !important",
  bgcolor: "background.default",
  border: "none",
  boxShadow: 0,
  px: 4,
};

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
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [targetOrderNumber, setTargetOrderNumber] = useState();

  const handleOrderDetailClick = (orderNumber) => {
    setTargetOrderNumber(orderNumber);
    setShowOrderModal(true);
  };

  const statusOptions = {
    "wait-for-pay": "در انتظار پرداخت",
    "in-progress": "در حال پردازش",
    cancelled: "لغو شده",
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
                  <IconButton
                    aria-label="show-order"
                    size="small"
                    onClick={() => handleOrderDetailClick(order.orderNumber)}
                  >
                    <ArrowBackIosNewIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Modal
        aria-labelledby="order-modal"
        open={showOrderModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        onBackdropClick={() => setShowOrderModal(false)}
      >
        <Fade in={showOrderModal}>
          <Box sx={modalStyle} className="col-12 col-sm-8 col-md-7 col-lg-5">
            <OrderDetails
              orderNumber={targetOrderNumber}
              onClose={() => setShowOrderModal(false)}
            />
          </Box>
        </Fade>
      </Modal>
    </StyledContainer>
  );
};

export default withSearch(OrdersList);
