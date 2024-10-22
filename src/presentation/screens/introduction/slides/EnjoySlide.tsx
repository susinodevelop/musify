import React, { useContext } from "react";
import SlideItem from "../SlideItem";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "@/presentation/context/AppContext";
import { ThemeContext } from "@/presentation/context/ThemeContext";

const EnjoySlide: React.FC = () => {
  const { themeColors } = useContext(ThemeContext);

  const { setFirstTime } = useContext(AppContext);

  const title = "¡Disfruta!";
  const description = "Disfruta de todo lo que la música tiene para ofrecerte";
  const image = require("@images/introduction/enjoy.png");

  const onPress = async () => {
    await AsyncStorage.setItem("isFirstTime", "false");
    setFirstTime(false);
  };

  return (
    <View>
      <SlideItem title={title} description={description} image={image} />
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? themeColors.okButtonPressed
              : themeColors.okButton,
          },
          styles.startButton,
        ]}
      >
        <Text style={[styles.startText, { color: themeColors.okButtonText }]}>
          Comenzar
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  startButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    width: "30%",
    padding: 10,
    borderRadius: 5,
    marginRight: 20,
    marginBottom: 20,
  },
  startText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default EnjoySlide;
