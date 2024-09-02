import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Playlist } from "@/interfaces/Playlist";
import {
  getPlaylistTracks,
  searchUserPlaylists,
} from "@/services/audiusService";
import { Track } from "@/interfaces/Track";
import TrackHorizontalCard from "@/components/TrackHorizontalCard";

const PlaylistScreen = () => {
  const [playlist, setPlaylist] = useState<Playlist>();
  const [tracks, setTracks] = useState<Track[]>();

  useEffect(() => {
    const loadData = async () => {
      const playlists = await searchUserPlaylists("susinodevelop");
      const playlist = playlists[0];
      const tracks = await getPlaylistTracks(playlist.id);
      console.log(tracks);
      setPlaylist(playlist);
      setTracks(tracks);
    };

    loadData();
  }, []);

  const handlePlay = (track: Track) => {
    // Implementar lógica de reproducción de canciones
    console.log("Playing:", track.title);
  };

  return (
    playlist && (
      <View style={styles.container}>
        <Image
          source={{ uri: playlist.artwork["480x480"] }}
          style={styles.coverImage}
        />
        <Text style={styles.description}>{playlist.description}</Text>

        <FlatList
          data={tracks}
          renderItem={({ item }) => <TrackHorizontalCard track={item} />}
          keyExtractor={(item) => item.id}
          style={styles.songList}
        />

        <View style={styles.interactionButtons}>
          <Pressable style={styles.button}>
            <Ionicons name="heart-outline" size={24} color="black" />
            <Text>Follow</Text>
          </Pressable>

          <Pressable style={styles.button}>
            <Ionicons name="star-outline" size={24} color="black" />
            <Text>Favorite</Text>
          </Pressable>

          <Pressable style={styles.button}>
            <Ionicons name="download-outline" size={24} color="black" />
            <Text>Download</Text>
          </Pressable>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  coverImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
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
    borderBottomColor: "#ddd",
  },
  songTitle: {
    fontSize: 16,
    color: "#000",
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
