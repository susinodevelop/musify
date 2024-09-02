import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LibraryScreen from "@/screens/LibraryScreen";
import ExploreScreen from "@/screens/ExploreScreen";

type IoniconsName = keyof typeof Ionicons.glyphMap;

export type BottomNavigatorStackParams = {
  Home: undefined;
  Explore: undefined;
  Search: {
    title?: string;
  };
  Library: undefined;
  Profile: undefined;
};

const BottomTab = createBottomTabNavigator<BottomNavigatorStackParams>();

const BottomNavigator: React.FC = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
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
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Explore" component={ExploreScreen} />
      <BottomTab.Screen name="Search" component={SearchScreen} />
      <BottomTab.Screen name="Library" component={LibraryScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;