import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

interface ScreenProps {
  children: React.ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: themeColors.screenBackground,
        ...styles.mainContainer,
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default Screen;
