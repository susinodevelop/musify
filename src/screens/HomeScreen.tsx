import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { searchTracks } from "../services/audiusService";
import { Track } from "../interfaces/Track";
import TrackCard from "../components/TrackCard";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen: React.FC = () => {
  const [forMeTracks, setForMeTracks] = useState<Track[]>([]);
  const [newTracks, setNewTracks] = useState<Track[]>([]);
  const [popularTracks, setPopularTracks] = useState<Track[]>([]);
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);

  useEffect(() => {
    searchTracks("hardstyle").then(setForMeTracks);
    searchTracks("rock").then(setNewTracks);
    searchTracks("fito y fitipaldis").then(setPopularTracks);
    searchTracks("adele").then(setRecentTracks);
  }, []);

  const renderItem = ({ item }: { item: Track }) => <TrackCard track={item} />;

  return (
    <ScrollView style={styles.container}>
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
