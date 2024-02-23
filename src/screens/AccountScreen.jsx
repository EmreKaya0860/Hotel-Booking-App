import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AccountScreen = () => {
  const navigation = useNavigation();
  function goBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv5f0xNX70qisukW3q_1T3BDt45hdkRdDMWg&usqp=CAU",
            }}
            style={{ height: 70, width: 70, borderRadius: 60, marginStart: 10 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            width: "70%",
            alignSelf: "center",
            fontSize: 20,
            fontWeight: "600",
            marginLeft: 30,
          }}
        >
          Bergen Gergen
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 2,
          backgroundColor: "whitesmoke",
          marginTop: 10,
        }}
      />

      <TouchableOpacity onPress={() => navigation.navigate("FavoritesScreen")}>
        <View
          style={{ flexDirection: "row", paddingHorizontal: 20, marginTop: 30 }}
        >
          <Ionicons name="heart" size={30} color={"#FFA751"} />
          <Text style={{ marginStart: 10, fontSize: 20 }}>Your favourites</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{ flexDirection: "row", paddingHorizontal: 20, marginTop: 25 }}
        >
          <Ionicons name="card-outline" size={30} color={"#FFA751"} />
          <Text style={{ marginStart: 10, fontSize: 20 }}>Payment</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{ flexDirection: "row", paddingHorizontal: 20, marginTop: 30 }}
        >
          <Ionicons name="help-buoy" size={30} color={"#FFA751"} />
          <Text style={{ marginStart: 10, fontSize: 20 }}>Help</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{ flexDirection: "row", paddingHorizontal: 20, marginTop: 30 }}
        >
          <FontAwesome5 name="piggy-bank" size={25} color={"#FFA751"} />
          <Text style={{ marginStart: 10, fontSize: 20 }}>Promotions</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{ flexDirection: "row", paddingHorizontal: 20, marginTop: 30 }}
        >
          <Ionicons name="settings" size={30} color={"#FFA751"} />
          <Text style={{ marginStart: 10, fontSize: 20 }}>Settings</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  profileHeader: {
    flexDirection: "row",
    paddingHorizontal: 10,
    width: "100%",
    height: "10%",
  },
});
