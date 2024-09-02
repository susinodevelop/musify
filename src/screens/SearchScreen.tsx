import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { searchTracks } from "../services/audiusService";
import { Track } from "../interfaces/Track";
import TrackCard from "../components/TrackCard";
import { RouteProp, useRoute } from "@react-navigation/native";
import { BottomNavigatorStackParams } from "@/navigation/BottomNavigator";

type SearchScreenRouteProps = RouteProp<BottomNavigatorStackParams, "Search">;

const SearchScreen: React.FC = () => {
  const route = useRoute<SearchScreenRouteProps>();
  const title = route.params?.title;
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
