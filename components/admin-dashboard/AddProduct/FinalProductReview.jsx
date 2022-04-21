import React, { useContext } from "react";

import styled from "styled-components";
import _ from "lodash";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled as MuiStyled } from "@mui/material/styles";
import Image from "next/image";

import { numberWithCommas } from "../../../utils/number-helper";
import { productContext } from "../../../context/product-context";

const Wraper = styled.div`
  .product-info h5 {
    color: ${({ theme }) => theme.palette.text.primary};
  }
  .product-info p {
    color: ${({ theme }) => theme.palette.text.secondary};
    max-height: 72px;
    overflow: auto;
  }
`;

const StyledTableRow = MuiStyled(TableRow)(({ theme }) => ({
  "&": {
    backgroundColor: theme.palette.background.default,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.secondary.light,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td": {
    textAlign: "center",
  },
  "& td:first-child": {
    textTransform: "uppercase",
    position: "relative",
    fontFamily: "sans-serif",
  },
}));

const ProductColor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 4px;
  }
`;

const FinalProductReview = () => {
  const {
    productImages,
    productName,
    productDescription,
    productInventory,
  } = useContext(productContext);

  return (
    <Wraper>
      <div className="product-info">
        <h5>{productName}</h5>
        <p>{productDescription}</p>
      </div>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 300 }}
          aria-label="product inventory table"
          size="small"
        >
          <TableHead>
            <TableRow sx={{ "& th": { textAlign: "center" } }}>
              <TableCell>سایز</TableCell>
              <TableCell>رنگ</TableCell>
              <TableCell>موجودی</TableCell>
              <TableCell>قیمت(تومان)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productInventory.map((item) => (
              <StyledTableRow
                key={`${item.size}${item.color}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item?.size || "-"}</TableCell>
                <TableCell>
                  <ProductColor>
                    <Image
                      src={URL.createObjectURL(
                        productImages.find(
                          (image) => image.color === item.color
                        )?.images[0]
                      )}
                      alt="product-pic"
                      width={30}
                      height={30}
                    />
                    <span>{item?.color}</span>
                  </ProductColor>
                </TableCell>
                <TableCell>{item?.quantity}</TableCell>
                <TableCell>{numberWithCommas(item?.price)}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wraper>
  );
};

export default FinalProductReview;
