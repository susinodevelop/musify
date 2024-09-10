import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { IconButton } from "react-native-paper";
import ConfigurationScreen from "@/presentation/screens/ConfigurationScreen";
import SupportScreen from "@/presentation/screens/SupportScreen";
import CloseSessionScreen from "@/presentation/screens/CloseSessionScreen";
import BottomNavigator from "./BottomNavigator";
import { ThemeContext } from "../context/ThemeContext";
import ProfileScreen from "../screens/ProfileScreen";

export type DrawerNavigatorStackParams = {
  BottomTabNavigator: undefined;
  Configuration: undefined;
  Profile: undefined;
  Support: undefined;
};

const DrawerTab = createDrawerNavigator<DrawerNavigatorStackParams>();

const DrawerNavigator: React.FC = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <DrawerTab.Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={({ navigation }) => ({
        drawerPosition: "right",
        headerRight: () => (
          <IconButton
            icon="menu"
            size={24}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerLeft: () => null,
        drawerStyle: {
          backgroundColor: themeColors.drawerNavigationBackground,
        },
        drawerContentContainerStyle: {
          height: "100%",
          width: "100%",
          justifyContent: "center",
        },
        drawerLabelStyle: {
          fontSize: 16,
        },
        drawerItemStyle: {
          marginVertical: 5,
        },
        drawerActiveTintColor: themeColors.drawerNavigationActiveText,
        drawerInactiveTintColor: themeColors.drawerNavigationInactiveText,
        headerStyle: {
          backgroundColor: themeColors.drawerNavigationBackground,
        },
        headerTintColor: themeColors.drawerNavigationActiveText,
      })}
    >
      <DrawerTab.Screen
        name="BottomTabNavigator"
        component={BottomNavigator}
        options={{ drawerLabel: "Volver" }}
      />
      <DrawerTab.Screen name="Configuration" component={ConfigurationScreen} />
      <DrawerTab.Screen name="Profile" component={ProfileScreen} />
      <DrawerTab.Screen name="Support" component={SupportScreen} />
    </DrawerTab.Navigator>
  );
};

export default DrawerNavigator;
