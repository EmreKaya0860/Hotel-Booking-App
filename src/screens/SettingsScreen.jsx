import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import firebase from "../service/firebase";
import { getAuth, updatePassword } from "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const SettingsScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  function goBack() {
    navigation.goBack();
  }
  const [photoURL, setPhotoURL] = useState(""); // Profil fotoğrafının URL'sini tutmak için state
  const [newPassword, setNewPassword] = useState(""); // Yeni şifreyi tutmak için state

  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Galeri erişim izni reddedildi.");
    }
  };

  const pickImage = async () => {
    await getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
    }
  };
  const uploadImage = async (uri) => {
    // Firebase Storage'a resmi yükle
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = firebase
      .storage()
      .ref()
      .child(profile_images / user.uid);
    storageRef.put(blob).then(() => {
      // Resmin yüklendiği konumu al
      storageRef.getDownloadURL().then((url) => {
        setPhotoURL(url);
      });
    });
    try {
      await storageRef.put(blob);
      const url = await storageRef.getDownloadURL();
      setPhotoURL(url);
    } catch (error) {
      console.error("Profil fotoğrafı yüklenirken hata oluştu: ", error);
    }
  };
  const changePassword = () => {
    navigation.navigate("PasswordChangeScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: 20,
          fontWeight: "600",
          marginTop: 10,
        }}
      >
        {" "}
        Account Settings
      </Text>
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
          }}
          style={{
            flexDirection: "row",
            alignSelf: "center",
            height: 135,
            width: 130,
            borderRadius: 60,
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "gray",
          marginTop: 20,
        }}
      />
      <TouchableOpacity onPress={changePassword}>
        <View
          style={{ flexDirection: "row", paddingHorizontal: 20, marginTop: 30 }}
        >
          <MaterialCommunityIcons
            name="onepassword"
            size={25}
            color={"#FEC069"}
          />
          <Text style={{ marginStart: 10, fontSize: 20 }}>Password</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  profileHeader: {
    width: "100%",
    height: "15%",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
});
