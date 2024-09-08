import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import TrackHorizontalCard from "@/presentation/components/TrackHorizontalCard";
import TrackEntity from "@/domain/entities/TrackEntity";
import { useRepositories } from "../context/AppContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { BottomNavigatorStackParams } from "../navigation/BottomNavigator";
import ScreenWithPlayer from "../components/ScreenWithPlayer";

type SearchScreenRouteProps = RouteProp<BottomNavigatorStackParams, "Search">;

const SearchScreen: React.FC = () => {
  const { trackRepository } = useRepositories();

  const route = useRoute<SearchScreenRouteProps>();

  const title = route.params?.title ;

  const [query, setQuery] = useState<string>("");
  const [tracks, setTracks] = useState<TrackEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (title !== undefined && title.length > 0) {
      setQuery(title);
      setLoading(true);
      trackRepository.search(title).then((result) => {
        setTracks(result);
        setLoading(false);
      });
    }
  }, [title]);

  const handleSearch = async () => {
    if (query.length > 0) {
      setLoading(true);
      const result = await trackRepository.search(query);
      setTracks(result);
      setLoading(false);
    }
  };

  return (
    <ScreenWithPlayer>
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
    </ScreenWithPlayer>
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
