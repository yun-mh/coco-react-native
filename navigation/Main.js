import React, { useLayoutEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import BackBtn from "../components/BackBtn";
import colors from "../colors";
import Walking from "../screens/Main/Walking";
import Photo from "../screens/Main/Photo";
import Notification from "../screens/Main/Notification";
import Message from "../screens/Main/Message";
import Profile from "../screens/Main/Profile";
import Feed from "../screens/Main/Feed";
import { View, Text } from "react-native";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import LogoTitle from "../components/Main/LogoTitle";
import ProfileButton from "../components/Main/ProfileButton";
import SearchButton from "../components/Main/SearchButton";
import { useQuery } from "@apollo/react-hooks";
import { PROFILE_THUMBNAIL } from "../queries/Auth/MainQueries";


function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  switch (routeName) {
    case "Feed":
      return () => <LogoTitle />;
    case "Walking":
      return "Walking";
    case "Photo":
      return "Photo";
    case "Notification":
      return "Notification";
    case "Message":
      return "Message";
  }
}

const TabsNavigator = createBottomTabNavigator();

const Tabs = ({ navigation, route }) => {
  const { loading, error, data, refetch } = useQuery(PROFILE_THUMBNAIL);
  const [current, setCurrent] = useState(getFocusedRouteNameFromRoute(route) || "Feed")
  
  useLayoutEffect(() => {
    setCurrent(getFocusedRouteNameFromRoute(route) || "Feed")
    navigation.setOptions({
      headerTitle: getHeaderTitle(route),
      headerLeft: () => current === "Feed" ? <SearchButton /> : null,
      headerRight: () => current === "Feed" ? <ProfileButton loading={loading} data={data} /> : null,
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
          } else if (route.name === "Photo") {
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
                width: 40,
                borderRadius: 50,
                alignItems: "center",
              }}
            >
              <Feather name={iconName} size={36} color={"white"} />
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.secondary,
        showLabel: false,
        labelStyle: {
          textTransform: "uppercase",
          fontWeight: "600",
        },
      }}
    >
      <TabsNavigator.Screen name="Feed" component={Feed} />
      <TabsNavigator.Screen name="Walking" component={Walking} />
      <TabsNavigator.Screen name="Photo" component={Photo} />
      <TabsNavigator.Screen name="Notification" component={Notification} />
      <TabsNavigator.Screen name="Message" component={Message} />
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
      }}
    >
      <MainNavigator.Screen name="Tabs" component={Tabs} />
    </MainNavigator.Navigator>
  );
};
