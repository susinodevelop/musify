import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import EnjoySlide from "./slides/EnjoySlide";
import ChooseSlide from "./slides/ChooseSlide";

const IntroSlideshow: React.FC = () => {
  const slides = [<ChooseSlide />, <EnjoySlide />];

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}
        horizontal
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default IntroSlideshow;
