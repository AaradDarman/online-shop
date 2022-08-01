import React, { useState } from "react";

import { appContext } from "./app-context";

const AppContext = ({ children, ...props }) => {
  const { toggleTheme } = props;
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  return (
    <appContext.Provider
      value={{
        toggleTheme,
        addressModalOpen,
        setAddressModalOpen,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppContext;
