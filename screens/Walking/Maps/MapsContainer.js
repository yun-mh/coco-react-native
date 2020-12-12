import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions } from "react-native";
import * as Location from "expo-location";
import { getPermission } from "../../../userPermissions";
import MapsPresenter from "./MapsPresenter";
import {
  CREATE_WALKER,
  MODIFY_WALKER,
  GET_WALKER,
  GET_WALKERS,
  INSERT_LOCATION,
  GET_NEW_WALKER,
} from "../../../queries/Main/MainQueries";
import { useMutation, useQuery, useSubscription } from "@apollo/client";

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
const LATITUDE_DELTA = 100;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Maps = ({ navigation, route }) => {
  const [watchId, setWatchId] = useState(null);
  const [isPermitted, setIsPermitted] = useState(false);
  const [controlOpen, setControlOpen] = useState(false); // fix
  const [isStarted, setIsStarted] = useState(false);
  const [walker, setWalker] = useState(undefined);
  const [lat, setLat] = useState(LATITUDE);
  const [lng, setLng] = useState(LONGITUDE);
  const [users, setUsers] = useState([]);

  const { loading, data } = useQuery(GET_WALKER);

  const { loading: walkersLoading, data: walkersData } = useQuery(GET_WALKERS);

  const [createWalkerMutation] = useMutation(CREATE_WALKER, {
    variables: { userId: route.params.userId },
  });

  const [modifyWalkerMutation] = useMutation(MODIFY_WALKER);

  const [insertLocationMutation] = useMutation(INSERT_LOCATION);

  const { data: newWalkerData } = useSubscription(GET_NEW_WALKER);

  const askPermission = async () => {
    try {
      const status = await getPermission("location");
      if (status === "granted") {
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
          enabledHighAccuracy: true,
        });

        // 最初座標の取得
        setLat(latitude);
        setLng(longitude);

        // 権限獲得のステートをtrueにする
        setIsPermitted(true);
      }
    } catch (error) {
      console.log(error);
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
        } else {
          const {
            data: { modifyWalker },
          } = await modifyWalkerMutation({
            variables: {
              walkerId: walker,
              isWalking: true,
            },
          });
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsStarted(true);
      }
    }
  };

  const stopTracking = async () => {
    // clear the watch
    navigator.geolocation.clearWatch(watchId);

    // set isStarted false
    setIsStarted(false);

    // set isWalking false to the server
    try {
      const {
        data: { modifyWalker },
      } = await modifyWalkerMutation({
        variables: {
          walkerId: walker,
          isWalking: false,
        },
      });
    } catch (e) {
      console.warn(e);
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
          if (watchId !== undefined || walker !== undefined) {
            stopTracking();
          }
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
            // console.log(insertLocation);
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

  const getWalkers = () => {
    if (walkersData !== undefined) {
      const { getWalkers } = walkersData;
      console.log(getWalkers);
      if (getWalkers) {
        setUsers([...getWalkers]);
      }
    }
  };

  const handleNewUser = () => {
    if (newWalkerData !== undefined) {
      const { getNewWalker } = newWalkerData;

      // ユーザ本人の情報は配列管理しない
      if (getNewWalker.id !== walker) {
        // 散歩者の配列の中に新しく取得した散歩者の情報が存在するかチェック
        const result = users.find((user) => user.id === getNewWalker.id);
        if (result === undefined) {
          // なかった場合
          setUsers((prev) => [...prev, getNewWalker]);
        } else {
          // あった場合
          const exceptTarget = users.filter((user) => user !== result);
          setUsers([...exceptTarget, getNewWalker]);
        }
      }
    }
  };

  console.log(users);

  useEffect(() => {
    getWalkers();
  }, [walkersData]);

  useEffect(() => {
    handleNewUser();
    console.log(users);
  }, [newWalkerData]);

  return (
    <MapsPresenter
      latitude={lat}
      longitude={lng}
      latitudeDelta={LATITUDE_DELTA}
      longitudeDelta={LONGITUDE_DELTA}
      users={users}
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
