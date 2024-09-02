import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { IconButton, List, Avatar, Divider } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { getUserDetails, searchUserPlaylists } from "@/services/audiusService";
import { User } from "@/interfaces/User";

const screenWidth = Dimensions.get("window").width;

const ProfileScreen: React.FC = () => {
  const userId = `${process.env.EXPO_PUBLIC_USER_ID}`; //TODO revisar, recibir por parametros

  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUserDetails(userId).then(setUser);
  }, []);

  return (
    user && (
      <ScrollView style={styles.container}>
        {/* User Information */}
        <View style={styles.userInfo}>
          <Avatar.Image
            size={100}
            source={{ uri: user.profile_picture["480x480"] }} // Reemplaza con la URL de la imagen de perfil
          />
          <Text style={styles.username}>John Doe</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Public Playlists</Text>
          <List.Section>
            <List.Item
              title="My Favorite Tracks"
              description="Public Playlist"
              left={(props) => <List.Icon {...props} icon="playlist-music" />}
            />
            <List.Item
              title="Chill Vibes"
              description="Public Playlist"
              left={(props) => <List.Icon {...props} icon="playlist-music" />}
            />
            <List.Item
              title="Top Hits"
              description="Public Playlist"
              left={(props) => <List.Icon {...props} icon="playlist-music" />}
            />
          </List.Section>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Listening Stats</Text>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                },
              ],
            }}
            width={screenWidth - 40}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#1e2923",
              backgroundGradientFrom: "#08130d",
              backgroundGradientTo: "#08130d",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <List.Section>
            <List.Item
              title="Change Password"
              left={(props) => <List.Icon {...props} icon="lock" />}
              onPress={() => console.log("Change Password")}
            />
            <List.Item
              title="Manage Subscriptions"
              left={(props) => <List.Icon {...props} icon="credit-card" />}
              onPress={() => console.log("Manage Subscriptions")}
            />
            <List.Item
              title="Privacy Options"
              left={(props) => <List.Icon {...props} icon="shield" />}
              onPress={() => console.log("Privacy Options")}
            />
          </List.Section>
        </View>
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  userInfo: {
    alignItems: "center",
    padding: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  divider: {
    marginVertical: 10,
    height: 1,
    backgroundColor: "#ddd",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ProfileScreen;
