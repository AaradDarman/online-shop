import { createContext } from "react";

export const appContext = createContext({
  toggleTheme: () => {},
  addressModalOpen: false,
  setAddressModalOpen: () => {},
});
