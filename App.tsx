import { StatusBar } from "expo-status-bar";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "@/presentation/navigation/DrawerNavigator";
import { PlayerProvider } from "@/presentation/context/PlayerContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RepositoryProvider } from "@/presentation/context/AppContext";
import { ThemeProvider } from "@/presentation/context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <RepositoryProvider>
          <PlayerProvider>
            <NavigationContainer>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="light" backgroundColor="black" />
                <DrawerNavigator />
              </GestureHandlerRootView>
            </NavigationContainer>
          </PlayerProvider>
        </RepositoryProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
