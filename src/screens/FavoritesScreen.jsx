import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import SearchHotel from "../components/Home/SearchHotel";
import { Ionicons } from "@expo/vector-icons";

import FavHotelList from "../components/Home/FavHotelList";

const FavoritesScreen = ({ navigation }) => {
  const onHandlePress = (item) => {
    navigation.navigate("HotelDetailScreen");
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 60,
          marginLeft: 20,
          marginBottom: 20,
        }}
      >
        Favorites
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
      <FavHotelList onPress={onHandlePress} />
    </View>
  );
};
export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
