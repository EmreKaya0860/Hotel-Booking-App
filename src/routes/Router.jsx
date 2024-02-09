import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainRouter from './MainRouter';
import AuthRouter from './AuthRouter';

const Stack = createNativeStackNavigator();
const Router = () => {
    const user=true;
    // autha gitmek için user= false 
    // main gitmek için user= true
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainRouter" component={MainRouter} />
      ) : (
        <Stack.Screen name="AuthRouter" component={AuthRouter} />
      )}
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Router;

const styles = StyleSheet.create({})