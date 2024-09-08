import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import TrackCard from "../components/TrackCard";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BottomNavigatorStackParams } from "@/presentation/navigation/BottomNavigator";
import TrackEntity from "@/domain/entities/TrackEntity";
import { useRepositories } from "../context/AppContext";
import ScreenWithPlayer from "../components/ScreenWithPlayer";

const HomeScreen: React.FC = () => {
  const { trackRepository } = useRepositories();
  const navigation =
    useNavigation<NavigationProp<BottomNavigatorStackParams>>();

  const [query, setQuery] = useState<string>("");
  const [forMeTracks, setForMeTracks] = useState<TrackEntity[]>([]);
  const [newTracks, setNewTracks] = useState<TrackEntity[]>([]);
  const [popularTracks, setPopularTracks] = useState<TrackEntity[]>([]);
  const [recentTracks, setRecentTracks] = useState<TrackEntity[]>([]);

  //TODO revisar algoritmo de carga de canciones
  useEffect(() => {
    trackRepository.getRandom("hardstyle", 5).then(setForMeTracks);
    trackRepository.getRandom("rock", 5).then(setNewTracks);
    trackRepository.getRandom("fito y fitipaldis", 5).then(setPopularTracks);
    trackRepository.getRandom("adele", 5).then(setRecentTracks);
  }, []);

  const renderItem = ({ item }: { item: TrackEntity }) => (
    <TrackCard track={item} />
  );

  const handleSearch = () => {
    navigation.navigate("Search", { title: query });
    setQuery("");
  };

  return (
    <ScreenWithPlayer>
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for songs..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <View>
          <Text style={styles.titleText}>Para tí</Text>
          <FlatList
            horizontal
            data={forMeTracks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
        <View>
          <Text style={styles.titleText}>Nuevo</Text>
          <FlatList
            horizontal
            data={newTracks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
        <View>
          <Text style={styles.titleText}>Popular</Text>
          <FlatList
            horizontal
            data={popularTracks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
        <View>
          <Text style={styles.titleText}>Reciente</Text>
          <FlatList
            horizontal
            data={recentTracks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>
    </ScreenWithPlayer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 25,
    backgroundColor: "#f9f9f9",
  },
  titleText: {
    textAlign: "left",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 25,
    marginLeft: 25,
    textShadowColor: "lightgray",
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 7,
  },
});
