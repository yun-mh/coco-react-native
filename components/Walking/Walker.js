import React, { useEffect, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import utils from "../../utils";

const Walker = ({ data }) => {
  const [coordinate, setCoordinate] = useState({
    latitude: data?.location?.latitude,
    longitude: data?.location?.longitude,
  });

  //   const [walkerS, setWalkerS] = useState(
  //     walker
  //       ? walker
  //       : { uid: "noWalker", location: { latitude: 0, longitude: 0 } }
  //   );

  useEffect(() => {
    if (data) {
      setCoordinate({
        latitude: data?.location?.latitude,
        longitude: data?.location?.longitude,
      });
    }
  }, []);

  const ref = useRef(null);

  return (
    <Marker coordinate={coordinate} ref={ref}>
      <View>
        <Ionicons name={utils.isAndroid ? "md-paw" : "ios-paw"} size={36} />
      </View>
    </Marker>
  );
};

export default Walker;
