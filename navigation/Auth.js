import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Auth/Welcome";
import SignUp from "../screens/Auth/SignUp";
import SignIn from "../screens/Auth/SignIn";
import RegisterDog from "../screens/Auth/RegisterDog";
import PasswordReset from "../screens/Auth/PasswordReset";
import CodeCheck from "../screens/Auth/CodeCheck";
import PasswordChange from "../screens/Auth/PasswordChange";
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
      name="RegisterDog"
      component={RegisterDog}
      options={{ headerTitle: "犬登録" }}
    />
    <Auth.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerTitle: "ログイン" }}
    />
    <Auth.Screen
      name="PasswordReset"
      component={PasswordReset}
      options={{ headerTitle: "パスワード再設定" }}
    />
    <Auth.Screen
      name="CodeCheck"
      component={CodeCheck}
      options={{ headerTitle: "コード入力" }}
    />
    <Auth.Screen
      name="PasswordChange"
      component={PasswordChange}
      options={{ headerTitle: "パスワード再設定" }}
    />
  </Auth.Navigator>
);
