import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {auth} from '../../service/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
const SignInScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in user:", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);
      }); 
  };

  const navigationSignUpScreen = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogIn}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSign}
        onPress={navigationSignUpScreen}
      >
        <Text style={styles.buttonSignIn}>Dont have account? Register!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#05C1CD",
    padding: 10,
    borderRadius: 5,
    width: "85%",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
  },
  orText: {
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 30,
    color: "#d3d3d3",
  },
  buttonGoogle: {
    borderColor: " #747775",
    borderWidth: 1,
    borderRadius: 100,
    height: 44,
    padding: 10,
    width: "75%",
  },
  googleText: {
    color: "#1F1F1F",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "92%",
    paddingLeft: "20%",
  },
  buttonFacebook: {
    borderColor: " #747775",
    borderWidth: 1,
    borderRadius: 100,
    height: 44,
    padding: 10,
    width: "75%",
    marginTop: 20,
  },
  facebookText: {
    color: "#1F1F1F",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 10,
  },
  buttonContentFacebook: {
    flexDirection: "row",
    alignItems: "center",
    width: "92%",
    paddingLeft: "15%",
  },
  buttonSignIn: {
    color: "#05C1CD",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
  },
});
