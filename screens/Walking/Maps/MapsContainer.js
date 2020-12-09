import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions } from "react-native";
import * as Location from "expo-location";
import { getPermission } from "../../../userPermissions";
import MapsPresenter from "./MapsPresenter";
import ENV from "../../../components/env";
import utils from "../../../utils";
import {
  CREATE_WALKER,
  GET_WALKER,
  INSERT_LOCATION,
} from "../../../queries/Main/MainQueries";
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
  const [watchId, setWatchId] = useState(null);
  const [isPermitted, setIsPermitted] = useState(false);
  const [controlOpen, setControlOpen] = useState(false); // fix
  const [isStarted, setIsStarted] = useState(false);
  const [walker, setWalker] = useState(undefined);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const { loading, data } = useQuery(GET_WALKER);

  const [createWalkerMutation] = useMutation(CREATE_WALKER, {
    variables: { userId: route.params.userId },
  });

  const [insertLocationMutation] = useMutation(INSERT_LOCATION);

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
    }
  };

  const startTracking = async () => {
    if (isPermitted) {
      try {
        if (walker === undefined) {
          const {
            data: { createWalker },
          } = await createWalkerMutation();
          if (createWalker) {
            setWalker(createWalker.id);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsStarted(true);
      }
    }
  };

  const stopTracking = () => {
    navigator.geolocation.clearWatch(watchId);
    setIsStarted(false);
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
    if (walker) {
      const watch = navigator.geolocation.watchPosition(
        async (position) => {
          // update my location locally
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);

          // send location info to server
          try {
            const {
              data: { insertLocation },
            } = await insertLocationMutation({
              variables: {
                walkerId: walker,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            });
            console.log(insertLocation);
          } catch (e) {
            console.warn(e);
          }
        },
        (error) => console.log("マップエラー", error),
        {
          enableHighAccuracy: true,
          distanceFilter: 1000, //grab the location whenever the user's location changes by 100 meters
        }
      );
      setWatchId(watch);
    }
  };

  // didMount && WillUnmount
  useEffect(() => {
    // check permission
    askPermission();
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (!loading) {
      data?.getWalker?.length === 0
        ? setWalker(undefined)
        : setWalker(data?.getWalker[0]?.id);
    }
  }, [data]);

  useEffect(() => {
    if (walker !== undefined && isStarted === true) watchPosition();
  }, [isStarted, walker]);

  return (
    <MapsPresenter
      isStarted={isStarted}
      controlOpen={controlOpen}
      startTracking={startTracking}
      stopTracking={stopTracking}
      toggleControl={toggleControl}
      exitScreen={exitScreen}
    />
  );
};

export default Maps;
