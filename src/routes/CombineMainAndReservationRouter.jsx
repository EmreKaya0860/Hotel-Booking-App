import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ReservationStepsRouter from "./ReservationStepsRouter";
import MainRouter from "./MainRouter";

const Stack = createStackNavigator();

const CombineMainAndReservationRouter = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainRouter" component={MainRouter} />
      <Stack.Screen
        name="ReservationStepsRouter"
        component={ReservationStepsRouter}
      />
    </Stack.Navigator>
  );
};

export default CombineMainAndReservationRouter;
