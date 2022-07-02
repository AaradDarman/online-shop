import React from "react";

import MuiSwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";

import CategoryDropDown from "./CategoryDropDown";
import { useSelector } from "react-redux";

const SwipeableDrawer = styled((props) => <MuiSwipeableDrawer {...props} />)(
  ({ theme }) => ({
    "& .MuiDrawer-paper": {
      backgroundColor: theme.palette.secondary.main,
      backgroundImage: "none",
    },
  })
);

const CategoryNavigationDrawer = ({ isOpen, onOpen, onClose }) => {
  const { categories } = useSelector((state) => state);

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <>
        {categories.entity.map((category) => (
          <CategoryDropDown key={category.name} {...category} />
        ))}
      </>
    </SwipeableDrawer>
  );
};

export default CategoryNavigationDrawer;
