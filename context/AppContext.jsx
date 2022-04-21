import React from "react";

import { appContext } from "./app-context";

const AppContext = ({ children, ...props }) => {
  const { toggleTheme } = props;
  return (
    <appContext.Provider
      value={{
        toggleTheme,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppContext;
