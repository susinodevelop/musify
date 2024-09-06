import { StatusBar } from "expo-status-bar";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "@/navigation/DrawerNavigator";
import { PlayerProvider } from "@/context/PlayerContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <PaperProvider>
      <PlayerProvider>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" backgroundColor="black" />
            <DrawerNavigator />
          </GestureHandlerRootView>
        </NavigationContainer>
      </PlayerProvider>
    </PaperProvider>
  );
}
