import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { List, Avatar, Divider, ActivityIndicator } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import UserEntity from "@/domain/entities/UserEntity";
import { useRepositories } from "../context/RepositoryContext";
import Screen from "../components/Screen";
import { ThemeContext } from "../context/ThemeContext";

const screenWidth = Dimensions.get("window").width;

const ProfileScreen: React.FC = () => {
  const userId = `${process.env.EXPO_PUBLIC_USER_ID}`; //TODO revisar, recibir por parametros

  const { themeColors } = useContext(ThemeContext);
  const { userRepository } = useRepositories();
  const [user, setUser] = useState<UserEntity>();

  useEffect(() => {
    userRepository.getById(userId).then(setUser);
  }, []);

  //TODO revisar los colores del tema
  return user ? (
    <Screen>
      <ScrollView>
        {/* User Information */}
        <View style={styles.userInfo}>
          <Avatar.Image
            size={100}
            source={{ uri: user.profilePicture }} // Reemplaza con la URL de la imagen de perfil
          />
          <Text style={{ color: themeColors.text, ...styles.username }}>
            John Doe
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={{ color: themeColors.title, ...styles.sectionTitle }}>
            Public Playlists
          </Text>
          <List.Section>
            <List.Item
              title="My Favorite Tracks"
              description="Public Playlist"
              titleStyle={{ color: themeColors.title }}
              descriptionStyle={{ color: themeColors.text }}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="playlist-music"
                  color={themeColors.text}
                />
              )}
            />
            <List.Item
              title="Chill Vibes"
              description="Public Playlist"
              titleStyle={{ color: themeColors.title }}
              descriptionStyle={{ color: themeColors.text }}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="playlist-music"
                  color={themeColors.text}
                />
              )}
            />
            <List.Item
              title="Top Hits"
              description="Public Playlist"
              titleStyle={{ color: themeColors.title }}
              descriptionStyle={{ color: themeColors.text }}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="playlist-music"
                  color={themeColors.text}
                />
              )}
            />
          </List.Section>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={{ color: themeColors.title, ...styles.sectionTitle }}>
            Listening Stats
          </Text>
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
      </ScrollView>
    </Screen>
  ) : (
    <Screen>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={themeColors.activityIndicator} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
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
