import ArtistEntity from "@/domain/entities/ArtistEntity";
import PlaylistEntity from "@/domain/entities/PlaylistEntity";
import TrackEntity from "@/domain/entities/TrackEntity";
import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Appbar, Button, Card, Text, List } from "react-native-paper";
import { useRepositories } from "../context/AppContext";
import ScreenWithPlayer from "../components/ScreenWithPlayer";
import { ThemeContext } from "../context/ThemeContext";
import TrackCard from "../components/TrackCard";
import PlaylistCard from "../components/PlaylistCard";
import AritstCard from "../components/ArtistCard";

const LibraryScreen: React.FC = () => {
  const { themeColors } = useContext(ThemeContext);
  const { trackRepository, playlistRepository, artistRepository } =
    useRepositories();
  const [playlists, setPlaylists] = useState<PlaylistEntity[]>([]);
  const [tracks, setTracks] = useState<TrackEntity[]>([]);
  const [artists, setArtists] = useState<ArtistEntity[]>([]);

  useEffect(() => {
    playlistRepository.getRandom("a", 5).then(setPlaylists);
    trackRepository.getRandom("a", 5).then(setTracks);
    artistRepository.getRandom("a", 5).then(setArtists);
  }, []);

  return (
    <ScreenWithPlayer>
      <View
        style={{
          backgroundColor: themeColors.screenBackground,
          ...styles.container,
        }}
      >
        <ScrollView style={styles.mainContent}>
          <View style={styles.section}>
            <Text
              variant="titleLarge"
              style={{ color: themeColors.title, ...styles.sectionTitle }}
            >
              Playlists
            </Text>
            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.addButton}
            >
              Añadir Nueva Playlist
            </Button>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {playlists.map((playlist) => (
                <PlaylistCard playlist={playlist} />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text
              variant="titleLarge"
              style={{ color: themeColors.title, ...styles.sectionTitle }}
            >
              Canciones Favoritas
            </Text>

            <List.Section>
              {tracks.map((track) => (
                <List.Item
                  key={track.id}
                  title={track.title}
                  description={`${track.artist.name} - ${track.genre}`}
                  titleStyle={{ color: themeColors.title }}
                  descriptionStyle={{ color: themeColors.text }}
                  left={() => (
                    <Image
                      source={{ uri: track.cover }}
                      width={50}
                      height={50}
                      borderRadius={5}
                    />
                  )}
                />
              ))}
            </List.Section>
          </View>

          <View style={styles.section}>
            <Text
              variant="titleLarge"
              style={{ color: themeColors.title, ...styles.sectionTitle }}
            >
              Artistas
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {artists.map((artist) => (
                <AritstCard key={artist.id} artist={artist} />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text
              variant="titleLarge"
              style={{ color: themeColors.title, ...styles.sectionTitle }}
            >
              Descargas
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {tracks.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text
              variant="titleLarge"
              style={{ color: themeColors.title, ...styles.sectionTitle }}
            >
              Historial
            </Text>
            <List.Section>
              {tracks.map((track) => (
                <List.Item
                  key={track.id}
                  title={track.title}
                  description={track.description}
                  titleStyle={{ color: themeColors.title }}
                  descriptionStyle={{ color: themeColors.text }}
                  left={() => (
                    <List.Icon icon="history" color={themeColors.text} />
                  )}
                />
              ))}
            </List.Section>
          </View>
        </ScrollView>
      </View>
    </ScreenWithPlayer>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  addButton: {
    marginBottom: 10,
  },
});
