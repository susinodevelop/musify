import PlaylistEntity from "@/domain/entities/PlaylistEntity";
import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRepositories } from "../context/RepositoryContext";
import TrackEntity from "@/domain/entities/TrackEntity";
import TrackHorizontalCard from "./TrackHorizontalCard";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "../context/ThemeContext";
import HorizontalPlayer from "./HorizontalPlayer";
import { PlayerContext } from "../context/PlayerContext";

interface PlaylistModalProps {
  playlist: PlaylistEntity;
  visible: boolean;
  onClose: () => void;
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({
  visible,
  onClose,
  playlist,
}) => {
  const { themeColors } = useContext(ThemeContext);
  const { width: screenWitdth } = Dimensions.get("window");
  const { playlistRepository } = useRepositories();
  const { track } = useContext(PlayerContext);
  const [tracks, setTracks] = useState<TrackEntity[]>([]);

  useEffect(() => {
    const loadTracks = async () => {
      const tracks = await playlistRepository.getTracks(playlist.id);
      setTracks(tracks);
    };

    loadTracks();
  }, [playlist]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          backgroundColor: themeColors.screenBackground,
          ...styles.centeredView,
        }}
      >
        <View
          style={{
            shadowColor: themeColors.playlistCardShadow,
            ...styles.playlistFrontPage,
          }}
        >
          <Image
            source={{ uri: playlist.cover }}
            width={screenWitdth / 1.5}
            style={styles.playlistFrontPageImage}
          />
        </View>
        <ScrollView style={styles.modalView}>
          <Text style={{ color: themeColors.title, ...styles.modalTitle }}>
            {playlist.title}
          </Text>
          <Text style={{ color: themeColors.text, ...styles.modalDescription }}>
            {playlist.description}
          </Text>
          <View style={styles.trackList}>
            {tracks.map((track) => (
              <TrackHorizontalCard key={track.id} track={track} />
            ))}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  playlistFrontPage: {
    borderRadius: 40,
    elevation: 20,
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowOffset: { width: 50, height: 50 },
    marginBottom: 20,
  },
  playlistFrontPageImage: {
    aspectRatio: 1 / 1,
    borderRadius: 40,
  },
  modalView: {
    width: "100%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    alignItems: "center",
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  trackList: {
    width: "100%",
    alignItems: "center",
  },
  trackItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  trackTitle: {
    fontSize: 16,
  },
  trackArtist: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  playerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 1,
  },
});

export default PlaylistModal;
