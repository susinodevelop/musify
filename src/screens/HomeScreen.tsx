import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Audio } from "expo-av";
import { searchTracks } from "../services/deezerService";
import { Track } from "../interfaces/Track";
import TrackCard from "../components/TrackCard";

const HomeScreen: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const result = await searchTracks("neffex");
      setTracks(result);
    };
    fetchTracks();
  }, []);

  const renderItem = ({ item }: { item: Track }) => <TrackCard track={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={tracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
});
