import ArtistEntity from "@/domain/entities/ArtistEntity";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { ThemeContext } from "../context/ThemeContext";

interface ArtistCardProps {
  artist: ArtistEntity;
}

const AritstCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <Card
      key={artist.id}
      style={{
        backgroundColor: themeColors.artistCardBackground,
        shadowColor: themeColors.artistCardShadow,
        ...styles.gridItem,
      }}
    >
      <Card.Cover source={{ uri: artist.cover }} style={styles.gridItemCover} />
      <Card.Content>
        <Text variant="titleMedium" style={{ color: themeColors.text }}>
          {artist.name}
        </Text>
      </Card.Content>
    </Card>
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

export default AritstCard;
