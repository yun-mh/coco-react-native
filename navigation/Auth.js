import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Auth/Welcome";
import SignUp from "../screens/Auth/SignUp";
import SignIn from "../screens/Auth/SignIn";
import BackBtn from "../components/BackBtn";

const Auth = createStackNavigator();

export default () => (
  <Auth.Navigator
    mode="modal"
    headerMode="screen"
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackImage: () => <BackBtn />,
      headerTitleAlign: "center",
    }}
  >
    <Auth.Screen
      name="Welcome"
      component={Welcome}
      options={{ headerTransparent: true, headerTitle: "" }}
    />
    <Auth.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerTitle: "会員登録" }}
    />
    <Auth.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerTitle: "ログイン" }}
    />
  </Auth.Navigator>
);
