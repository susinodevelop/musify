import React, { useContext } from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "@/presentation/navigation/DrawerNavigator";
import { PlayerProvider } from "@/presentation/context/PlayerContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RepositoryProvider } from "@/presentation/context/AppContext";
import {
  ThemeContext,
  ThemeProvider,
} from "@/presentation/context/ThemeContext";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <RepositoryProvider>
          <PlayerProvider>
            <NavigationContainer>
              <AppContent />
            </NavigationContainer>
          </PlayerProvider>
        </RepositoryProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}

const AppContent = () => {
  const { theme, themeColors } = useContext(ThemeContext);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={themeColors.screenBackground}
      />
      <DrawerNavigator />
    </GestureHandlerRootView>
  );
};
