import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Button } from "react-native";
import { BottomNavigation } from "react-native-paper";
import BottomNavigator from "./BottomNavigator";
import HomeScreen from "@/screens/HomeScreen";
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import DrawerNavigator, { DrawerNavigatorStackParams } from "./DrawerNavigator";

const StackTab = createStackNavigator();

const StackNavigator = () => {
  const navigation =
    useNavigation<NavigationProp<DrawerNavigatorStackParams>>();

  return (
    <StackTab.Navigator
      screenOptions={{
        headerRight: () => (
          <Button
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            title="Menu"
            color="#000"
          />
        ),
      }}
    >
      <StackTab.Screen name="HomeScreen" component={HomeScreen} />
    </StackTab.Navigator>
  );
};
export default StackNavigator;
