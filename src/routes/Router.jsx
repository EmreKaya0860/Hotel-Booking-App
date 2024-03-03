import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { auth } from "../service/firebase";
import AuthRouter from "./AuthRouter";

import CombineMainAndReservationRouter from "./CombineMainAndReservationRouter";

const Stack = createStackNavigator();

const Router = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  // const user = true;
  // autha gitmek için user= false
  // main gitmek için user= true
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen
              name="HomeRouter"
              component={CombineMainAndReservationRouter}
            />
          ) : (
            <Stack.Screen name="AuthRouter" component={AuthRouter} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Router;

const styles = StyleSheet.create({});
