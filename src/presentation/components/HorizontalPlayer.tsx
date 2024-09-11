import React, { useContext } from "react";
import TrackEntity from "@/domain/entities/TrackEntity";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import DraggableProgressBar from "./DraggableProgressBar";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { PlayerContext } from "../context/PlayerContext";
import { ThemeContext } from "../context/ThemeContext";

interface HorizontalPlayerProps {
  track: TrackEntity;
}

const HorizontalPlayer: React.FC<HorizontalPlayerProps> = ({ track }) => {
  const { themeColors } = useContext(ThemeContext);
  const {
    track: currentTrack,
    isLoaded,
    isPlaying,
    load,
    play,
    pause,
    progress,
    updateProgress,
  } = useContext(PlayerContext);

  const durationInMinutes = (track.duration / 60).toFixed(2);
  const progressInSeconds = track.duration * progress;
  const progressInMinutes = (progressInSeconds / 60).toFixed(2);

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
    <Pressable>
      <View
        style={{
          backgroundColor: themeColors.horizontalPlayerBackground,
          shadowColor: themeColors.horizontalPlayerShadow,
          ...styles.container,
        }}
      >
        <Image source={{ uri: track.cover }} style={styles.image} />
        <View style={styles.details}>
          <Text style={{ color: themeColors.title, ...styles.title }}>
            {track.title}
          </Text>

          <DraggableProgressBar
            width={200}
            progress={currentTrack?.id === track.id ? progress : 0}
            setProgress={updateProgress}
            allowDragging={isCurrentPlaying()}
          />
          <View style={styles.timeContainer}>
            <Text
              style={{ color: themeColors.text, ...styles.time }}
            >{`${progressInMinutes} / `}</Text>
            <Text
              style={{ color: themeColors.text, ...styles.duration }}
            >{`${durationInMinutes} min`}</Text>
          </View>
        </View>

        {isLoaded ? (
          <View style={styles.reproductorContainer}>
            <IconButton
              icon={isCurrentPlaying() ? "pause" : "play"}
              size={40}
              onPress={togglePlayPause}
            />
          </View>
        ) : (
          <View style={styles.reproductorContainer}>
            <ActivityIndicator color={themeColors.activityIndicator}/>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
    elevation: 4,
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
  },
  duration: {
    fontSize: 12,
    textAlign: "right",
  },
});
export default HorizontalPlayer;
