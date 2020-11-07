import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import FeedPresenter from "./FeedPresenter";
import { VIEW_FEED, CHECK_MYSELF, SET_TOKEN } from "../../../queries/Main/MainQueries";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export default ({ route }) => {
  const ITEMS = 5;
  
  const flatlistEl = useRef(null);
  
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  
  const { loading, data, refetch, fetchMore } = useQuery(VIEW_FEED, {
    variables: {
      offset: 0,
      limit: ITEMS,
    },
  });

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
      flatlistEl.current.scrollToOffset({ offset: 0, animated: true, item: route?.params?.posted });
    }
  }, [route?.params?.posted]);

  const { data: check } = useQuery(CHECK_MYSELF);


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [setTokenMutation] = useMutation(SET_TOKEN);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: false,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      console.log(existingStatus)
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;

      const res = await setTokenMutation({
        variables: {
          token,
        },
      });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
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
