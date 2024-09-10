import React, { useContext } from "react";
import { Text, View } from "react-native";
import Screen from "@/presentation/components/Screen";
import { ThemeContext } from "../context/ThemeContext";

const SupportScreen = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <Screen>
      <Text style={{ color: themeColors.text }}>Support Screen</Text>
    </Screen>
  );
};
export default SupportScreen;
