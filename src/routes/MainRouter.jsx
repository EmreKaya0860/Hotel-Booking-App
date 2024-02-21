import React from "react";


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import BookingsScreen from "../screens/BookingsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AccountScreen from "../screens/AccountScreen";
import HomeRoutes from "./HomeRoutes";

import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const MainRouter = () => {
  return (
 
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: false,
          tabBarStyle: { 
          height: 90},
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            const currentColor = focused ? "#37B5B6" : "#B4B4B8";
            if (route.name === "HomeRoutes") {
                 iconName = "home"
              size=30
            } else if (route.name === "BookingsScreen") {
              iconName = "address-book";
            } else if (route.name === "FavoritesScreen") {
              iconName = "heart";
            } else if (route.name === "AccountScreen") {
              iconName = "user";
            }

            return (
              <FontAwesome name={iconName} size={size} color={currentColor} />
              );
            },
          })}
       
        
      >
        <Tab.Screen
          name="HomeRoutes"
          component={HomeRoutes}
         
        />
        <Tab.Screen
          name="BookingsScreen"
          component={BookingsScreen}
      
        />
        <Tab.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
         
        />
        <Tab.Screen
          name="AccountScreen"
          component={AccountScreen}
        />
      </Tab.Navigator>
   
  );
};

export default MainRouter;
