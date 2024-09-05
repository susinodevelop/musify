import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { BottomNavigation, IconButton } from "react-native-paper";
import ConfigurationScreen from "@/screens/ConfigurationScreen";
import SupportScreen from "@/screens/SupportScreen";
import CloseSession from "@/screens/CloseSession";
import BottomNavigator from "./BottomNavigator";

export type DrawerNavigatorStackParams = {
  BottomTabNavigator: undefined;
  Configuration: undefined;
  Support: undefined;
  CloseSession: undefined;
};

const DrawerTab = createDrawerNavigator<DrawerNavigatorStackParams>();

const DrawerNavigator: React.FC = () => {
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
      })}
    >
      <DrawerTab.Screen name="BottomTabNavigator" component={BottomNavigator} />
      <DrawerTab.Screen name="Configuration" component={ConfigurationScreen} />
      <DrawerTab.Screen name="Support" component={SupportScreen} />
      <DrawerTab.Screen name="CloseSession" component={CloseSession} />
    </DrawerTab.Navigator>
  );
};

export default DrawerNavigator;
