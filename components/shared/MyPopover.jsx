import React, { useState } from "react";

import { IconButton, Popover, Typography, useTheme } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Icon from "./Icon";

const MyPopover = ({ address, onDeleteClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();

  return (
    <>
      <IconButton
        id={`btn-${address._id}`}
        onClick={(e) => {
          setIsOpen(true);
          setAnchorEl(e.currentTarget);
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={`popover-${address._id}`}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          onClick={() => {
            onDeleteClick();
            setIsOpen(false);
          }}
          variant="subtitle2"
          sx={{
            p: 1,
            cursor: "pointer",
            backgroundColor: "background.default",
          }}
        >
          <Icon icon="delete" size={22} color={theme.palette.error.main} />
          حذف آدرس
        </Typography>
      </Popover>
    </>
  );
};

export default MyPopover;
