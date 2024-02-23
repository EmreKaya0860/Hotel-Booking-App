import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const WelcomeScreen = ({ navigation }) => {
  function navigationToSignUp() {
    navigation.navigate("SignUpScreen");
  }

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={navigationToSignUp}
      >
        <Text style={styles.buttonText}>BAŞLA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  textWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
  },
  buttonContainer: {
    marginBottom: 30,
    alignSelf: "center",
    backgroundColor: "#05C1CD",
    backfaceVisibility: "hidden",
    border: 5,
    padding: 12,
    bottom: 10,
    borderRadius: 25,
    width: 200,
    height: 50,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
  },
});
