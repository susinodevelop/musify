import ArtistEntity from "@/domain/entities/ArtistEntity";
import PlaylistEntity from "@/domain/entities/PlaylistEntity";
import TrackEntity from "@/domain/entities/TrackEntity";
import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image, Pressable } from "react-native";
import { Button, Text, List, ActivityIndicator } from "react-native-paper";
import { useRepositories } from "../context/RepositoryContext";
import ScreenWithPlayer from "../components/ScreenWithPlayer";
import { ThemeContext } from "../context/ThemeContext";
import TrackCard from "../components/TrackCard";
import PlaylistCard from "../components/PlaylistCard";
import AritstCard from "../components/ArtistCard";
import { PlayerContext } from "../context/PlayerContext";

const LibraryScreen: React.FC = () => {
  const { themeColors } = useContext(ThemeContext);
  const { trackRepository, playlistRepository, artistRepository } =
    useRepositories();
  const { load } = useContext(PlayerContext);
  const [playlists, setPlaylists] = useState<PlaylistEntity[]>([]);
  const [tracks, setTracks] = useState<TrackEntity[]>([]);
  const [artists, setArtists] = useState<ArtistEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const promisePlaylists = playlistRepository
      .getRandom("a", 5)
      .then(setPlaylists);
    const promiseTracks = trackRepository.getRandom("a", 5).then(setTracks);
    const promiseArtists = artistRepository.getRandom("a", 5).then(setArtists);

    Promise.all([promisePlaylists, promiseTracks, promiseArtists]).then(() =>
      setIsLoading(false)
    );
  }, []);

  return (
    <ScreenWithPlayer>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator
            size="large"
            color={themeColors.activityIndicator}
          />
        </View>
      ) : (
        <View style={styles.container}>
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
                  <PlaylistCard key={playlist.id} playlist={playlist} />
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
                  <Pressable key={track.id} onPress={() => load(track)}>
                    <List.Item
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
                  </Pressable>
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
                  <Pressable key={track.id} onPress={() => load(track)}>
                    <List.Item
                      title={track.title}
                      description={track.description}
                      titleStyle={{ color: themeColors.title }}
                      descriptionStyle={{ color: themeColors.text }}
                      left={() => (
                        <List.Icon icon="history" color={themeColors.text} />
                      )}
                      right={() => (
                        <Image
                          source={{ uri: track.cover }}
                          width={50}
                          height={50}
                          style={{ borderRadius: 5, marginLeft: 10 }}
                        />
                      )}
                    />
                  </Pressable>
                ))}
              </List.Section>
            </View>
          </ScrollView>
        </View>
      )}
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
