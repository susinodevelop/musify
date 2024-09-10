import React, { useContext } from "react";
import { Text, View } from "react-native";
import ScreenWithPlayer from "../components/ScreenWithPlayer";
import { ThemeContext } from "../context/ThemeContext";

const ExploreScreen = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <ScreenWithPlayer>
      <View>
        <Text style={{ color: themeColors.text }}>Explore Screen</Text>
      </View>
    </ScreenWithPlayer>
  );
};

export default ExploreScreen;
