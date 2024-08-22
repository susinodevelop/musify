import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  StatusBar as NativeStatusBar,
} from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigator from "./src/navigation/Navigator";

export default function App() {
  React.useEffect(() => {
    NavigationBar.setBackgroundColorAsync("black");
    NavigationBar.setButtonStyleAsync("light");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="black" />
      <Navigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? NativeStatusBar.currentHeight : 0,
  },
});
