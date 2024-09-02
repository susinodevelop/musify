import { Track } from "@/interfaces/Track";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface TrackHorizontalCardProps {
  track: Track;
}

const TrackHorizontalCard: React.FC<TrackHorizontalCardProps> = ({ track }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: track.artwork["150x150"] }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.description}>{track.description}</Text>
        <Text style={styles.duration}>{track.duration}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1c1c1c",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
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
    color: "white",
  },
  description: {
    fontSize: 14,
    color: "#b3b3b3",
    marginVertical: 4,
  },
  duration: {
    fontSize: 12,
    color: "#b3b3b3",
    textAlign: "right",
  },
});

export default TrackHorizontalCard;
