import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import FeedPresenter from "./FeedPresenter";
import {
  VIEW_FEED,
  CHECK_MYSELF,
  SET_TOKEN,
} from "../../../queries/Main/MainQueries";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export default ({ route }) => {
  const ITEMS = 5;

  const flatlistEl = useRef(null);
  const notificationListener = useRef();

  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  const { loading, data, refetch, fetchMore } = useQuery(VIEW_FEED, {
    variables: {
      offset: 0,
      limit: ITEMS,
    },
  });

  const { data: check } = useQuery(CHECK_MYSELF);

  const [setTokenMutation] = useMutation(SET_TOKEN);

  const onEndReached = async () => {
    if (!loading && data) {
      await fetchMore({
        variables: {
          offset: data?.viewFeed?.length,
          limit: ITEMS,
        },
      });
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      setPosts(data.viewFeed);
    }
  }, [data]);

  useEffect(() => {
    if (route?.params !== undefined) {
      flatlistEl.current.scrollToOffset({
        offset: 0,
        animated: true,
        item: route?.params?.posted,
      });
    }
  }, [route?.params?.posted]);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: false,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("プッシュ通知のためのトークンを取得できませんでした。");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;

      await setTokenMutation({
        variables: {
          token,
        },
      });
    }

    console.log(token);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F",
      });
    }
    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <FeedPresenter
      flatlistEl={flatlistEl}
      loading={loading}
      data={posts}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      currentUser={check}
    />
  );
};
