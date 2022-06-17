import React, { useContext } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SortIcon from "@mui/icons-material/Sort";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import MenuItem from "@mui/material/MenuItem";

import { productsContext } from "context/products-context";

function a11yProps(index) {
  return {
    id: `sort-tab-${index}`,
    "aria-controls": `sort-tabpanel-${index}`,
  };
}

const modalStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  bgcolor: "background.default",
  border: "none",
  boxShadow: 0,
  p: 4,
};

const options = [
  "جدید ترین",
  "پرفروش ترین",
  "پربازدید ترین",
  "ارزان ترین",
  "گران ترین",
];

const optionsCase = {
  "جدید ترین": "newest",
  "پرفروش ترین": "bestSelling",
  "پربازدید ترین": "mostVisited",
  "ارزان ترین": "cheapest",
  "گران ترین": "mostExpensive",
};

const SortOptions = ({ onSortChange }) => {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onSortChange(optionsCase[options[newValue]]);
  };

  return (
    <div className="d-flex align-items-center">
      <div className="d-none d-md-inline-flex">
        <SortIcon />
        مرتب سازی:
      </div>
      <button className="d-inline-flex d-md-none" onClick={handleOpen}>
        <SortIcon />
        {options[value]}
      </button>
      <Tabs
        className="d-none d-md-flex"
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {options.map((option, index) => (
          <Tab label={option} key={option} {...a11yProps(index)} />
        ))}
      </Tabs>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction="up" in={open}>
          <Box sx={modalStyle}>
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === value}
                onClick={(event) => {
                  handleChange(event, index);
                  handleClose();
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Box>
        </Slide>
      </Modal>
    </div>
  );
};

export default SortOptions;
