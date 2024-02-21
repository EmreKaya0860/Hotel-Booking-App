import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ReservationStepsRouter from "./ReservationStepsRouter";
import MainRouter from "./MainRouter";
import HomeRoutes from "./HomeRoutes";

const Stack = createStackNavigator();

const CombineMainAndReservationRouter = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainRouter" component={MainRouter} />
      <Stack.Screen
        name="ReservationStepsRouter"
        component={ReservationStepsRouter}
      />
      <Stack.Screen name="HomeRoutes" component={HomeRoutes} />
    </Stack.Navigator>
  );
};

export default CombineMainAndReservationRouter;
