import React from "react";

import {
  FormHelperText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled as MuiStyled } from "@mui/material/styles";

import ProductImagePicker from "./ProductImagePicker";

const StyledTableRow = MuiStyled(TableRow)(({ theme }) => ({
  "&": {
    backgroundColor: theme.palette.background.default,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td": {
    textAlign: "center",
  },
}));

const Index = ({ colors, images, onChange, error, helperText }) => {
  const handleChangeImages = (color, selectedImages) => {
    let imageIndex = images.findIndex((image) => image.color === color);
    if (imageIndex !== -1) {
      let targetImage = images[imageIndex];
      targetImage.images = selectedImages;
      images[imageIndex] = targetImage;
      onChange(images);
    } else {
      onChange([...images, { color, images: selectedImages }]);
    }
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
              <TableCell>رنگ</TableCell>
              <TableCell>تصاویر</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colors.map((color, index) => (
              <StyledTableRow
                key={`${color}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <span>{color}</span>
                </TableCell>
                <TableCell>
                  <ProductImagePicker
                    index={index}
                    images={
                      images.find((image) => image.color === color)?.images
                    }
                    onChange={(selectedImages) =>
                      handleChangeImages(color, selectedImages)
                    }
                  />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormHelperText error={error} id="images-error">
        {helperText}
      </FormHelperText>
    </>
  );
};

export default Index;
