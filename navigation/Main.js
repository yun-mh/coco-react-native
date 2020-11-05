import React, { useLayoutEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import ModifyPost from "../screens/Main/ModifyPost/ModifyPost";
import Chatrooms from "../screens/Main/Chatrooms";
import Chatroom from "../screens/Main/Chatroom";
import Notification from "../screens/Main/Notification/";
import Relation from "../screens/Main/Relation";
import Maps from "../screens/Walking/Maps/MapsContainer";
import { PROFILE_THUMBNAIL } from "../queries/Main/MainQueries";
import { PhotoStacks } from "./Photo";
import colors from "../colors";

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  switch (routeName) {
    case "Feed":
      return () => <LogoTitle />;
    case "Walking":
      return "お散歩の出会い";
    case "Notification":
      return "通知";
    case "Message":
      return "メッセージ";
  }
}

const TabsNavigator = createBottomTabNavigator();

const Tabs = ({ navigation, route }) => {
  const { loading, error, data } = useQuery(PROFILE_THUMBNAIL);
  const [current, setCurrent] = useState(
    getFocusedRouteNameFromRoute(route) || "Feed"
  );

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
          return iconName !== "plus" ? (
            <Feather
              name={iconName}
              size={24}
              color={focused ? colors.secondary : "grey"}
            />
          ) : (
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
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.secondary,
        showLabel: false,
      }}
    >
      <TabsNavigator.Screen name="Feed" component={Feed} />
      <TabsNavigator.Screen name="Walking" component={Walking} />
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
              navigation.navigate("Notification", { id: data.viewMyself.id });
            }
          },
        })}
      />
      <TabsNavigator.Screen
        name="Message"
        component={Chatrooms}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (data !== undefined) {
              navigation.navigate("Message", { id: data.viewMyself.id });
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
        options={{ title: "お散歩の出会い" }}
      />
    </MainNavigator.Navigator>
  );
};
