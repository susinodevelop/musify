import React, { useContext } from "react";
import TrackEntity from "@/domain/entities/TrackEntity";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import DraggableProgressBar from "./DraggableProgressBar";
import { IconButton } from "react-native-paper";
import { PlayerContext, TrackStatus } from "../context/PlayerContext";

interface HorizontalPlayerProps {
  track: TrackEntity;
}

const HorizontalPlayer: React.FC<HorizontalPlayerProps> = ({ track }) => {
  const { loadAndPlayTrack, pauseTrack, status, progress, updateProgress } =
    useContext(PlayerContext);

  const durationInMinutes = (track.duration / 60).toFixed(2);
  const progressInSeconds = track.duration * progress;
  const progressInMinutes = (progressInSeconds / 60).toFixed(2);

  const togglePlayPause = async () => {
    if (status === TrackStatus.PLAYING) {
      await pauseTrack();
    } else if (track) {
      await loadAndPlayTrack(track);
    }
  };

  return (
    <Pressable>
      <View style={styles.container}>
        <Image source={{ uri: track.cover }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{track.title}</Text>

          <DraggableProgressBar
            width={200}
            progress={progress}
            setProgress={updateProgress}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{`${progressInMinutes} / `}</Text>
            <Text style={styles.duration}>{`${durationInMinutes} min`}</Text>
          </View>
        </View>

        <View style={styles.reproductorContainer}>
          <IconButton
            icon={status === TrackStatus.PLAYING ? "pause" : "play"}
            size={40}
            onPress={togglePlayPause}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  image: {
    flex: 1,
    height: "100%",
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 3,
    flexDirection: "column",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  reproductorContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  time: {
    fontSize: 12,
    color: "black",
  },
  duration: {
    fontSize: 12,
    color: "black",
    textAlign: "right",
  },
});
export default HorizontalPlayer;
