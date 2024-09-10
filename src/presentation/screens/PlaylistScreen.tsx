import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TrackHorizontalCard from "@/presentation/components/TrackHorizontalCard";
import PlaylistEntity from "@/domain/entities/PlaylistEntity";
import TrackEntity from "@/domain/entities/TrackEntity";
import { useRepositories } from "../context/RepositoryContext";
import { ThemeContext } from "../context/ThemeContext";
import ScreenWithPlayer from "../components/ScreenWithPlayer";

const PlaylistScreen = () => {
  const { themeColors } = useContext(ThemeContext);
  const { playlistRepository, userRepository } = useRepositories();
  const [playlist, setPlaylist] = useState<PlaylistEntity>();
  const [tracks, setTracks] = useState<TrackEntity[]>();

  useEffect(() => {
    const loadData = async () => {
      const playlists = await userRepository.getPlaylists("susinodevelop");
      const playlist = playlists[0];
      const tracks = await playlistRepository.getTracks(playlist.id);
      console.log(tracks);
      setPlaylist(playlist);
      setTracks(tracks);
    };

    loadData();
  }, []);

  const handlePlay = (track: TrackEntity) => {
    // Implementar lógica de reproducción de canciones
    console.log("Playing:", track.title);
  };

  return (
    playlist && (
      <ScreenWithPlayer>
        <Image source={{ uri: playlist.cover }} style={styles.coverImage} />
        <Text style={{ color: themeColors.text, ...styles.description }}>
          {playlist.description}
        </Text>

        <FlatList
          data={tracks}
          renderItem={({ item }) => <TrackHorizontalCard track={item} />}
          keyExtractor={(item) => item.id}
          style={styles.songList}
        />

        <View style={styles.interactionButtons}>
          <Pressable style={styles.button}>
            <Ionicons name="heart-outline" size={24} color="black" />
            <Text style={{ color: themeColors.text }}>Follow</Text>
          </Pressable>

          <Pressable style={styles.button}>
            <Ionicons name="star-outline" size={24} color="black" />
            <Text style={{ color: themeColors.text }}>Favorite</Text>
          </Pressable>

          <Pressable style={styles.button}>
            <Ionicons name="download-outline" size={24} color="black" />
            <Text style={{ color: themeColors.text }}>Download</Text>
          </Pressable>
        </View>
      </ScreenWithPlayer>
    )
  );
};

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  songList: {
    marginBottom: 20,
  },
  songItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd", //TODO revisar con el tema
  },
  interactionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PlaylistScreen;
