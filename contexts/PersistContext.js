import React, { createContext, useContext } from "react";

export const PersistContext = createContext();

export const PersistProvider = ({ persistor, children }) => {
  return (
    <PersistContext.Provider value={{ persistor }}>
      {children}
    </PersistContext.Provider>
  );
};

export const usePersistor = () => {
  const { persistor } = useContext(PersistContext);
  return persistor;
};
