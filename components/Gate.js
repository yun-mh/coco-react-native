import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { useIsLoggedIn } from "../contexts/AuthContext";
import Auth from "../navigation/Auth";
import Main from "../navigation/Main";
import { Linking } from "react-native";

const linking = {
  prefixes: ["com.cocofordogs://"],
  config: {
    initialRouteName: "Tabs",
    screens: {
      Comment: {
        path: "comment/:id",
      },
      Post: {
        path: "post/:id",
      },
      Profile: {
        path: "profile/:id",
      },
      Message: "chat",
    },
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }) => listener(url);

    Linking.addEventListener("url", onReceiveURL);

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        switch (response.notification.request.content.data.type) {
          case "lostDog":
            const url = response.notification.request.content.data.url;
            if (url !== "" && url !== undefined) {
              WebBrowser.openBrowserAsync(url);
            }
            break;
          case "message":
            const toId = response.notification.request.content.data.id;
            if (toId !== "" && toId !== undefined) {
              navigation.navigate("Message", { id: toId });
            }
            break;
          case "comment":
            const postDetailId = response.notification.request.content.data.id;
            if (postDetailId !== "" && postDetailId !== undefined) {
              navigation.navigate("Comment", { id: postDetailId });
            }
            break;
          case "like":
            const postId = response.notification.request.content.data.id;
            if (postId !== "" && postId !== undefined) {
              Linking.openURL(`com.cocofordogs://post/${postId}`);
              // navigation.navigate("Post", { id: postId });
            }
            break;
          case "follow":
            const userId = response.notification.request.content.data.id;
            if (userId !== "" && userId !== undefined) {
              navigation.navigate("Profile", { id: userId });
            }
            break;
          default:
            return;
        }

        listener(url);
      }
    );

    return () => {
      Linking.removeEventListener("url", onReceiveURL);
      subscription.remove();
    };
  },
};

export default () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <NavigationContainer linking={linking}>
      {isLoggedIn ? <Main /> : <Auth />}
    </NavigationContainer>
  );
};
