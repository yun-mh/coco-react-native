import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions } from "react-native";
import * as Location from "expo-location";
import { getPermission } from "../../../userPermissions";
import MapsPresenter from "./MapsPresenter";
import ENV from "../../../components/env";
import utils from "../../../utils";
import { CREATE_WALKER, GET_WALKER } from "../../../queries/Main/MainQueries";
import { useMutation, useQuery } from "@apollo/client";

// import { LogBox } from "react-native";
// import _ from "lodash";

// LogBox.ignoreLogs(["Setting a timer"]);
// const _console = _.clone(console);
// console.warn = (message) => {
//   if (message.indexOf("Setting a timer") <= -1) {
//     _console.warn(message);
//   }
// };

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 35.6679191;
const LONGITUDE = 139.4606805;
const LATITUDE_DELTA = 10;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Maps = ({ navigation, route }) => {
  let watchId;
  const [isPermitted, setIsPermitted] = useState(false);
  const [controlOpen, setControlOpen] = useState(false); // fix

  const [walker, setWalker] = useState();

  const { loading, data } = useQuery(GET_WALKER, {
    variables: {
      userId: route.params.userId,
    },
  });

  const [createWalkerMutation] = useMutation(CREATE_WALKER);

  const askPermission = async () => {
    try {
      const status = await getPermission("location");
      if (status === "granted") {
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
          enabledHighAccuracy: true,
        });
        setIsPermitted(true);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      console.log("check done");
    }
  };

  const startTracking = async () => {
    if (isPermitted) {
      try {
        // const res = await fetch(
        //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${ENV.googleApiKey}&language=en`
        // );
        // const resData = await res.json();
        // const address = resData.plus_code.compound_code.split(", ")[1];
        // // setChannels(address);
        watchPosition();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const exitScreen = () => {
    Alert.alert("終了", "お散歩の出会いを終了しますか？", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "終了",
        onPress: () => {
          console.log(watchId);
          // clear watchposition
          navigator.geolocation.clearWatch(watchId);
          navigation.goBack();
        },
        style: "destructive",
      },
    ]);
  };

  const toggleControl = () => {
    setControlOpen(!controlOpen);
  };

  const watchPosition = async () => {
    const { data } = await createWalkerMutation({
      // variables: {
      //   userId: route.params.userId,
      // },
    });
    console.log(data);
    if (data) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          // update my location locally
          // setCurrentLoc({
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude,
          //   latitudeDelta: LATITUDE_DELTA,
          //   longitudeDelta: LONGITUDE_DELTA,
          // });
          console.log(position);

          // send location info to server
        },
        (error) => console.log("Maps Error: ", error),
        {
          enableHighAccuracy: true,
          distanceFilter: 1000, //grab the location whenever the user's location changes by 100 meters
        }
      );
    }
  };

  // didMount && WillUnmount
  useEffect(() => {
    // check permission
    askPermission();
  }, []);

  useEffect(() => {
    if (!loading) {
      setWalker(data);
      console.log(walker);
    }
  }, [loading, data]);

  return (
    <MapsPresenter
      controlOpen={controlOpen}
      startTracking={startTracking}
      toggleControl={toggleControl}
      exitScreen={exitScreen}
    />
  );
};

export default Maps;
