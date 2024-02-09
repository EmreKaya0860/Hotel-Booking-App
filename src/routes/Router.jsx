import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainRouter from "./MainRouter";
import AuthRouter from "./AuthRouter";

const Stack = createStackNavigator();

const Router = () => {
  const user = true;
  // autha gitmek için user= false
  // main gitmek için user= true
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="MainRouter" component={MainRouter} />
          ) : (
            <Stack.Screen name="AuthRouter" component={AuthRouter} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Router;

const styles = StyleSheet.create({});
