import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Notifications from "expo-notifications";
import * as WebBrowser from "expo-web-browser";
import { useQuery } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import BackBtn from "../components/BackBtn";
import LogoTitle from "../components/Main/LogoTitle";
import SearchButton from "../components/Main/SearchButton";
import ProfileButton from "../components/Main/ProfileButton";
import Walking from "../screens/Main/Walking";
import Profile from "../screens/Main/Profile";
import ModifyProfile from "../screens/Main/ModifyProfile";
import Feed from "../screens/Main/Feed";
import Comment from "../screens/Main/Comment";
import Search from "../screens/Main/Search";
import Post from "../screens/Main/Post";
import AddDog from "../screens/Main/AddDog";
import ModifyDog from "../screens/Main/ModifyDog";
import SetLost from "../screens/Main/SetLost";
import ModifyPost from "../screens/Main/ModifyPost/ModifyPost";
import Chatrooms from "../screens/Main/Chatrooms";
import Chatroom from "../screens/Main/Chatroom";
import Notification from "../screens/Main/Notification/";
import Relation from "../screens/Main/Relation";
import Maps from "../screens/Walking/Maps/MapsContainer";
import {
  PROFILE_THUMBNAIL,
  VIEW_CHATROOMS,
  VIEW_NOTIFICATION,
} from "../queries/Main/MainQueries";
import { PhotoStacks } from "./Photo";
import colors from "../colors";

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  switch (routeName) {
    case "Feed":
      return () => <LogoTitle />;
    case "Walking":
      return "お散歩トラッキング";
    case "Notification":
      return "通知";
    case "Message":
      return "メッセージ";
  }
}

const TabsNavigator = createBottomTabNavigator();

const Tabs = ({ navigation, route }) => {
  const { loading, error, data } = useQuery(PROFILE_THUMBNAIL);
  const { loading: chatLoading, data: chatData } = useQuery(VIEW_CHATROOMS);
  const { loading: notiLoading, data: notiData } = useQuery(VIEW_NOTIFICATION);

  const [current, setCurrent] = useState(
    getFocusedRouteNameFromRoute(route) || "Feed"
  );

  const [chatBadge, setChatBadge] = useState(false);
  const [notificationBadge, setNotificationBadge] = useState(false);

  // const notificationReceivedListener = useRef();

  // useEffect(() => {
  //   notificationReceivedListener.current = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       switch (response.notification.request.content.data.type) {
  //         case "lostDog":
  //           const url = response.notification.request.content.data.url;
  //           if (url !== "" && url !== undefined) {
  //             WebBrowser.openBrowserAsync(url);
  //           }
  //           break;
  //         case "message":
  //           const toId = response.notification.request.content.data.id;
  //           if (toId !== "" && toId !== undefined) {
  //             navigation.navigate("Message", { id: toId });
  //           }
  //           break;
  //         case "comment":
  //           const postDetailId = response.notification.request.content.data.id;
  //           if (postDetailId !== "" && postDetailId !== undefined) {
  //             navigation.navigate("Comment", { id: postDetailId });
  //           }
  //           break;
  //         case "like":
  //           const postId = response.notification.request.content.data.id;
  //           if (postId !== "" && postId !== undefined) {
  //             navigation.navigate("Post", { id: postId });
  //           }
  //           break;
  //         case "follow":
  //           const userId = response.notification.request.content.data.id;
  //           if (userId !== "" && userId !== undefined) {
  //             navigation.navigate("Profile", { id: userId });
  //           }
  //           break;
  //         default:
  //           return;
  //       }
  //     }
  //   );
  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationReceivedListener
  //     );
  //   };
  // }, []);

  // useLayoutEffect(() => {
  //   if (!chatLoading) {
  //     for (const chat of chatData?.viewChatRooms) {
  //       const messages = chat.messages;
  //       for (const message of messages) {
  //         if (
  //           message.read === false &&
  //           message.from.id !== data?.viewMyself?.id
  //         ) {
  //           setChatBadge(true);
  //         }
  //       }
  //     }
  //   }
  // }, [chatLoading, chatData]);

  useLayoutEffect(() => {
    setCurrent(getFocusedRouteNameFromRoute(route) || "Feed");
    navigation.setOptions({
      headerTitle: getHeaderTitle(route),
      headerLeft: () => (current === "Feed" ? <SearchButton /> : null),
      headerRight: () =>
        current === "Feed" ? (
          <ProfileButton loading={loading} data={data} />
        ) : null,
    });
  }, [navigation, route, loading, data, current]);

  return (
    <TabsNavigator.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = "home";
          } else if (route.name === "Walking") {
            iconName = "map";
          } else if (route.name === "Add") {
            iconName = "plus";
          } else if (route.name === "Notification") {
            iconName = "bell";
          } else if (route.name === "Message") {
            iconName = "send";
          }

          switch (iconName) {
            case "plus":
              return (
                <View
                  style={{
                    backgroundColor: colors.primary,
                    width: 36,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather name={iconName} size={32} color={"white"} />
                </View>
              );
            case "bell":
              return (
                <View style={{ position: "relative" }}>
                  <Feather
                    name={iconName}
                    size={24}
                    color={focused ? colors.secondary : "grey"}
                  />
                  {notificationBadge ? (
                    <View
                      style={{
                        position: "absolute",
                        width: 5,
                        height: 5,
                        right: -10,
                        backgroundColor: colors.red,
                        borderRadius: 50,
                      }}
                    ></View>
                  ) : null}
                </View>
              );
            case "send":
              return (
                <View style={{ position: "relative" }}>
                  <Feather
                    name={iconName}
                    size={24}
                    color={focused ? colors.secondary : "grey"}
                  />
                  {chatBadge ? (
                    <View
                      style={{
                        position: "absolute",
                        width: 5,
                        height: 5,
                        right: -10,
                        backgroundColor: colors.red,
                        borderRadius: 50,
                      }}
                    ></View>
                  ) : null}
                </View>
              );
            default:
              return (
                <Feather
                  name={iconName}
                  size={24}
                  color={focused ? colors.secondary : "grey"}
                />
              );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.secondary,
        showLabel: false,
      }}
    >
      <TabsNavigator.Screen name="Feed" component={Feed} />
      <TabsNavigator.Screen
        name="Walking"
        component={Walking}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (data !== undefined) {
              navigation.navigate("Walking", { id: data?.viewMyself?.id });
            }
          },
        })}
      />
      <TabsNavigator.Screen
        name="Add"
        component={SafeAreaView}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Photo");
          },
        })}
      />
      <TabsNavigator.Screen
        name="Notification"
        component={Notification}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (data !== undefined) {
              navigation.navigate("Notification", {
                id: data?.viewMyself?.id,
              });
            }
          },
        })}
      />
      <TabsNavigator.Screen
        name="Message"
        component={Chatrooms}
        options={{ tabBarBadge: chatBadge ? 1 : 0 }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (data !== undefined) {
              navigation.navigate("Message", { id: data?.viewMyself?.id });
            }
          },
        })}
      />
    </TabsNavigator.Navigator>
  );
};

const MainNavigator = createStackNavigator();

export default () => {
  return (
    <MainNavigator.Navigator
      mode="modal"
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => <BackBtn />,
        headerTitleAlign: "center",
      }}
    >
      <MainNavigator.Screen name="Tabs" component={Tabs} />
      <MainNavigator.Screen name="Photo" component={PhotoStacks} />
      <MainNavigator.Screen
        name="Search"
        component={Search}
        options={{ title: "" }}
      />
      <MainNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <MainNavigator.Screen
        name="Relation"
        component={Relation}
        options={{ title: "" }}
      />
      <MainNavigator.Screen
        name="ModifyProfile"
        component={ModifyProfile}
        options={{
          title: "会員情報変更",
        }}
      />
      <MainNavigator.Screen
        name="AddDog"
        component={AddDog}
        options={{
          title: "犬登録",
        }}
      />
      <MainNavigator.Screen
        name="ModifyDog"
        component={ModifyDog}
        options={{
          title: "犬情報修正",
        }}
      />
      <MainNavigator.Screen
        name="SetLost"
        component={SetLost}
        options={{
          title: "迷子設定",
        }}
      />
      <MainNavigator.Screen
        name="Post"
        component={Post}
        options={{ title: "ポスト" }}
      />
      <MainNavigator.Screen
        name="Comment"
        component={Comment}
        options={{ title: "コメント" }}
      />
      <MainNavigator.Screen
        name="ModifyPost"
        component={ModifyPost}
        options={{ title: "ポスト修正" }}
      />
      <MainNavigator.Screen
        name="Chatroom"
        component={Chatroom}
        options={{ title: "" }}
      />
      <MainNavigator.Screen
        name="Maps"
        component={Maps}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </MainNavigator.Navigator>
  );
};
