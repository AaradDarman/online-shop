import React from "react";

import PulseLoader from "react-spinners/PulseLoader";
import { css as Loadercss } from "@emotion/react";
import ReactModal from "react-modal";
import { useTheme } from '@mui/material';
ReactModal.setAppElement("#__next");

const LoadingSpinner = ({ show }) => {
  const theme = useTheme();
  const override = Loadercss`
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 9999;
    transform: translate(-50%, -50%);
  `;

  return (
    <ReactModal
      isOpen={show}
      className="loading-spinner-modal"
      overlayClassName="loading-spinner-overlay"
    >
      <PulseLoader
        css={override}
        size={20}
        color={theme.palette.primary.main}
        loading={true}
      />
    </ReactModal>
  );
};

export default LoadingSpinner;
