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
import {auth, db} from '../../service/firebase'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { getDocs, query, where,orderBy, startAt , endAt,doc, updateDoc, setDoc} from "firebase/firestore";
const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const handleCreateAccount = () => {
 
    async function createUser(email, password, name, surname) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Kullanıcı UID'sini al
        const uid = user.uid;
    
        // Kullanıcı bilgileriyle birlikte bir doküman oluştur
        const userDocRef = doc(db, "Users", uid);
        await setDoc(userDocRef, {
          Email: email,
          Name: name,
          Surname: surname,
          Password: password,
          Photo: null,
          LikedHotels: [],
          Reservations: []
        });
    
        console.log("Kullanıcı oluşturuldu ve kullanıcı bilgileri Firestore'a eklendi.");
      } catch (error) {
        console.error("Kullanıcı oluşturma hatası:", error);
      }
    }
    
    // Kullanıcı oluşturma fonksiyonunu çağır
    createUser(email,password,name, Surname);
    
  };
  const navigationSignInScreen = () => {
    navigation.navigate("SignInScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={Surname}
        onChangeText={setSurname}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSign}
        onPress={navigationSignInScreen}
      >
        <Text style={styles.buttonSignIn}>Do you have account? Log In!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

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
    borderRadius: 50,
  },
  button: {
    backgroundColor: "#05C1CD",
    padding: 10,
    borderRadius: 50,
    width: "75%",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
  },
  buttonSign: {
    margin: 15,
  },
  buttonSignIn: {
    color: "#05C1CD",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
  },
});
