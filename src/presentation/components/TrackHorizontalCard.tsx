import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import PlayerModal from "./PlayerModal";
import TrackEntity from "@/domain/entities/TrackEntity";
import { ThemeContext } from "../context/ThemeContext";

interface TrackHorizontalCardProps {
  track: TrackEntity;
}

const TrackHorizontalCard: React.FC<TrackHorizontalCardProps> = ({ track }) => {
  const { themeColors } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const handleNavigationPress = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Pressable onPress={handleNavigationPress}>
        <View
          style={{
            backgroundColor: themeColors.trackHorizontalCardBackground,
            shadowColor: themeColors.trackHorizontalCardShadow,
            ...styles.container,
          }}
        >
          <Image source={{ uri: track.cover }} style={styles.image} />
          <View style={styles.details}>
            <Text style={{ color: themeColors.title, ...styles.title }}>
              {track.title}
            </Text>
            <Text style={{ color: themeColors.text, ...styles.description }}>
              {track.description}
            </Text>
            <Text style={{ color: themeColors.text, ...styles.duration }}>
              {track.duration}
            </Text>
          </View>
        </View>
      </Pressable>
      <PlayerModal
        track={track}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
    width: "90%",
    elevation: 4,
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
  },
  description: {
    fontSize: 14,
    marginVertical: 4,
  },
  duration: {
    fontSize: 12,
    textAlign: "right",
  },
});

export default TrackHorizontalCard;
