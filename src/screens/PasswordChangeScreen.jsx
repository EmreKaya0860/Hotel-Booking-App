import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import firebase from "../service/firebase";
import { getAuth, updatePassword } from "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { Alert } from "react-native";

const PasswordChangeScreen = () => {
  const navigation = useNavigation();
  function goBack() {
    navigation.goBack();
  }
  const [photoURL, setPhotoURL] = useState(""); // Profil fotoğrafının URL'sini tutmak için state
  const [newPassword, setNewPassword] = useState(""); // Yeni şifreyi tutmak için state

  const auth = getAuth();

  const changePassword = () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Kullanıcı oturum açmamış.");
      return;
    }
    console.log("change");
    updatePassword(user, newPassword)
      .then(() => {
        console.log("Şifre başarıyla güncellendi");
        Alert.alert("Başarılı", "Şifre başarıyla güncellendi");
      })
      .catch((error) => {
        console.error("Şifre güncellenirken bir hata oluştu: ", error);
        Alert.alert("Hata", "Şifre güncellenirken bir hata oluştu");
      });

    navigation.navigate("AccountScreen");
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
        Change Password
      </Text>
      <View style={styles.profileHeader}>
        <View
          style={{
            width: "60%",
            height: 40,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#fec069",
            backgroundColor: "whitesmoke",
          }}
        >
          <TextInput
            placeholder="Change Password.."
            style={{ marginStart: 10, fontSize: 20, top: 5 }}
          />
        </View>
      </View>

      <TouchableOpacity onPress={changePassword}>
        <View
          style={{
            width: "60%",
            backgroundColor: "#fec069",
            height: 40,
            alignSelf: "center",
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 50,
            borderColor: "lightgray",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              top: 5,
            }}
          >
            Save
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default PasswordChangeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  profileHeader: {
    width: "100%",
    marginTop: 300,
    flexDirection: "row",
    justifyContent: "center",
  },
});
