import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import BookingsScreen from "../screens/BookingsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AccountScreen from "../screens/AccountScreen";
import HomeRoutes from "./HomeRoutes";
import CombineAcountAndSettingsRouter from "./CombineAcountAndSettingsRouter";

import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const MainRouter = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        gestureEnabled: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          const currentColor = focused ? "#FEC069" : "#B4B4B8";
          if (route.name === "HomeRoutes") {
            iconName = "home";
            size = 30;
          } else if (route.name === "BookingsScreen") {
            iconName = "address-book";
          } else if (route.name === "FavoritesScreen") {
            iconName = "heart";
          } else if (route.name === "AccountCombineScreen") {
            iconName = "user";
          }

          return (
            <FontAwesome name={iconName} size={size} color={currentColor} />
          );
        },
      })}
    >
      <Tab.Screen name="HomeRoutes" component={HomeRoutes} />
      <Tab.Screen name="BookingsScreen" component={BookingsScreen} />
      <Tab.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Tab.Screen
        name="AccountCombineScreen"
        component={CombineAcountAndSettingsRouter}
      />
    </Tab.Navigator>
  );
};

export default MainRouter;
