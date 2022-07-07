import React from "react";

import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

import CategoryDropDown from "./CategoryDropDown";
import { useSelector } from "react-redux";

const Drawer = styled((props) => <MuiDrawer {...props} />)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: "none",
  },
}));

const CategoryNavigationDrawer = ({ isOpen, onOpen, onClose }) => {
  const { categories } = useSelector((state) => state);

  return (
    <Drawer anchor="left" open={isOpen} onOpen={onOpen} onClose={onClose}>
      <>
        {categories.entity.map((category) => (
          <CategoryDropDown key={category.name} {...category} />
        ))}
      </>
    </Drawer>
  );
};

export default CategoryNavigationDrawer;
