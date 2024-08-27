import { StatusBar } from "expo-status-bar";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "@/navigation/DrawerNavigator";
import { PlayerProvider } from "@/context/PlayerContext";

export default function App() {
  return (
    <PaperProvider>
      <PlayerProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="black" />
          <DrawerNavigator />
        </NavigationContainer>
      </PlayerProvider>
    </PaperProvider>
  );
}
