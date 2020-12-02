import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import PubNubReact from "pubnub-react";
import { getPermission } from "../../../userPermissions";
import MapsPresenter from "./MapsPresenter";
import envs from "../../../components/env";

const Maps = ({ navigation }) => {
  const pubnub = new PubNubReact({
    publishKey: envs.pubnubPublishKey,
    subscribeKey: envs.pubnubSubscribeKey,
  });

  const [isPermitted, setIsPermitted] = useState(false);
  const [channel, setChannel] = useState();
  const [region, setRegion] = useState({
    latitude: 32.9998961,
    longitude: 138.4293071,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });
  const [controlOpen, setControlOpen] = useState(true);

  const askPermission = async () => {
    try {
      const status = await getPermission("location");
      if (status === "granted") {
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
          enabledHighAccuracy: true,
        });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
        setIsPermitted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    askPermission();
    pubnub.init();
  }, []);

  const toggleControl = () => {
    setControlOpen(!controlOpen);
  };

  const startTracking = async () => {};

  const exitScreen = () => {
    Alert.alert("終了", "お散歩の出会いを終了しますか？", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "終了",
        onPress: () => {
          navigation.goBack();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <MapsPresenter
      region={region}
      controlOpen={controlOpen}
      toggleControl={toggleControl}
      exitScreen={exitScreen}
    />
  );
};

export default Maps;
