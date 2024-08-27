import HomeScreen from "@/screens/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Text } from "react-native";
import { BottomNavigation, IconButton } from "react-native-paper";
import BottomNavigator from "./BottomNavigator";
import ConfigurationScreen from "@/screens/ConfigurationScreen";
import SupportScreen from "@/screens/SupportScreen";
import CloseSession from "@/screens/CloseSession";

export type DrawerNavigatorStackParams = {
  BottomNavigator: undefined;
  Configuration: undefined;
  Support: undefined;
  CloseSession: undefined;
};

const DrawerTab = createDrawerNavigator<DrawerNavigatorStackParams>();

const DrawerNavigator: React.FC = () => {
  return (
    <DrawerTab.Navigator
      initialRouteName="BottomNavigator"
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
      })}
    >
      <DrawerTab.Screen name="BottomNavigator" component={BottomNavigator} />
      <DrawerTab.Screen name="Configuration" component={ConfigurationScreen} />
      <DrawerTab.Screen name="Support" component={SupportScreen} />
      <DrawerTab.Screen name="CloseSession" component={CloseSession} />
    </DrawerTab.Navigator>
  );
};

export default DrawerNavigator;
