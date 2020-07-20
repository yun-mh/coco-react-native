import React from "react";
import { Image } from "react-native";

const LogoTitle = () => (
  <Image
    source={require("../../assets/logo_title.png")}
    style={{ width: 26, height: 26 }}
  />
);

export default LogoTitle;
