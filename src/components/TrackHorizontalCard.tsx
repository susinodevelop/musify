import { Track } from "@/interfaces/Track";
import { StackNavigatorStackParams } from "@/navigation/StackNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

interface TrackHorizontalCardProps {
  track: Track;
}

const TrackHorizontalCard: React.FC<TrackHorizontalCardProps> = ({ track }) => {
  const navigation = useNavigation<NavigationProp<StackNavigatorStackParams>>();

  const handleNavigationPress = () => {
    navigation.navigate("PlayerScreen", { track });
  };

  return (
    <Pressable onPress={handleNavigationPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: track.artwork["150x150"] }}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{track.title}</Text>
          <Text style={styles.description}>{track.description}</Text>
          <Text style={styles.duration}>{track.duration}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
    width: "90%",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  duration: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
});

export default TrackHorizontalCard;
