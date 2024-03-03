// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCC7noE0SsqxSDhQyOiUzRnl4NPtRhNoKE",
  authDomain: "hotelbookingapp-8250c.firebaseapp.com",
  projectId: "hotelbookingapp-8250c",
  storageBucket: "hotelbookingapp-8250c.appspot.com",
  messagingSenderId: "208785266136",
  appId: "1:208785266136:web:21e8d3aaa4345242324ead",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const authentication = getAuth();
export const user = authentication.currentUser;
