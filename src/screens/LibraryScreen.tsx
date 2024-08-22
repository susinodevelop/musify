import { Album } from "@/interfaces/Album";
import { Artist } from "@/interfaces/Artist";
import { Track } from "@/interfaces/Track";
import {
  getRandomAlbums,
  getRandomArtists,
  getRandomTracks,
} from "@/services/deezerService";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Appbar, Button, Card, Text, List } from "react-native-paper";

const LibraryScreen: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    getRandomAlbums("a", 5).then(setAlbums);
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
            {albums.map((album) => (
              <Card key={album.link} style={styles.gridItem}>
                <Card.Cover
                  source={{ uri: album.cover_big }}
                  style={styles.gridItemCover}
                />
                <Card.Content>
                  <Text variant="titleMedium">Mi Playlist Favorita</Text>
                  <Text variant="bodyMedium" style={styles.gridSubtitle}>
                    10 canciones
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
                key={track.link}
                title={track.title}
                description={`${track.artist.name} - ${track.album.title}`}
                left={() => (
                  <Image
                    source={{ uri: track.album.cover }}
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
            Álbumes
          </Text>
          <ScrollView horizontal>
            {albums.map((album) => (
              <Card key={album.link} style={styles.gridItem}>
                <Card.Cover
                  source={{ uri: album.cover_xl }}
                  style={styles.gridItemCover}
                />
                <Card.Content>
                  <Text variant="titleMedium">{album.title}</Text>
                  <Text variant="bodyMedium" style={styles.gridSubtitle}>
                    {album.type}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Artistas
          </Text>
          <ScrollView horizontal>
            {artists.map((artist) => (
              <Card key={artist.link} style={styles.gridItem}>
                <Card.Cover
                  source={{ uri: artist.picture_big }}
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
              <Card key={track.link} style={styles.gridItem}>
                <Card.Cover
                  source={{ uri: track.album.cover_big }}
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
                key={track.link}
                title={track.title}
                description={track.album.title}
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
