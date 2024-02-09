import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import VerificationScreen from "../screens/auth/VerificationScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const AuthRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        initialRouteName="WelcomeScreen"
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthRouter;

const styles = StyleSheet.create({});
