import React, { useContext } from "react";

import {
  Button,
  Typography,
  Box,
  Modal,
  Fade,
  Backdrop,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled as MuiStyled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import _ from "lodash";

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

const CancelButton = MuiStyled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderColor: theme.palette.text.secondary,
  "&:hover": {
    borderColor: "initial",
    backgroundColor: "initial",
  },
}));

const DeleteAddressModal = ({ isOpen, onClose }) => {
  const { selectedAddress, setSelectedAddress } = useContext(orderContext);

  const { user } = useSelector((state) => state);

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
                حذف آدرس
              </Typography>
            </div>
            <IconButton className="align-self-start" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
          <Typography variant="body1" className="py-3">
            آیا از حذف این آدرس از لیست آدرس‌ها اطمینان دارید؟
          </Typography>
          <Stack spacing={1} direction="row" className="mt-3">
            <CancelButton
              variant="outlined"
              color="primary"
              size="small"
              onClick={onClose}
            >
              لغو
            </CancelButton>
            <Button
              //   onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="small"
            >
              حذف آدرس
            </Button>
          </Stack>
        </StyledBox>
      </Fade>
    </Modal>
  );
};

export default DeleteAddressModal;
