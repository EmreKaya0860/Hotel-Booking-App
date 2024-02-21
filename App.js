import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import "./i18n";
import Router from "./src/routes/Router";

export default function App() {
  return <Router />;
}
