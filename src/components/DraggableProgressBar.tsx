import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ProgressBar } from "react-native-paper";

const SCREEN_WIDTH = Dimensions.get("window").width; // Obtener el ancho de la pantalla

interface DraggableProgressBarProps {
  progress: number;
  setProgress: (progress: number) => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
//TODO revisar toda la clase
const DraggableProgressBar = ({
  progress,
  setProgress,
  color = "red",
  style,
}: DraggableProgressBarProps) => {
  const progressRef = useRef(0); // Usar ref para almacenar el valor actual del progreso

  // PanResponder para manejar el gesto de arrastre
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // Permitir que el gesto comience
      onPanResponderMove: (evt, gestureState) => {
        // Calcular el nuevo progreso en función de la posición del toque
        const touchX = gestureState.moveX; // Coordenada X donde el usuario toca
        let newProgress = touchX / SCREEN_WIDTH; // Convertir la posición a un valor de 0 a 1
        newProgress = Math.max(0, Math.min(newProgress, 1)); // Asegurar que el valor esté entre 0 y 1
        setProgress(newProgress); // Actualizar el progreso
        progressRef.current = newProgress; // Actualizar el valor de la referencia
      },
      onPanResponderRelease: () => {
        // Puedes hacer algo aquí cuando el usuario suelta el arrastre (por ejemplo, actualizar un reproductor de audio)
        console.log("Progreso final:", progressRef.current);
      },
    })
  ).current;

  return (
    <View
      {...panResponder.panHandlers} // Asignar el PanResponder a la vista de la barra de progreso
    >
      <ProgressBar progress={progress} color={color} style={style} />
    </View>
  );
};

export default DraggableProgressBar;
