import React, { useState, memo } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useRouter } from "next/router";

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

const options = ["جاری", "تحویل شده", "لغو شده"];

const optionsCase = {
  جاری: "in-progress",
  "تحویل شده": "delivered",
  "لغو شده": "canceled",
};

const OrdersSortOption = ({ onSortChange }) => {
  const router = useRouter();
  const [value, setValue] = useState(
    Object.values(optionsCase).indexOf(router.query.activeTab) != -1
      ? Object.values(optionsCase).indexOf(router.query.activeTab)
      : 0
  );
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onSortChange(optionsCase[options[newValue]]);
  };

  return (
    <div className="d-flex align-items-center">
      <Tabs
        // className="d-none d-md-flex"
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <Tab label={option} key={option} {...a11yProps(index)} />
        ))}
      </Tabs>
    </div>
  );
};

export default memo(OrdersSortOption);
