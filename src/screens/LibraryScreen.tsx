import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LibraryDrawNavigator from "../navigation/LibraryDrawNavigator";

const LibraryScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Biblioteca</Text>
        <Pressable>
          <Text style={styles.searchPlaceholder}>Buscar en la Biblioteca</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.sidebar}>
        <LibraryDrawNavigator />
      </ScrollView>

      <ScrollView style={styles.mainContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Playlists</Text>
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>Añadir Nueva Playlist</Text>
          </Pressable>
          <View style={styles.playlistGrid}>
            {/* Repetir este bloque para cada playlist */}
            <View style={styles.playlistItem}>
              <Image
                source={{ uri: "https://via.placeholder.com/150" }}
                style={styles.playlistImage}
              />
              <Text style={styles.playlistName}>Mi Playlist Favorita</Text>
              <Text style={styles.playlistCount}>10 canciones</Text>
            </View>
            {/* Fin del bloque */}
          </View>
        </View>

        {/* Agrega más secciones como Canciones Favoritas, Álbumes, etc. */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    backgroundColor: "#6200ee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  searchPlaceholder: {
    color: "#fff",
    fontSize: 16,
  },
  sidebar: {
    backgroundColor: "#f4f4f4",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  playlistGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  playlistItem: {
    width: "48%",
    marginBottom: 15,
    alignItems: "center",
  },
  playlistImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  playlistCount: {
    fontSize: 14,
    color: "#666",
  },
});

export default LibraryScreen;
