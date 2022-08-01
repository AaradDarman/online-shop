import React, { useContext } from "react";

import {
  Typography,
  Box,
  Modal,
  Fade,
  Backdrop,
  IconButton,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled as MuiStyled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import _ from "lodash";

import Icon from "components/shared/Icon";
import { appContext } from "context/app-context";
import { orderContext } from "context/order-context";

const StyledBox = MuiStyled(Box)(({ theme }) => ({
  "&": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) !important",
    backgroundColor: theme.palette.background.default,
    border: "none",
    boxShadow: 0,
    px: 4,
    overFlow: "hidden",
    maxHeight: "90vh",
  },
  "& .form-wraper": {
    width: "100%",
    overflowY: "scroll",
  },
  "& .bottom-border": {
    borderBottom: `1px solid ${theme.palette.grey[800]}`,
  },
  "& .new-address-btn": {
    cursor: "pointer",
  },
}));

const SelectAddressModal = ({ isOpen, onClose }) => {
  const { setAddressModalOpen } = useContext(appContext);
  const { selectedAddress, setSelectedAddress } = useContext(orderContext);
  const handleChangeSelectedAddress = (e) => {
    setSelectedAddress(JSON.parse(e.target.value));
    onClose();
  };
  const { user } = useSelector((state) => state);

  const Label = ({ item }) => {
    return (
      <Box className="d-flex flex-column align-items-start py-2">
        <Typography>{item.postalAddress}</Typography>
        <Typography className="py-1">
          <Icon icon="address" size={20} className="icon" />
          {item.city}
        </Typography>
        <Typography className="py-1">
          <Icon icon="post" size={22} className="icon" />
          {item?.postalCode}
        </Typography>
        <Typography className="py-1">
          <Icon icon="call" size={20} className="icon" />
          {item.receiver.phoneNumber}
        </Typography>
        <Typography className="py-1">
          <Icon icon="profile" size={20} className="icon" />
          {`${item.receiver.fName} ${item.receiver.lName}`}
        </Typography>
      </Box>
    );
  };

  return (
    <Modal
      disable
      aria-labelledby="edit-product-modal-title"
      aria-describedby="edit-product-modal-description"
      open={isOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <StyledBox className="d-flex flex-column align-items-start col-12 col-sm-8 col-md-7 col-lg-5 px-1 px-sm-3 p-3">
          <div className="w-100 py-3 d-flex align-items-center justify-content-between bottom-border">
            <div className="d-flex flex-column">
              <Typography variant="h6" component="strong">
                انتخاب آدرس
              </Typography>
            </div>
            <IconButton className="align-self-start" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
          <div
            onClick={() => setAddressModalOpen(true)}
            className="new-address-btn w-100 py-3 d-flex align-items-center justify-content-between bottom-border"
          >
            <div className="d-flex align-items-center">
              <Icon icon="location" size={24} />
              <Typography variant="h6" component="strong">
                افزودن آدرس جدید
              </Typography>
            </div>
            <IconButton className="align-self-start" onClick={onClose}>
              <Icon icon="chevron-left" size={24} />
            </IconButton>
          </div>
          <FormControl className="form-wraper">
            <RadioGroup
              className="mt-3"
              value={JSON.stringify(selectedAddress)}
              onChange={handleChangeSelectedAddress}
            >
              {user?.user?.addresses.map((address) => (
                <FormControlLabel
                  className="d-flex align-items-start mx-0"
                  key={address._id}
                  value={JSON.stringify(address)}
                  control={<Radio />}
                  label={<Label item={address} />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </StyledBox>
      </Fade>
    </Modal>
  );
};

export default SelectAddressModal;
