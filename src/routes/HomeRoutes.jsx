import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import HotelsScreen from "../screens/HotelsScreen";
import HotelDetailScreen from "../screens/HotelDetailScreen";
const Stack = createNativeStackNavigator();
const HomeRoutes = () => {
  return (
    <Stack.Navigator options={{ headerShown: false }}>
      <Stack.Screen
        initialRouteName="HomeScreen"
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HotelsScreen"
        component={HotelsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HotelDetailScreen"
        component={HotelDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeRoutes;

const styles = StyleSheet.create({});
