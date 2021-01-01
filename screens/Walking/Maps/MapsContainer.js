import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions } from "react-native";
import * as Location from "expo-location";
import Geolocation from "@react-native-community/geolocation";
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
import haversine from "haversine";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 35.6679191;
const LONGITUDE = 139.4606805;
const LATITUDE_DELTA = 0.002; // test: 0.002
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Maps = ({ navigation, route }) => {
  const [watchId, setWatchId] = useState(null);
  const [isPermitted, setIsPermitted] = useState(false);
  const [controlOpen, setControlOpen] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [walker, setWalker] = useState(undefined);
  const [lat, setLat] = useState(LATITUDE);
  const [lng, setLng] = useState(LONGITUDE);
  const [routes, setRoutes] = useState([]);
  const [distance, setDistance] = useState(0.0);
  const [prevLatLng, setPrevLatLng] = useState({
    latitude: undefined,
    longitude: undefined,
  });
  const [users, setUsers] = useState([]);
  const [dummyUsers, setDummyUsers] = useState([]);

  const { loading, data } = useQuery(GET_WALKER);

  const { loading: walkersLoading, data: walkersData } = useQuery(GET_WALKERS);

  const [createWalkerMutation] = useMutation(CREATE_WALKER, {
    variables: { userId: route.params.userId },
  });

  const [modifyWalkerMutation] = useMutation(MODIFY_WALKER);

  const [insertLocationMutation] = useMutation(INSERT_LOCATION);

  const { data: newWalkerData } = useSubscription(GET_NEW_WALKER);

  // 位置情報取得の権限確認
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

        setPrevLatLng({
          latitude,
          longitude,
        });

        setDummyUsers([
          {
            id: 1,
            latitude: latitude + 0.0001,
            longitude: longitude + 0.0003,
            isWalking: true,
          },
          {
            id: 2,
            latitude: latitude + 0.0004,
            longitude: longitude - 0.0003,
            isWalking: true,
          },
          {
            id: 3,
            latitude: latitude - 0.0004,
            longitude: longitude - 0.0003,
            isWalking: true,
          },
          {
            id: 4,
            latitude: latitude - 0.0002,
            longitude: longitude - 0.0002,
            isWalking: true,
          },
          {
            id: 5,
            latitude: latitude - 0.0003,
            longitude: longitude + 0.0003,
            isWalking: true,
          },
        ]);

        // 権限獲得のステートをtrueにする
        setIsPermitted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    askPermission();
    return () => Geolocation.clearWatch(watchId);
  }, []);

  // トラッキング開始処理
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
          await modifyWalkerMutation({
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

  // トラッキング終了処理
  const stopTracking = async () => {
    Geolocation.clearWatch(watchId);

    setIsStarted(false);

    try {
      await modifyWalkerMutation({
        variables: {
          walkerId: walker,
          isWalking: false,
        },
      });
    } catch (e) {
      console.warn(e);
    }

    setRoutes([]);
  };

  // 画面を閉めるための処理
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

  // コントロールパンネルの制御
  const toggleControl = () => {
    setControlOpen(!controlOpen);
  };

  // 現在の位置を監視し位置情報データをアップデートする処理
  const watchPosition = async () => {
    if (walker) {
      const watch = Geolocation.watchPosition(
        async (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);

          setRoutes((prev) => [
            ...prev,
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          ]);

          setPrevLatLng({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          try {
            await insertLocationMutation({
              variables: {
                walkerId: walker,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            });
          } catch (e) {
            console.warn(e);
          }
        },
        (error) => console.log("マップエラー", error),
        {
          enableHighAccuracy: true,
          distanceFilter: 5,
        }
      );
      setWatchId(watch);
    }
  };

  useEffect(() => {
    if (walker !== undefined && isStarted === true) watchPosition();
  }, [isStarted, walker]);

  // 距離の計算処理
  const calcDistance = (newLatLng) => {
    return haversine(prevLatLng, newLatLng) || 0;
  };

  useEffect(() => {
    setDistance(
      (prev) =>
        prev +
        calcDistance({
          latitude: lat,
          longitude: lng,
        })
    );
  }, [routes]);

  useEffect(() => {
    if (!loading) {
      data?.getWalker?.length === 0
        ? setWalker(undefined)
        : setWalker(data?.getWalker[0]?.id);
    }
  }, [data]);

  // 既登録の散歩者情報の取得
  const getWalkers = () => {
    if (walkersData !== undefined) {
      const { getWalkers } = walkersData;
      if (getWalkers) {
        setUsers([...getWalkers]);
      }
    }
  };

  useEffect(() => {
    getWalkers();
  }, [walkersData]);

  // 新しい散歩者が追加される際の処理
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

  useEffect(() => {
    handleNewUser();
  }, [newWalkerData]);

  // ダミーユーザの処理（プレゼン用の臨時処理）
  function randomPosition() {
    return Math.random() * (0.00005 - -0.000025) + -0.000025;
  }

  useEffect(() => {
    let timer;
    if (isStarted) {
      timer = setInterval(() => {
        const targetData = dummyUsers.concat();
        for (const target of targetData) {
          target.latitude += randomPosition();
          target.longitude += randomPosition();
        }

        setDummyUsers(targetData);
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isStarted]);

  return (
    <MapsPresenter
      latitude={lat}
      longitude={lng}
      latitudeDelta={LATITUDE_DELTA}
      longitudeDelta={LONGITUDE_DELTA}
      routes={routes}
      distance={distance}
      users={users}
      dummyUsers={dummyUsers}
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
