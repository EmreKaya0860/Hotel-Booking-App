import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

const CombineAcountAndSettingsRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AccountScreen"
    >
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default CombineAcountAndSettingsRouter;
