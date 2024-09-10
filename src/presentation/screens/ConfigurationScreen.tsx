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

  const onPressChangePassword = () => {
    alert("Función no implementada aún"); //TODO revisar metodo y estilos del boton
  };

  return (
    <Screen>
      <View
        style={{
          backgroundColor: themeColors.configurationCardBackground,
          shadowColor: themeColors.configurationCardShadow,
          ...styles.configurationView,
          ...styles.themeView,
        }}
      >
        <Text style={{ color: themeColors.text, ...styles.configurationText }}>
          Tema: {theme === "dark" ? "Oscuro" : "Claro"}
        </Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>
      <Pressable onPress={onPressChangePassword}>
        <View
          style={{
            backgroundColor: themeColors.configurationCardBackground,
            shadowColor: themeColors.configurationCardShadow,
            ...styles.configurationView,
            ...styles.changePasswordView,
          }}
        >
          <Text
            style={{ color: themeColors.text, ...styles.configurationText }}
          >
            Cambiar contraseña
          </Text>
        </View>
      </Pressable>
    </Screen>
  );
};

const styles = StyleSheet.create({
  configurationView: {
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 20,
    elevation: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  themeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  changePasswordView: {
    paddingVertical: 12,
  },
  configurationText: {
    fontSize: 16,
  },
});

export default ConfigurationScreen;
