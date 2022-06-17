import React, { useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { orderContext } from "./order-context";
import PaymentStatusDialog from "components/PaymentStatusDialog";

const OrderContext = ({ children }) => {
  const [selectedAddress, setSelectedAddress] = useState({});
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [status, setStatus] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const { user } = useSelector((state) => state);
  const router = useRouter();

  const handleShowPaymentStatusDialog = (
    status,
    orderNumber,
    trackingNumber
  ) => {
    setStatus(status);
    setOrderNumber(orderNumber);
    setTrackingNumber(trackingNumber);
    setShowStatusDialog(true);
  };

  const takeOrder = async () => {
    try {
      const { data, status } = await axios.post("/api/order", {
        client: user.user._id,
        address: selectedAddress._id,
      });
      if (status === 200) {
        router.push(data.paymentUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const payBill = async (orderId) => {
    try {
      const { data, status } = await axios.post("/api/order/pay", {
        orderId,
      });
      if (status === 200) {
        router.push(data.paymentUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePaymentStatusDialog = () => {
    setShowStatusDialog(false);
    router.replace("/profile/orders", undefined, { shallow: true });
  };

  return (
    <orderContext.Provider
      value={{
        selectedAddress,
        setSelectedAddress,
        takeOrder,
        payBill,
        handleShowPaymentStatusDialog,
      }}
    >
      {children}
      <PaymentStatusDialog
        isOpen={showStatusDialog}
        onClose={handleClosePaymentStatusDialog}
        status={status}
        orderNumber={orderNumber}
        trackingNumber={trackingNumber}
      />
    </orderContext.Provider>
  );
};

export default OrderContext;
