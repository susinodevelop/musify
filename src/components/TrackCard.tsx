import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View, Text } from "react-native";
import { Track } from "../interfaces/Track";
import { Audio } from "expo-av";
import CircularProgressIcon from "./CircularProgressIcon";
import { IconButton } from "react-native-paper";
import { getStreameableTrackMp3 } from "@/services/audiusService";

interface TrackCardProps {
  track: Track;
}

const TrackCard = ({ track }: TrackCardProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleActionButton = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      return;
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: getStreameableTrackMp3(track.id) },
      { shouldPlay: true }
    );
    setSound(newSound);
    setIsPlaying(true);

    // Detect when the sound ends to reset the play/pause icon
    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        setIsPlaying(false);
        setSound(null);
      }
    });
  };
  return (
    <View style={styles.card}>
      <View>
        <Image source={{ uri: track.artwork["150x150"] }} style={styles.cover} />
        {sound && (
          <View style={styles.progressIcon}>
            <CircularProgressIcon track={sound} />
          </View>
        )}
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
            icon={isPlaying ? "pause" : "play"}
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
    elevation: 2, // shadow para Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // shadow para iOS
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
