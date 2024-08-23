import { Artist } from "@/interfaces/Artist";
import { Playlist } from "@/interfaces/Playlist";
import { Track } from "@/interfaces/Track";
import {
  getRandomArtists,
  getRandomPlaylists,
  getRandomTracks,
} from "@/services/audiusService";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Appbar, Button, Card, Text, List } from "react-native-paper";

const LibraryScreen: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    getRandomPlaylists(5).then(setPlaylists);
    getRandomTracks("a", 5).then(setTracks);
    getRandomArtists("a", 5).then(setArtists);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainContent}>
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Playlists
          </Text>
          <Button mode="contained" onPress={() => {}} style={styles.addButton}>
            Añadir Nueva Playlist
          </Button>
          <ScrollView horizontal>
            {playlists.map((playlist) => (
              <Card key={playlist.id} style={styles.gridItem}>
                <Card.Cover
                  source={{ uri: playlist.artwork["480x480"] }}
                  style={styles.gridItemCover}
                />
                <Card.Content>
                  <Text variant="titleMedium">{playlist.title}</Text>
                  <Text variant="bodyMedium" style={styles.gridSubtitle}>
                    {playlist.repost_count} - Canciones
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Canciones Favoritas
          </Text>

          <List.Section>
            {tracks.map((track) => (
              <List.Item
                key={track.id}
                title={track.title}
                description={`${track.user.name} - ${track.genre}`}
                left={() => (
                  <Image
                    source={{ uri: track.artwork["480x480"] }}
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
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Artistas
          </Text>
          <ScrollView horizontal>
            {artists.map((artist) => (
              <Card key={artist.id} style={styles.gridItem}>
                <Card.Cover
                  source={{ uri: artist.cover_photo["640x"] }}
                  style={styles.gridItemCover}
                />
                <Card.Content>
                  <Text variant="titleMedium">{artist.name}</Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Descargas
          </Text>
          <ScrollView horizontal>
            {tracks.map((track) => (
              <Card key={track.id} style={styles.gridItem}>
                <Card.Cover
                  source={{ uri: track.artwork["480x480"] }}
                  style={styles.gridItemCover}
                />
                <Card.Content>
                  <Text variant="titleMedium">{track.title}</Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Historial
          </Text>
          <List.Section>
            {tracks.map((track) => (
              <List.Item
                key={track.id}
                title={track.title}
                description={track.description}
                left={() => <List.Icon icon="history" />}
              />
            ))}
          </List.Section>
        </View>
      </ScrollView>
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  gridItem: {
    width: 300,
    height: 400,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  gridItemCover: {
    width: 300,
    height: 300,
  },
  gridSubtitle: {
    color: "#666",
  },
});
