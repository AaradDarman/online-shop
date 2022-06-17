import React, { useState, useEffect } from "react";

import Image from "next/image";
import styled from "styled-components";
import { Radio, RadioGroup } from "@mui/material";

import useBreakpoints from "utils/useBreakPoints";

const StyledWraper = styled.div`
  display: flex;
  align-items: center;
`;

const ImageRadio = ({ image, index, ...otherProps }) => {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={
        <Image
          alt={`product-img-${index}`}
          width={50}
          height={50}
          src={image}
        />
      }
      icon={
        <Image
          alt={`product-img-${index}`}
          width={50}
          height={50}
          src={image}
        />
      }
      {...otherProps}
    />
  );
};

const ProductImage = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const { isMd } = useBreakpoints();

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <StyledWraper className="flex-column flex-md-row-reverse">
      <Image src={selectedImage} alt="product-image" width={512} height={512} />
      <RadioGroup
        aria-labelledby="selected-image-index"
        defaultValue={selectedImage}
        name="selected-index-radio-buttons-group"
        value={selectedImage}
        row={!isMd}
        onChange={(event) => setSelectedImage(event.target.value)}
      >
        {images.map((img, index) => (
          <ImageRadio key={img} value={img} image={img} index={index} />
        ))}
      </RadioGroup>
    </StyledWraper>
  );
};

export default ProductImage;
