import React, { useLayoutEffect } from "react";
import { Image, View } from "react-native";
import Loader from "./Loader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ProfileButton = ({ loading, data }) => {
  const navigation = useNavigation();

  return (
    <View style={{ marginRight: 8 }}>
      {loading ? (
        <Loader />
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile", { id: data.id })}
        >
          <Image
            source={{ uri: data.viewMyself.avatar }}
            style={{ width: 30, height: 30, borderRadius: 15 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileButton;
