import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PasswordChangeScreen from "../screens/PasswordChangeScreen";

const Stack = createStackNavigator();

const CombineAcountAndSettingsRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AccountScreen"
    >
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen
        name="PasswordChangeScreen"
        component={PasswordChangeScreen}
      />
    </Stack.Navigator>
  );
};

export default CombineAcountAndSettingsRouter;
