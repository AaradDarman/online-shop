import React, { useEffect, useState } from "react";

import styled from "styled-components";
import Image from "next/image";

import api from "adapters/adapter";
import useBreakpoints from "utils/useBreakPoints";

const StyledWraper = styled.div`
  display: flex;
  align-items: stretch;
  padding: 0.8rem;
  .actions-wraper {
    border: 1px solid ${({ theme }) => theme.palette.grey[800]};
    border-radius: 4px;
  }
  .item-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
  }
`;

const OrderItem = ({ item }) => {
  const [product, setProduct] = useState(item);
  const [isLoading, setIsLoading] = useState(true);
  const { isLg } = useBreakpoints();

  const getProduct = async () => {
    try {
      const { status, data } = await api.getProduct(item?.productId);
      if (status === 200) {
        setProduct(data.product);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      return e;
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledWraper className="item" key={item.productId}>
      {!isLoading && (
        <Image
          src={product.images[0].imgSrc[0]}
          alt="product-image"
          width={isLg ? 64 : 32}
          height={isLg ? 64 : 32}
        />
      )}
    </StyledWraper>
  );
};

export default OrderItem;
