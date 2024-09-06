import React, { useState } from "react";
import { StyleSheet, LayoutChangeEvent, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  gestureHandlerRootHOC,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { ProgressBar } from "react-native-paper";
import { runOnJS, useSharedValue } from "react-native-reanimated";

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

    return (
      <View onLayout={onLayout} style={styles.container}>
        <GestureDetector gesture={pan}>
          <View style={styles.progressBarContainer}>
            <ProgressBar
              progress={thisX.value}
              color={color}
              style={styles.progressBar}
            />
          </View>
        </GestureDetector>
      </View>
    );
  }
);

// TODO revisar
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignContent: "center",
  },
  progressBarContainer: {
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  progressBar: {
    width: 200,
    height: 10,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default DraggableProgressBar;
