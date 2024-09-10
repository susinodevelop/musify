import React, { useContext } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Screen from "@/presentation/components/Screen";
import { ThemeContext } from "../context/ThemeContext";

const InformationScreen = () => {
  const { themeColors } = useContext(ThemeContext);

  //TODO revisar estilos

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: themeColors.text }]}>
          Información del Proyecto
        </Text>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Descripción
        </Text>
        <Text style={[styles.text, { color: themeColors.text }]}>
          Este proyecto es una aplicación de música que permite a los usuarios
          explorar, reproducir y gestionar sus playlists favoritas. La
          aplicación está diseñada para ofrecer una experiencia de usuario
          intuitiva y atractiva.
        </Text>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Características
        </Text>
        <Text style={[styles.text, { color: themeColors.text }]}>
          - Exploración de música por género, artista y álbum.{"\n"}- Creación y
          gestión de playlists personalizadas.{"\n"}- Reproducción de música en
          segundo plano.{"\n"}- Interfaz de usuario amigable y responsiva.
        </Text>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Tecnologías Utilizadas
        </Text>
        <Text style={[styles.text, { color: themeColors.text }]}>
          - React Native para el desarrollo de la aplicación móvil.{"\n"}- React
          Context API la gestión del estado global.{"\n"}- React Navigation para
          la navegación dentro de la aplicación.{"\n"}
        </Text>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Equipo de Desarrollo
        </Text>
        <Text style={[styles.text, { color: themeColors.text }]}>
          - Jesús Fernández - Desarrollador Fullstack
        </Text>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Contacto
        </Text>
        <Text style={[styles.text, { color: themeColors.text }]}>
          Para más información, puedes contactarnos en:{"\n"}
          https://jesusfernandezmendez.vercel.app/
        </Text>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default InformationScreen;
