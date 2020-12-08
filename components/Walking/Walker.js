import React, { useEffect, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import utils from "../../utils";

const Walker = ({ data }) => {
  return (
    <Marker coordinate={data}>
      <View>
        <Ionicons name={utils.isAndroid ? "md-paw" : "ios-paw"} size={36} />
      </View>
    </Marker>
  );
};

export default Walker;
