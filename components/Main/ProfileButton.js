import React, { useLayoutEffect } from "react";
import { Image, View } from "react-native";
import Loader from "./Loader";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileButton = ({ loading, data }) => (
  <View style={{ marginRight: 8 }}>
    {loading ? <Loader /> : (
      <TouchableOpacity>
        <Image
          source={{ uri: data.viewMyself.avatar }}
          style={{ width: 30, height: 30, borderRadius: 15 }}
        />
      </TouchableOpacity>)
    }
  </View>
  );

export default ProfileButton;
