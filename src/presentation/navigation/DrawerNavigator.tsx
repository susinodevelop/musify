import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import ConfigurationScreen from "@/presentation/screens/ConfigurationScreen";
import InformationScreen from "@/presentation/screens/InformationScreen";
import BottomNavigator from "./BottomNavigator";
import { ThemeContext } from "../context/ThemeContext";
import ProfileScreen from "../screens/ProfileScreen";
import IntroSlideshow from "../screens/introduction/IntroSlideshow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../context/AppContext";

export type DrawerNavigatorStackParams = {
  BottomTabNavigator: undefined;
  Configuration: undefined;
  Profile: undefined;
  Support: undefined;
};

const DrawerTab = createDrawerNavigator<DrawerNavigatorStackParams>();

const DrawerNavigator: React.FC = () => {
  const { themeColors } = useContext(ThemeContext);
  const { isFirstTime, setFirstTime } = useContext(AppContext);

  const checkFirstTime = async () => {
    try {
      const isFirstTimeStored = await AsyncStorage.getItem("isFirstTime");
      if (isFirstTimeStored === null || isFirstTimeStored === "true") {
        setFirstTime(true);
        await AsyncStorage.setItem("isFirstTime", "true");
      }
    } catch (error) {
      console.error("Error al acceder a AsyncStorage", error);
    }
  };

  useEffect(() => {
    checkFirstTime();
  }, []);

  if (isFirstTime) {
    return <IntroSlideshow />;
  }

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
        options={{ drawerLabel: "Volver", title: "Inicio" }}
      />
      <DrawerTab.Screen
        name="Configuration"
        component={ConfigurationScreen}
        options={{ drawerLabel: "Configuración", title: "Configuración" }}
      />
      <DrawerTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ drawerLabel: "Perfil", title: "Perfil" }}
      />
      <DrawerTab.Screen
        name="Support"
        component={InformationScreen}
        options={{ drawerLabel: "Información", title: "Información" }}
      />
    </DrawerTab.Navigator>
  );
};

export default DrawerNavigator;
