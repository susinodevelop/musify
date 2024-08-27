import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Track } from "../interfaces/Track";
import { IconButton } from "react-native-paper";
import useTrack, { TrackStatus } from "@/hooks/useTrack";

interface TrackCardProps {
  track: Track;
}

const TrackCard = ({ track }: TrackCardProps) => {
  const { sound, status, load, play, pause, unload } = useTrack();

  const handleActionButton = async () => {
    if (!sound) {
      load(track);
    }
    if (status !== TrackStatus.PLAYING) {
      play();
    } else if (status === TrackStatus.PLAYING) {
      pause();
    }
  };
  return (
    <View style={styles.card}>
      <View>
        <Image
          source={{ uri: track.artwork["480x480"] }}
          style={styles.cover}
        />
        {/* {sound && (
          <View style={styles.progressIcon}>
            <CircularProgressIcon />
          </View>
        )} */}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View style={styles.info}>
          <Text style={styles.title}>{track.title}</Text>
          <Text style={styles.artist}>{track.user.name}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "center",
            marginRight: 30,
          }}
        >
          <IconButton
            icon={status === TrackStatus.PLAYING ? "pause" : "play"}
            size={24}
            onPress={handleActionButton}
          />
        </View>
      </View>
    </View>
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
    flex: 1,
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
  progressIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 1000,
    opacity: 0.7,
  },
});

export default TrackCard;
