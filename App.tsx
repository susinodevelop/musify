import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  StatusBar as NativeStatusBar,
} from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavigator from "./src/navigation/BottomNavigator";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "@/navigation/StackNavigator";
import DrawerNavigator from "@/navigation/DrawerNavigator";

export default function App() {
  React.useEffect(() => {
    NavigationBar.setBackgroundColorAsync("black");
    NavigationBar.setButtonStyleAsync("light");
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" backgroundColor="black" />
          <DrawerNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? NativeStatusBar.currentHeight : 0,
  },
});
