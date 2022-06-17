import { createContext } from "react";

export const orderContext = createContext({
  selectedAddress: {},
  setSelectedAddress: () => {},
  takeOrder: () => {},
  payBill: () => {},
  handleShowPaymentStatusDialog: () => {},
});
