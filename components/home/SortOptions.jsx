import React, { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SortIcon from "@mui/icons-material/Sort";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";

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

const options = {
  newest: "جدید ترین",
  bestSelling: "پرفروش ترین",
  mostVisited: "پربازدید ترین",
  cheapest: "ارزان ترین",
  mostExpensive: "گران ترین",
};

const SortOptions = ({ onSortChange }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="d-flex align-items-center">
      <div className="d-none d-md-inline-flex">
        <SortIcon />
        مرتب سازی:
      </div>
      <button className="d-inline-flex d-md-none" onClick={handleOpen}>
        <SortIcon />
        {!router.query.sortBy ? "جدیدترین" : options[router.query.sortBy]}
      </button>
      <Tabs
        className="d-none d-md-flex"
        value={!router.query.sortBy ? "newest" : router.query.sortBy}
        onChange={(event, value) => onSortChange(value)}
      >
        <Tab label="جدیدترین" value="newest" />
        <Tab label="پرفروش ترین" value="bestSelling" />
        <Tab label="پر بازدیدترین" value="mostVisited" />
        <Tab label="ارزانترین" value="cheapest" />
        <Tab label="گرانترین" value="mostExpensive" />
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
            <MenuItem
              selected={
                router.query.sortBy === "newest" || !router.query.sortBy
              }
              onClick={(event) => {
                onSortChange(event.target.dataset.value);
                handleClose();
              }}
              data-value="newest"
            >
              جدیدترین
            </MenuItem>
            <MenuItem
              selected={router.query.sortBy === "bestSelling"}
              onClick={(event) => {
                onSortChange(event.target.dataset.value);
                handleClose();
              }}
              data-value="bestSelling"
            >
              پرفروش ترین
            </MenuItem>
            <MenuItem
              selected={router.query.sortBy === "mostVisited"}
              onClick={(event) => {
                onSortChange(event.target.dataset.value);
                handleClose();
              }}
              data-value="mostVisited"
            >
              پر بازدیدترین
            </MenuItem>
            <MenuItem
              selected={router.query.sortBy === "cheapest"}
              onClick={(event) => {
                onSortChange(event.target.dataset.value);
                handleClose();
              }}
              data-value="cheapest"
            >
              ارزانترین
            </MenuItem>
            <MenuItem
              selected={router.query.sortBy === "mostExpensive"}
              onClick={(event) => {
                onSortChange(event.target.dataset.value);
                handleClose();
              }}
              data-value="mostExpensive"
            >
              گرانترین
            </MenuItem>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
};

export default SortOptions;
