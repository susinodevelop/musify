import React, { useContext } from "react";
import HorizontalPlayer from "./HorizontalPlayer";
import { StyleSheet, View } from "react-native";
import { PlayerContext } from "../context/PlayerContext";

interface ScreenWithPlayerProps {
  children: React.ReactNode;
}

const ScreenWithPlayer: React.FC<ScreenWithPlayerProps> = ({ children }) => {
  const { track } = useContext(PlayerContext);

  return (
    <>
      {children}
      {track && (
        <View style={styles.container}>
          <HorizontalPlayer track={track} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
  },
});

export default ScreenWithPlayer;
