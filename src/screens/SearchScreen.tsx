import React, { useEffect, useState } from "react";
import { View, TextInput, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Track } from "@/interfaces/Track";
import { searchTracks } from "@/services/audiusService";
import TrackHorizontalCard from "@/components/TrackHorizontalCard";

const SearchScreen: React.FC<{ title?: string }> = ({ title }) => {
  const [query, setQuery] = useState<string>("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (title !== undefined && title.length > 0) {
      setQuery(title);
      setLoading(true);
      searchTracks(title).then((result) => {
        setTracks(result);
        setLoading(false);
      });
    }
  }, [title]);

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
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <TrackHorizontalCard track={item} />
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  listContent: {
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
});

export default SearchScreen;