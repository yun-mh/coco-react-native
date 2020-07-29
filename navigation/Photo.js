import React, { useState, useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import colors from "../colors";

function getHeaderTitle(route) {
  const outerRouteIndex = route.state ? route.state.index : 0;
  switch (outerRouteIndex) {
    case 0:
      const innerRouteIndex = route.state
        ? route.state.routes[0].state.index
        : 0;
      switch (innerRouteIndex) {
        case 0:
          return "ギャラリー";
        case 1:
          return "カメラ";
      }
    case 1:
      return "投稿";
  }
}

const PhotoStackNavigation = createStackNavigator();

export const PhotoStacks = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: getHeaderTitle(route),
    });
  }, [route]);

  return (
    <PhotoStackNavigation.Navigator>
      <PhotoStackNavigation.Screen name="ActionTabs" component={ActionTabs} />
      <PhotoStackNavigation.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={{
          title: "Upload",
          headerBackTitleVisible: false,
        }}
      />
    </PhotoStackNavigation.Navigator>
  );
};

const PhotoNavigation = createBottomTabNavigator();

const ActionTabs = () => {
  return (
    <PhotoNavigation.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Select") {
            iconName = "image";
          } else if (route.name === "Take") {
            iconName = "camera";
          }
          return (
            <Feather
              name={iconName}
              size={24}
              color={focused ? colors.primary : "grey"}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        showLabel: false,
      }}
    >
      <PhotoNavigation.Screen name="Select" component={SelectPhoto} />
      <PhotoNavigation.Screen name="Take" component={TakePhoto} />
    </PhotoNavigation.Navigator>
  );
};
