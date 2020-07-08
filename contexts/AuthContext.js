import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);

  const logUserIn = async (token) => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("jwt", token);
      setIsLoggedIn(true);
    } catch (error) {
      console.warn(error);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      await AsyncStorage.setItem("jwt", "");
      setIsLoggedIn(false);
    } catch (error) {
      console.warn(error);
    }
  };

  const tempLogIn = async () => {
    await AsyncStorage.setItem("isLoggedIn", "true");
    await AsyncStorage.setItem("jwt", "asdassdasdasdasdasd");
    setIsLoggedIn(true);
  }; // delete later

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logUserIn, logUserOut, tempLogIn }}
    >
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

export const useTempLogIn = () => {
  const { tempLogIn } = useContext(AuthContext);
  return tempLogIn;
}; // delete later
