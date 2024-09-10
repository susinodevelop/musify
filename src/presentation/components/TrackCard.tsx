import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import PlayerModal from "./PlayerModal";
import { PlayerContext } from "../context/PlayerContext";
import TrackEntity from "@/domain/entities/TrackEntity";
import { ThemeContext } from "../context/ThemeContext";

interface TrackCardProps {
  track: TrackEntity;
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const { themeColors } = useContext(ThemeContext);
  const {
    track: currentTrack,
    isPlaying,
    load,
    play,
    pause,
  } = useContext(PlayerContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePressNavigation = () => {
    setModalVisible(true);
  };

  const togglePlayPause = async () => {
    if (!currentTrack || currentTrack.id !== track.id) {
      await load(track);
      return;
    }
    if (isPlaying) {
      await pause();
    } else {
      await play();
    }
  };

  const isCurrentPlaying = () => {
    return isPlaying && currentTrack!.id === track.id;
  };

  return (
    <>
      <Pressable onPress={handlePressNavigation}>
        <View
          style={{
            backgroundColor: themeColors.trackCardBackground,
            shadowColor: themeColors.trackCardShadow,
            ...styles.card,
          }}
        >
          <View>
            <Image source={{ uri: track.cover }} style={styles.cover} />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <View style={styles.info}>
              <Text style={{ color: themeColors.title, ...styles.title }}>
                {track.title}
              </Text>
              <Text style={{ color: themeColors.text, ...styles.artist }}>
                {track.artist.name}
              </Text>
            </View>
            <View style={styles.playButtonContainer}>
              <IconButton
                icon={isCurrentPlaying() ? "pause" : "play"}
                size={24}
                onPress={togglePlayPause}
              />
            </View>
          </View>
        </View>
      </Pressable>
      <PlayerModal
        track={track}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    marginVertical: 8,
    borderRadius: 25,
    overflow: "hidden",
    elevation: 4,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: 400,
    width: 300,
    marginHorizontal: 20,
  },
  cover: {
    width: 300,
    height: 300,
    borderRadius: 25,
  },
  info: {
    flex: 4,
    flexDirection: "column",
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  artist: {
    fontSize: 14,
    marginTop: 4,
  },
  playButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 20,
  },
});

export default TrackCard;
