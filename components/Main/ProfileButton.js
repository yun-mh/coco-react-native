import React from "react";
import { Image } from "react-native";

const ProfileButton = () => {
  return (
    <Image
      source={require("../../assets/logo_title.png")}
      style={{ width: 30, height: 30 }}
    />
  );
};

export default ProfileButton;
