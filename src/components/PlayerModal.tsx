import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet, Modal, Pressable } from "react-native";
import { IconButton, ProgressBar } from "react-native-paper";
import { PlayerContext, TrackStatus } from "../context/PlayerContext";
import { Track } from "@/interfaces/Track";

interface PlayerModalProps {
  track: Track;
  visible: boolean;
  onClose: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({
  track,
  visible,
  onClose,
}) => {
  const {
    loadAndPlayTrack,
    pauseTrack,
    status,
    progress,
    isLooping,
    changeIsLooping,
  } = useContext(PlayerContext);

  const [currentProgress, setCurrentProgress] = useState(progress);

  useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

  const togglePlayPause = async () => {
    if (status === TrackStatus.PLAYING) {
      await pauseTrack();
    } else if (track) {
      await loadAndPlayTrack(track);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <IconButton icon="close-circle" size={24} iconColor="black" />
          </Pressable>
          <View style={styles.albumArtworkContainer}>
            <Image
              source={{ uri: track.artwork["480x480"] }}
              style={styles.albumArtwork}
            />
          </View>

          <View style={styles.songDetails}>
            <Text style={styles.songName}>{track.title}</Text>
            {/* <Text style={styles.artistAlbum}>{track.artist}</Text> TODO to revisar*/}
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
              icon={status === TrackStatus.PLAYING ? "pause" : "play"}
              size={40}
              onPress={togglePlayPause}
            />
            <IconButton
              icon="skip-next"
              size={30}
              onPress={() => alert("Next")}
            />
            <IconButton
              icon={isLooping ? "repeat" : "repeat-off"}
              size={30}
              onPress={changeIsLooping}
            />
          </View>

          <ProgressBar
            progress={currentProgress}
            color="#00BFFF"
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 18,
    color: "black",
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
    width: 200,
    height: 10,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 20,
    marginBottom: 80,
  },
  interactionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default PlayerModal;