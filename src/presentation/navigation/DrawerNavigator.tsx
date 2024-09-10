import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { IconButton } from "react-native-paper";
import ConfigurationScreen from "@/presentation/screens/ConfigurationScreen";
import SupportScreen from "@/presentation/screens/SupportScreen";
import CloseSessionScreen from "@/presentation/screens/CloseSessionScreen";
import BottomNavigator from "./BottomNavigator";
import { ThemeContext } from "../context/ThemeContext";

export type DrawerNavigatorStackParams = {
  BottomTabNavigator: undefined;
  Configuration: undefined;
  Support: undefined;
  CloseSession: undefined;
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
        drawerActiveTintColor: themeColors.drawerNavigationActiveText,
        drawerInactiveTintColor: themeColors.drawerNavigationInactiveText,
        headerStyle: {
          backgroundColor: themeColors.drawerNavigationBackground,
        },
        headerTintColor: themeColors.drawerNavigationActiveText,
      })}
    >
      <DrawerTab.Screen name="BottomTabNavigator" component={BottomNavigator} />
      <DrawerTab.Screen name="Configuration" component={ConfigurationScreen} />
      <DrawerTab.Screen name="Support" component={SupportScreen} />
      <DrawerTab.Screen name="CloseSession" component={CloseSessionScreen} />
    </DrawerTab.Navigator>
  );
};

export default DrawerNavigator;
