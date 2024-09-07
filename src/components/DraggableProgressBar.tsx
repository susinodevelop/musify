import React, { useState } from "react";
import { StyleSheet, LayoutChangeEvent, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  gestureHandlerRootHOC,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface DraggableProgressBarProps {
  progress: number;
  setProgress: (progress: number) => void;
  color?: string;
}

const DraggableProgressBar = gestureHandlerRootHOC(
  ({ progress, setProgress, color = "red" }: DraggableProgressBarProps) => {
    const thisX = useSharedValue(progress);
    const [width, setWidth] = useState(0);

    const onLayout = (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setWidth(width);
    };

    const pan = Gesture.Pan()
      .enabled(true)
      .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
        const touchX = Math.max(0, Math.min(event.x, width));
        thisX.value = touchX / width;
        runOnJS(setProgress)(thisX.value);
      })
      .onEnd(() => {
        runOnJS(setProgress)(thisX.value);
      });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        width: `${thisX.value * 100}%`,
      };
    });

    return (
      <View style={styles.container}>
        <GestureDetector gesture={pan}>
          <View style={styles.progressBarBackground} onLayout={onLayout}>
            <Animated.View
              style={[
                styles.progressBarFill,
                animatedStyle,
                { backgroundColor: color  },
              ]}
            />
          </View>
        </GestureDetector>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  progressBarBackground: {
    width: 300,
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },
});

export default DraggableProgressBar;
