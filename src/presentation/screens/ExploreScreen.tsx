import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import ScreenWithPlayer from "../components/ScreenWithPlayer";
import { ThemeContext } from "../context/ThemeContext";
import { useRepositories } from "../context/RepositoryContext";
import PlaylistEntity from "@/domain/entities/PlaylistEntity";
import PlaylistCard from "../components/PlaylistCard";
import { ScrollView } from "react-native-gesture-handler";

//TODO mejorar pantalla
const ExploreScreen = () => {
  const { playlistRepository } = useRepositories();
  const { themeColors } = useContext(ThemeContext);

  const [newReleases, setNewReleases] = useState<PlaylistEntity[]>([]);
  const [recommended, setRecommended] = useState<PlaylistEntity[]>([]);

  useEffect(() => {
    playlistRepository.getRandom("newReleases", 5).then(setNewReleases);
    playlistRepository.getRandom("recommended", 5).then(setRecommended);
  }, []);

  return (
    <ScreenWithPlayer>
      <ScrollView style={[styles.container]}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Nuevos Lanzamientos
        </Text>
        <FlatList
          data={newReleases}
          renderItem={({ item }) => <PlaylistCard playlist={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Recomendados para Ti
        </Text>
        <FlatList
          data={recommended}
          renderItem={({ item }) => <PlaylistCard playlist={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Tus Playlists
        </Text>
        {/*TODO  Aquí puedes añadir otra FlatList para las playlists del usuario */}
      </ScrollView>
    </ScreenWithPlayer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default ExploreScreen;
