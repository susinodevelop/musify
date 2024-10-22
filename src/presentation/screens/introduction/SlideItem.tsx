import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";

interface SlideItemProps {
  title: string;
  description: string;
  image: any;
}

const SlideItem = ({ title, description, image }: SlideItemProps) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ ...styles.container, width: width }}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={image}
        style={{ ...styles.image, width: width, height: width }}
      />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  description: {
    fontSize: 16,
    color: "black",
  },
  image: {
    marginVertical: 20,
  },
});

export default SlideItem;
