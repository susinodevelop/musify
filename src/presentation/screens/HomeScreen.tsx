import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import TrackCard from "../components/TrackCard";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BottomNavigatorStackParams } from "@/presentation/navigation/BottomNavigator";
import TrackEntity from "@/domain/entities/TrackEntity";
import { useRepositories } from "../context/RepositoryContext";
import ScreenWithPlayer from "../components/ScreenWithPlayer";
import { ThemeContext } from "../context/ThemeContext";

const HomeScreen: React.FC = () => {
  const { themeColors } = useContext(ThemeContext);
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
      <ScrollView
        style={{
          backgroundColor: themeColors.screenBackground,
          ...styles.container,
        }}
      >
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
        <View>
          <Text
            style={{
              color: themeColors.title,
              textShadowColor: themeColors.titleShadow,
              ...styles.titleText,
            }}
          >
            Para tí
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={forMeTracks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
        <View>
          <Text
            style={{
              color: themeColors.title,
              textShadowColor: themeColors.titleShadow,
              ...styles.titleText,
            }}
          >
            Nuevo
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={newTracks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
        <View>
          <Text
            style={{
              color: themeColors.title,
              textShadowColor: themeColors.titleShadow,
              ...styles.titleText,
            }}
          >
            Popular
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularTracks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
        <View>
          <Text
            style={{
              color: themeColors.title,
              textShadowColor: themeColors.titleShadow,
              ...styles.titleText,
            }}
          >
            Reciente
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
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
  },
  searchInput: {
    height: 60,
    borderColor: "#ccc", //TODO revisar con el tema
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 25,
  },
  titleText: {
    textAlign: "left",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 25,
    marginLeft: 25,
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 7,
  },
});
