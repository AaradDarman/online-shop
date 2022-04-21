import React, { useContext } from "react";

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
import ClearIcon from "@mui/icons-material/Clear";
import styled from "styled-components";
import { styled as MuiStyled } from "@mui/material/styles";
import Image from "next/image";

import ProductPriceInput from "./ProductPriceInput";
import { productContext } from "../../../../context/product-context";

const StyledTableRow = MuiStyled(TableRow)(({ theme }) => ({
  "&": {
    backgroundColor: theme.palette.background.default,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.secondary.light,
  },
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

const StyledTextField = MuiStyled(TextField)(({ theme }) => ({
  maxWidth: "50px",
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
    textAlign: "center",
  },
}));

const DeleteButton = MuiStyled(IconButton)(({ theme }) => ({
  "&": {
    position: "absolute",
    left: "5px",
    top: "50%",
    transform: "translateY(-50%)",
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

const ProductInventory = ({ onChange, inventory, error, helperText }) => {
  const { productImages } = useContext(productContext);

  const handleInventoryChange = (quantity, tItem) => {
    let targetItemIndex = inventory.findIndex(
      (item) => item.size === tItem.size && item.color === tItem.color
    );
    let targetItem = inventory[targetItemIndex];
    targetItem.quantity = +quantity;
    inventory[targetItemIndex] = targetItem;
    onChange([...inventory]);
  };

  const handlePriceChange = (price, tItem) => {
    let targetItemIndex = inventory.findIndex(
      (item) => item.size === tItem.size && item.color === tItem.color
    );
    let targetItem = inventory[targetItemIndex];
    targetItem.price = +price;
    inventory[targetItemIndex] = targetItem;
    onChange([...inventory]);
  };

  const handleDeleteItem = (targetItem) => {
    onChange(inventory.filter((item) => item !== targetItem));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 300 }}
          aria-label="product inventory table"
          size="small"
        >
          <TableHead>
            <TableRow sx={{ "& th": { textAlign: "center" } }}>
              {/* <TableCell></TableCell> */}
              <TableCell>سایز</TableCell>
              <TableCell>رنگ</TableCell>
              <TableCell>موجودی</TableCell>
              <TableCell>قیمت(تومان)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <StyledTableRow
                key={`${item.size}${item.color}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <DeleteButton
                    tabIndex={-1}
                    color="error"
                    aria-label="delete color"
                    className="delete-btn"
                    onClick={() => handleDeleteItem(item)}
                  >
                    <ClearIcon fontSize="small" />
                  </DeleteButton>
                  {item?.size || "-"}
                </TableCell>
                <TableCell>
                  <ProductColor>
                    {/* <img
                      src={URL.createObjectURL(
                        productImages.find(
                          (image) => image.color === item.color
                        )?.images[0]
                      )}
                      alt="product-pic"
                    /> */}
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
                    <span>{item.color}</span>
                  </ProductColor>
                </TableCell>
                <TableCell>
                  <StyledTextField
                    type="number"
                    InputProps={{
                      inputProps: {
                        min: 1,
                      },
                    }}
                    variant="standard"
                    onChange={(e) =>
                      handleInventoryChange(e.target.value, item)
                    }
                    value={item?.quantity}
                  />
                </TableCell>
                <TableCell>
                  <ProductPriceInput
                    onChange={(price) => handlePriceChange(price, item)}
                    value={item?.price}
                  />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormHelperText
        // sx={{ marginRight: "14px", marginLeft: "14px" }}
        error={error}
        id="inventory-error"
      >
        {helperText}
      </FormHelperText>
    </>
  );
};

export default React.memo(ProductInventory);
