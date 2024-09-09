import { container } from "inversify/inversify.config";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  LayoutChangeEvent,
  View,
  DimensionValue,
} from "react-native";
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
  width: DimensionValue;
  progress: number;
  setProgress: (progress: number) => void;
  color?: string;
  allowDragging?: boolean;
}

const DraggableProgressBar = gestureHandlerRootHOC(
  ({
    width: originalWidth,
    progress,
    setProgress,
    color = "red",
    allowDragging = true,
  }: DraggableProgressBarProps) => {
    const thisX = useSharedValue(progress);
    const [total, setTotal] = useState(0);

    useEffect(() => {
      thisX.value = progress;
    }, [progress]);

    const onLayout = (event: LayoutChangeEvent) => {
      const { width: newTotal } = event.nativeEvent.layout;
      setTotal(newTotal);
    };

    const pan = Gesture.Pan()
      .enabled(allowDragging)
      .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
        const touchX = Math.max(0, Math.min(event.x, total));
        thisX.value = touchX / total;
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
      <View style={{ ...styles.container, width: originalWidth }}>
        <GestureDetector gesture={pan}>
          <View style={styles.progressBarBackground} onLayout={onLayout}>
            <Animated.View
              style={[
                styles.progressBarFill,
                animatedStyle,
                { backgroundColor: color },
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
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarBackground: {
    width: "100%",
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
