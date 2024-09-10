import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { ThemeContext } from "@/presentation/context/ThemeContext";
import Screen from "@/presentation/components/Screen";

const ConfigurationScreen = () => {
  const { theme, themeColors, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Screen>
      <Text style={{ color: themeColors.title }}>Configuration Screen</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View>
          <Text style={{ color: themeColors.text }}>Theme: {theme}</Text>
        </View>
        <Pressable onPress={toggleTheme}>
          <View
            style={{
              height: 50,
              width: 100,
              backgroundColor: "blue",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: themeColors.text, fontWeight: "bold" }}>
              Cambiar Tema
            </Text>
          </View>
        </Pressable>
      </View>
    </Screen>
  );
};
export default ConfigurationScreen;
