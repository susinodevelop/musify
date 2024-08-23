import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = 80;
const RADIUS = (CIRCLE_SIZE - 10) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Crear un componente animado para Circle
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressIconProps {
  track: Audio.Sound;
}

const CircularProgressIcon = ({ track }: CircularProgressIconProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(track);
  const [progress, setProgress] = useState<number>(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(updateStatus);
    }

    return () => {
      sound?.setOnPlaybackStatusUpdate(null);
    };
  }, [sound]);

  const updateStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded && !status.isBuffering && status.isPlaying) {
      const playbackStatus = status as AVPlaybackStatusSuccess;
      const progress =
        playbackStatus.positionMillis / playbackStatus.durationMillis!;
      setProgress(progress);
      progressAnim.setValue(progress);
    }
  };

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <View style={styles.container}>
      <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
        <Circle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          stroke="#E6E7E8"
          strokeWidth={10}
        />
        <AnimatedCircle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          stroke="#FF6347"
          strokeWidth={10}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      <View style={styles.iconContainer}>
        <Ionicons name="musical-notes" size={30} color="#FF6347" />
      </View>
    </View>
  );
};

export default CircularProgressIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },
  iconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
