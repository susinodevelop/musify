import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BottomNavigator from "./BottomNavigator";
import PlayerScreen from "@/screens/PlayerScreen";
import { Track } from "@/interfaces/Track";

export type StackNavigatorStackParams = {
  Main: undefined;
  PlayerScreen: {
    track: Track;
  };
};

const StackTab = createStackNavigator<StackNavigatorStackParams>();

const StackNavigator = () => {
  return (
    <StackTab.Navigator>
      <StackTab.Screen name="Main" component={BottomNavigator} />
      <StackTab.Screen name="PlayerScreen" component={PlayerScreen} />
    </StackTab.Navigator>
  );
};
export default StackNavigator;
