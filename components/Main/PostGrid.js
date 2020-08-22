import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PostGrid = ({ id, files = [] }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Post", { id })}>
      <Image
        source={{ uri: files[0].url }}
        style={{ width: wp("100%") / 3, height: hp("100%") / 6 }}
      />
    </TouchableOpacity>
  );
};

export default PostGrid;
