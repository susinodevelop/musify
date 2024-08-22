import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";
import { searchTracks } from "../services/deezerService";
import { Track } from "../interfaces/Track";
import TrackCard from "../components/TrackCard";

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [tracks, setTracks] = useState<any[]>([]); // Cambia el tipo según la respuesta de la API
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (query.length > 0) {
      setLoading(true);
      const result = await searchTracks(query);
      setTracks(result);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for songs..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TrackCard track={item} />}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  list: {
    marginTop: 16,
  },
  card: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cover: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  info: {
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  artist: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default SearchScreen;
