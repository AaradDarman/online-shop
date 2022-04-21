import React, { useRef, useState, useEffect } from "react";

import styled from "styled-components";
import { rgba } from "polished";
import { PhotoCamera } from "@mui/icons-material";

import ProductImage from "./ProductImage";

const Wraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    display: none;
  }
  .img-input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: 2px dashed ${({ theme }) => rgba(theme.palette.text.primary, 0.23)};
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 4px;
  }
  .product-images {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const ProductImagePicker = ({ images = [], index, onChange }) => {
  const [selectedImages, setSelectedImages] = useState(images);
  const imageInputRef = useRef(null);

  const handleAddImage = (event) => {
    if (event.target.files[0]) {
      console.log("images");
      console.log(images);
      onChange([...selectedImages, event.target.files[0]]);
      setSelectedImages((prev) => [...prev, event.target.files[0]]);
      imageInputRef.current.value = "";
    }
  };

  const handleDeleteImage = (targetImage) => {
    onChange(selectedImages.filter((image) => image !== targetImage));
    setSelectedImages(selectedImages.filter((image) => image !== targetImage));
  };

  useEffect(() => {
    setSelectedImages(images);
    // eslint-disable-next-line
  }, []);

  return (
    <Wraper className="product-image-picker">
      <label htmlFor={`icon-button-file-${index + 1}`} className="img-input">
        <input
          accept="image/*"
          id={`icon-button-file-${index + 1}`}
          type="file"
          onChange={handleAddImage}
          ref={imageInputRef}
        />
        <PhotoCamera />
      </label>
      <div className="product-images">
        {selectedImages?.length > 0 &&
          selectedImages.map((image) => (
            <ProductImage
              key={image?.name}
              image={image}
              onDelete={() => handleDeleteImage(image)}
            />
          ))}
      </div>
    </Wraper>
  );
};

export default ProductImagePicker;
