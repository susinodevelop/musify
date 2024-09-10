import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "@/presentation/screens/HomeScreen";
import SearchScreen from "@/presentation/screens/SearchScreen";
import ProfileScreen from "@/presentation/screens/ProfileScreen";
import LibraryScreen from "@/presentation/screens/LibraryScreen";
import ExploreScreen from "@/presentation/screens/ExploreScreen";
import { ThemeContext } from "../context/ThemeContext";

type IoniconsName = keyof typeof Ionicons.glyphMap;

export type BottomNavigatorStackParams = {
  Home: undefined;
  Explore: undefined;
  Search: {
    title?: string;
  };
  Library: undefined;
};

const BottomTab = createBottomTabNavigator<BottomNavigatorStackParams>();

const BottomNavigator: React.FC = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: themeColors.bottomNavigationActiveText,
        tabBarInactiveTintColor: themeColors.bottomNavigationInactiveText,
        tabBarStyle: {
          backgroundColor: themeColors.bottomNavigationBackground,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IoniconsName = "home";

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Explore":
              iconName = focused ? "compass" : "compass-outline";
              break;
            case "Search":
              iconName = focused ? "search" : "search-outline";
              break;
            case "Library":
              iconName = focused ? "library" : "library-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Inicio" }}
      />
      <BottomTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ tabBarLabel: "Explorar" }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarLabel: "Buscar" }}
      />
      <BottomTab.Screen
        name="Library"
        component={LibraryScreen}
        options={{ tabBarLabel: "Biblioteca" }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
