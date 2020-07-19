import React from "react";
import { Image, View, Text } from "react-native";

const Dog = ({ image, name }) => {
  return (
    <View style={{ width: 100, paddingHorizontal: 15, alignItems: "center" }}>
      <Image
        source={{ uri: image }}
        style={{ width: 70, height: 50, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 10 }}>{name}</Text>
    </View>
  );
};

export default Dog;
