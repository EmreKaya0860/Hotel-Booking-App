import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SelectRoomScreen from "../screens/ReservationSteps/SelectRoomScreen";
import ReservationDetailScreen from "../screens/ReservationSteps/ReservationDetailScreen";
import ReservationCompleteScreen from "../screens/ReservationSteps/ReservationCompleteScreen";
import PaymentInfoScreen from "../screens/ReservationSteps/PaymentInfoScreen";

const Stack = createStackNavigator();

const ReservationStepsRouter = ({ route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        initialRouteName="SelectRoomScreen"
        name="SelectRoomScreen"
        component={SelectRoomScreen}
        options={{ headerShown: false }}
        initialParams={{
          selectedHotelId: route.params.selectedHotelId,
          hotelName: route.params.hotelName,
          userId: route.params.userId,
        }}
      />
      <Stack.Screen
        name="ReservationDetailScreen"
        component={ReservationDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReservationCompleteScreen"
        component={ReservationCompleteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentInfoScreen"
        component={PaymentInfoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ReservationStepsRouter;
