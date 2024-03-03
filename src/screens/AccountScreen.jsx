import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut, getAuth } from "firebase/auth";
import { auth } from "../service/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../service/firebase";
import { use } from "i18next";
const AccountScreen = () => {
  const [userName, setUserName] = useState("");

  const navigation = useNavigation();
  function goBack() {
    navigation.goBack();
  }
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const auth = getAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const userQuery = query(
        collection(db, "Users"),
        where("Email", "==", auth.currentUser.email)
      );
      const userSnapshot = await getDocs(userQuery);
      let userName = "";
      let userSurname = "";
      userSnapshot.forEach((doc) => {
        userName = doc.data().Name;
        userSurname = doc.data().Surname;
      });
      setUserName(userName + " " + userSurname);
    };
    fetchUser();
    console.log("username:" + userName);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
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
          {userName}
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

      <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
        <View
          style={{ flexDirection: "row", paddingHorizontal: 20, marginTop: 30 }}
        >
          <Ionicons name="settings" size={30} color={"#FFA751"} />
          <Text style={{ marginStart: 10, fontSize: 20 }}>Settings</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
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
  logoutButton: {
    marginTop: 20,
    width: "80%",
    height: 40,
    backgroundColor: "#FEC069",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 20,
  },
});
