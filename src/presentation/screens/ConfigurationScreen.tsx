import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "@/presentation/context/ThemeContext";
import Screen from "@/presentation/components/Screen";
import { Switch } from "react-native-paper";

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
      <View
        style={{
          backgroundColor: themeColors.configurationCardBackground,
          shadowColor: themeColors.configurationCardShadow,
          ...styles.viewTheme,
        }}
      >
        <Text style={{ color: themeColors.text }}>
          Tema : {theme === "dark" ? "Oscuro" : "Claro"}
        </Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  viewTheme: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 20,
    elevation: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});

export default ConfigurationScreen;
