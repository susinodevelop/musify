import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import TrackHorizontalCard from "@/presentation/components/TrackHorizontalCard";
import TrackEntity from "@/domain/entities/TrackEntity";
import { useRepositories } from "../context/RepositoryContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { BottomNavigatorStackParams } from "../navigation/BottomNavigator";
import ScreenWithPlayer from "../components/ScreenWithPlayer";
import { ThemeContext } from "../context/ThemeContext";
import { TextInput } from "react-native-paper";

type SearchScreenRouteProps = RouteProp<BottomNavigatorStackParams, "Search">;

const SearchScreen: React.FC = () => {
  const { themeColors } = useContext(ThemeContext);
  const { trackRepository } = useRepositories();

  const route = useRoute<SearchScreenRouteProps>();

  const title = route.params?.title;

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
      {loading ? (
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
          <TextInput
            style={{
              backgroundColor: themeColors.inputTextBackground,
              ...styles.searchInput,
            }}
            placeholderTextColor={themeColors.inputTextPlaceholderColor}
            textColor={themeColors.inputTextColor}
            placeholder="Search for songs..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
          />
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
        </View>
      )}
    </ScreenWithPlayer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "gray", //TODO revisar en tema (separar en componente?)
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
