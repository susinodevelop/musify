import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import PlayerModal from "./PlayerModal";
import { PlayerContext, TrackStatus } from "../context/PlayerContext";
import TrackEntity from "@/domain/entities/TrackEntity";

interface TrackCardProps {
  track: TrackEntity;
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const {
    loadAndPlayTrack,
    pauseTrack,
    status,
    track: currentTrack,
  } = useContext(PlayerContext);
  const [modalVisible, setModalVisible] = useState(false);

  const isCurrentTrackPlaying =
    currentTrack?.id === track.id && status === TrackStatus.PLAYING;

  const handlePressNavigation = () => {
    setModalVisible(true);
  };

  const handlePressPlay = async () => {
    if (isCurrentTrackPlaying) {
      await pauseTrack();
    } else {
      await loadAndPlayTrack(track);
    }
  };

  return (
    <>
      <Pressable onPress={handlePressNavigation}>
        <View style={styles.card}>
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
              <Text style={styles.title}>{track.title}</Text>
              <Text style={styles.artist}>{track.artist.name}</Text>
            </View>
            <View style={styles.playButtonContainer}>
              <IconButton
                icon={isCurrentTrackPlaying ? "pause" : "play"}
                size={24}
                onPress={handlePressPlay}
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
    backgroundColor: "#f8f8f8",
    marginVertical: 8,
    borderRadius: 25,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
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
    color: "#666",
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
