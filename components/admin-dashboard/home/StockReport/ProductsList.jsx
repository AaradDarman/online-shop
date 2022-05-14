import React, { useEffect } from "react";

import { styled as MuiStyled } from "@mui/material/styles";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { rgba } from "polished";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PulseLoader from "react-spinners/PulseLoader";
import { css as Loadercss } from "@emotion/react";

import { useDebounce } from "components/hooks/useDebounce";
import withSearch from "components/HOC/withSearch";
import { numberWithCommas } from "utils/number-helper";
import { getPersianDate } from "utils/date-helper";
import useBreakpoints from "utils/useBreakPoints";

const StyledTable = MuiStyled(Table)(({ theme }) => ({
  "& td, th": {
    border: 0,
    padding: "6px",
    zIndex: 1,
  },
  "& td, & th": {
    [theme.breakpoints.down("lg")]: {
      padding: "6px 6px",
    },
  },
  "& td span": {
    borderRadius: "5px",
    padding: "2px 4px",
    display: "inline-block",
    fontSize: "0.8rem",
  },
  "& th span": {
    display: "flex",
    alignItems: "center",
  },
  "& td:nth-child(5)": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& td.in-stock": {
    span: {
      color: theme.palette.success.main,
      backgroundColor: rgba(theme.palette.success.main, 0.2),
    },
  },
  "& td.low-stock": {
    span: {
      color: theme.palette.warning.main,
      backgroundColor: rgba(theme.palette.warning.main, 0.2),
    },
  },
  "& td.out-of-stock": {
    span: {
      color: theme.palette.error.main,
      backgroundColor: rgba(theme.palette.error.main, 0.2),
    },
  },
  "& th:not(:nth-child(1),:nth-child(2),:nth-child(5))": {
    cursor: "pointer",
  },
}));

const StyledTableCell = MuiStyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = MuiStyled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.secondary.light,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.secondary.main,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
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

const ProductsList = ({
  productsStock,
  searchTerm,
  sortBy,
  handleChangeSort,
  handleChangeSearch,
  isLoading,
}) => {
  let debouncedSeasrchTerm = useDebounce(searchTerm, 500);
  const breakPoints = useBreakpoints();
  const theme = useTheme();

  const checkStockStatus = (quantity) => {
    return quantity === 0
      ? "out-of-stock"
      : quantity >= 10
      ? "in-stock"
      : "low-stock";
  };

  let stockOptions = {
    "in-stock": "موجود",
    "low-stock": "رو به اتمام",
    "out-of-stock": "اتمام",
  };

  useEffect(() => {
    handleChangeSearch(debouncedSeasrchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSeasrchTerm]);

  return (
    <StyledContainer {...breakPoints}>
      <StyledTable
        stickyHeader
        aria-label="product inventory table"
        size="small"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>نام محصول</StyledTableCell>
            <StyledTableCell>رنگ/سایز</StyledTableCell>
            <StyledTableCell
              className="d-none d-md-table-cell"
              onClick={() => handleChangeSort("createAt")}
            >
              <span>
                تاریخ موجود شدن
                {sortBy.sortLabel === "createAt" ? (
                  sortBy.desc ? (
                    <ArrowUpwardIcon fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" />
                  )
                ) : (
                  <ArrowUpwardIcon fontSize="small" />
                )}
              </span>
            </StyledTableCell>
            <StyledTableCell onClick={() => handleChangeSort("price")}>
              <span>
                قیمت
                {sortBy.sortLabel === "price" ? (
                  sortBy.desc ? (
                    <ArrowUpwardIcon fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" />
                  )
                ) : (
                  <ArrowUpwardIcon fontSize="small" />
                )}
              </span>
            </StyledTableCell>
            <StyledTableCell className="d-none d-sm-table-cell">
              وضعیت موجودی
            </StyledTableCell>
            <StyledTableCell onClick={() => handleChangeSort("quantity")}>
              <span>
                موجودی
                {sortBy.sortLabel === "quantity" ? (
                  sortBy.desc ? (
                    <ArrowUpwardIcon fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" />
                  )
                ) : (
                  <ArrowUpwardIcon fontSize="small" />
                )}
              </span>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <PulseLoader
              css={override}
              size={10}
              color={theme.palette.primary.main}
              loading={true}
            />
          ) : (
            productsStock?.map((product) => (
              <StyledTableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{`${product.color}${
                  " - " + product.size
                }`}</TableCell>
                <TableCell className="d-none d-md-table-cell">
                  {getPersianDate(product.createAt)}
                </TableCell>
                <TableCell>{numberWithCommas(product.price)}</TableCell>
                <TableCell
                  className={`d-none d-sm-table-cell ${checkStockStatus(
                    product.quantity
                  )}`}
                >
                  <span>
                    {stockOptions[checkStockStatus(product.quantity)]}
                  </span>
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </StyledTable>
    </StyledContainer>
  );
};

export default withSearch(ProductsList);
