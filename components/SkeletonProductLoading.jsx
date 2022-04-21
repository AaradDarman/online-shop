import React from "react";

import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Skeleton } from "@mui/material";

const Wraper = styled.div`
  position: relative;
  z-index: 1;
  .img-wraper {
    position: relative;
  }
  .product-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap-reverse;
  }
`;

const SkeletonProductLoading = () => {
  return (
    <Wraper>
      <Card
        sx={{
          bgcolor: "secondary.light",
          backgroundImage: "none",
          position: "relative",
        }}
      >
        <CardActionArea>
          <div className="img-wraper">
            <Skeleton
              sx={{ height: 427 }}
              animation="wave"
              variant="rectangular"
            />
          </div>
          <CardContent
            sx={{
              bgcolor: "secondary.light",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Skeleton sx={{ height: 32 }} animation="wave" />
            <div className="product-info">
              <Skeleton sx={{ flex: 0.5, height: 32 }} animation="wave" />
              <Skeleton sx={{ flex: 0.3, height: 35 }} animation="wave" />
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Wraper>
  );
};

export default SkeletonProductLoading;
