import PlaylistEntity from "@/domain/entities/PlaylistEntity";
import React, { useContext, useState } from "react";
import { Card, Text } from "react-native-paper";
import { ThemeContext } from "../context/ThemeContext";
import { Pressable, StyleSheet } from "react-native";
import PlaylistModal from "./PlaylistModal";

interface PlaylistCardProps {
  playlist: PlaylistEntity;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const { themeColors } = useContext(ThemeContext);

  const [modalVisible, setModalVisible] = useState(false);
  //TODO revisar para que sea navegable y estilizar en tema dark

  const openPlaylistModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Pressable onPress={openPlaylistModal}>
        <Card
          style={{
            backgroundColor: themeColors.playlistCardBackground,
            shadowColor: themeColors.playlistCardShadow,
            ...styles.gridItem,
          }}
        >
          <Card.Cover
            source={{ uri: playlist.cover }}
            style={styles.gridItemCover}
          />
          <Card.Content>
            <Text variant="titleMedium" style={{ color: themeColors.title }}>
              {playlist.title}
            </Text>
            <Text variant="bodyMedium" style={{ color: themeColors.text }}>
              {playlist.totalTracks} - Canciones
            </Text>
          </Card.Content>
        </Card>
      </Pressable>
      <PlaylistModal
        playlist={playlist}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    width: 300,
    height: 400,
    elevation: 4,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  gridItemCover: {
    width: 300,
    height: 300,
  },
});
export default PlaylistCard;
