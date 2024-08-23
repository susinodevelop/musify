import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Card } from "react-native-paper";
import { getUserDetails, searchUserPlaylists } from "@/services/audiusService";
import { User } from "@/interfaces/User";
import { Playlist } from "@/interfaces/Playlist";

const ProfileScreen = () => {
  const userId = `${process.env.EXPO_PUBLIC_USER_ID}`;

  const [user, setUser] = useState<User | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userDetails = await getUserDetails(userId);
        setUser(userDetails);
        searchUserPlaylists(userDetails.handle).then(setPlaylists).catch(console.log);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("No se pudo cargar el perfil.");
      }
    };

    fetchProfileData();

    
  }, []);

  const renderPlaylist = ({ item }: { item: Playlist }) => (
    <Card style={styles.playlistCard}>
      <Card.Cover source={{ uri: item.artwork["480x480"] }} />
      <Card.Content>
        <Text style={styles.playlistTitle}>{item.title}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {user ? (
        <>
          <LinearGradient
            colors={["#1DB954", "#121212"]}
            style={styles.headerBackground}
          >
            <Image
              source={{ uri: user.profile_picture["480x480"] }}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userFollowers}>
              {user.follower_count} seguidores
            </Text>
          </LinearGradient>

          <View style={styles.playlistsContainer}>
            <Text style={styles.sectionTitle}>Playlists</Text>
            <FlatList
              data={playlists}
              renderItem={renderPlaylist}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </>
      ) : (
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  errorText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  loadingText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  headerBackground: {
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#1DB954",
    marginBottom: 15,
  },
  userName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userFollowers: {
    color: "#b3b3b3",
    fontSize: 16,
  },
  playlistsContainer: {
    marginTop: 20,
    paddingLeft: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  playlistCard: {
    backgroundColor: "#1c1c1c",
    marginRight: 15,
    width: 150,
  },
  playlistTitle: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
});
