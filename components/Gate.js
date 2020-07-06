import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useIsLoggedIn } from "../contexts/AuthContext";
import Auth from "../navigation/Auth";
import Main from "../navigation/Main";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <NavigationContainer>
      {isLoggedIn ? <Main /> : <Auth />}
    </NavigationContainer>
  );
};
