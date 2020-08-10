import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";
import { usePersistor } from "./PersistContext";
import { useApolloClient } from "@apollo/client";

export const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const persistor = usePersistor();
  const client = useApolloClient();

  const logUserIn = async (token) => {
    try {
      await client.resetStore();
      await persistor.resume();
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("jwt", token);
      setIsLoggedIn(true);
    } catch (error) {
      console.warn(error);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem("isLoggedIn", "false");
      await AsyncStorage.setItem("jwt", "");
      setIsLoggedIn(false);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};
