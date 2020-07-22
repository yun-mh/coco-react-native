import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const Dog = ({ image, name, onPress }) => {
  return (
    <TouchableOpacity
      style={{ width: 100, paddingHorizontal: 15, alignItems: "center" }}
      onPress={onPress}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 70, height: 50, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 10 }}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Dog;
