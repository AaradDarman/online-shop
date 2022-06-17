import React from "react";

import styled from "styled-components";

import Item from "./Item";

const StyledWraper = styled.section`
  border: 1px solid ${({ theme }) => theme.palette.grey[800]};
  border-radius: 4px;
`;

const CartItems = ({ items, className }) => {
  return (
    <StyledWraper className={`items ms-0 ms-lg-2 ${className}`}>
      {items.map((item) => (
        <Item key={item.productId} item={item} />
      ))}
    </StyledWraper>
  );
};

export default CartItems;
