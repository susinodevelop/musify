import { Track } from "@/interfaces/Track";
import { searchTracks } from "@/services/audiusService";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { IconButton, ProgressBar } from "react-native-paper";

const PlayerScreen: React.FC = () => {
  const [track, setTrack] = useState<Track>(); //TODO revisar, recibir por parametros
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.5);

  useEffect(() => {
    searchTracks("h").then((tracks) => setTrack(tracks[0]));
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    track && (
      <View style={styles.container}>
        <View style={styles.albumArtworkContainer}>
          <Image
            source={{ uri: track.artwork["480x480"] }}
            style={styles.albumArtwork}
          />
        </View>

        <View style={styles.songDetails}>
          <Text style={styles.songName}>Song Name</Text>
          <Text style={styles.artistAlbum}>Artist - Album</Text>
        </View>

        <View style={styles.playbackControls}>
          <IconButton
            icon="shuffle"
            size={30}
            onPress={() => console.log("Shuffle")}
          />
          <IconButton
            icon="skip-previous"
            size={30}
            onPress={() => alert("Previous")}
          />
          <IconButton
            icon={isPlaying ? "pause" : "play"}
            size={40}
            onPress={togglePlayPause}
          />
          <IconButton
            icon="skip-next"
            size={30}
            onPress={() => alert("Next")}
          />
          <IconButton icon="repeat" size={30} onPress={() => alert("Repeat")} />
        </View>

        <ProgressBar
          progress={progress}
          color="#1DB954"
          style={styles.progressBar}
        />

        <View style={styles.interactionButtons}>
          <IconButton
            icon="playlist-plus"
            size={30}
            onPress={() => alert("Add to Playlist")}
          />
          <IconButton
            icon="heart-outline"
            size={30}
            onPress={() => alert("Favorite")}
          />
          <IconButton
            icon="share-variant"
            size={30}
            onPress={() => alert("Share")}
          />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  albumArtwork: {
    borderRadius: 10,
    width: 300,
    height: 300,
  },
  albumArtworkContainer: {
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 20,
    borderRadius: 10,
  },
  songDetails: {
    alignItems: "center",
    marginVertical: 20,
  },
  songName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  artistAlbum: {
    fontSize: 16,
    color: "#888",
    marginTop: 4,
  },
  playbackControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  progressBar: {
    width: "80%",
    height: 4,
    marginBottom: 20,
  },
  interactionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default PlayerScreen;
