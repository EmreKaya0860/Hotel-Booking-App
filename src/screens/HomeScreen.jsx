import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate("ReservationStepsRouter");
  };
  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Press me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
