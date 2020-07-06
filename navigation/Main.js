import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BackBtn from "../components/BackBtn";
import colors from "../colors";
import Walking from "../screens/Main/Walking";
import Photo from "../screens/Main/Photo";
import Notification from "../screens/Main/Notification";
import Message from "../screens/Main/Message";
import Profile from "../screens/Main/Profile";

const TabsNavigator = createBottomTabNavigator();

const Tabs = () => (
  <TabsNavigator.Navigator
    tabBarOptions={{
      activeTintColor: colors.red,
      tabStyle: {
        paddingTop: 7,
      },
      labelStyle: {
        textTransform: "uppercase",
        fontWeight: "600",
      },
    }}
  >
    <TabsNavigator.Screen name="Walking" component={Walking} />
    <TabsNavigator.Screen name="Photo" component={Photo} />
    <TabsNavigator.Screen name="Notification" component={Notification} />
    <TabsNavigator.Screen name="Message" component={Message} />
    <TabsNavigator.Screen name="Profile" component={Profile} />
  </TabsNavigator.Navigator>
);

const MainNavigator = createStackNavigator();

export default () => (
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
