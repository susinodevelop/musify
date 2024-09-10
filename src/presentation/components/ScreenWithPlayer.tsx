import React, { useContext } from "react";
import HorizontalPlayer from "./HorizontalPlayer";
import { StyleSheet, View } from "react-native";
import { PlayerContext } from "../context/PlayerContext";
import { ThemeContext } from "../context/ThemeContext";
import Screen from "./Screen";

interface ScreenWithPlayerProps {
  children: React.ReactNode;
}

const ScreenWithPlayer: React.FC<ScreenWithPlayerProps> = ({ children }) => {
  const { themeColors } = useContext(ThemeContext);
  const { track } = useContext(PlayerContext);

  return (
    <Screen>
      {children}
      {track && (
        <View
          style={{
            borderTopColor: themeColors.horizontalPlayerBorderTop,
            ...styles.playerContainer,
          }}
        >
          <HorizontalPlayer track={track} />
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 1,
  },
});

export default ScreenWithPlayer;
