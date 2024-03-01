import { StyleSheet, Text, View, TouchableOpacity,ImageBackground } from "react-native";
import React from "react";

const WelcomeScreen = ({ navigation }) => {
  function navigationToSignUp() {
    navigation.navigate("SignUpScreen");
  }

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <ImageBackground
        source={require("../../../assets/5.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.contentText}>You're in the right place for 
          your dream vacation. Choose from thousands of hotels and experience
           an unforgettable stay. Start exploring now to find the perfect hotel for you!</Text>
        </View>
      </ImageBackground>

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
  image: {
    width: "100%",
    height: "100%",
  },
  textWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#F6F5F5",  
  
  },
  contentText: {
    fontSize: 14,
    color: "#A9A9A9",
  marginTop: 20,
  },
  buttonContainer: {
    position:"absolute",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEC069",
    backfaceVisibility: "hidden",
    padding: 10,
    bottom: 10,
    borderRadius: 25,
    width: 200,
    height: 60,
  },
  textContainer:{
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
  },
});
