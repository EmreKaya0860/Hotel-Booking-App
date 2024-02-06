import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import BookingsScreen from "../screens/BookingsScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AccountScreen from "../screens/AccountScreen";

import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const MainRouter = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          tabBarStyle: { height: 70 },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: (color) => (
              <FontAwesome name="home" size={30} color={color} />
            ),
            title: "",
          }}
        />
        <Tab.Screen
          name="BookingsScreen"
          component={BookingsScreen}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="address-book" size={30} color="#DFDEDE" />
            ),
            title: "",
          }}
        />
        <Tab.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="bell" size={30} color="#DFDEDE" />
            ),
            title: "",
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="user" size={30} color="#DFDEDE" />
            ),
            title: "",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;
