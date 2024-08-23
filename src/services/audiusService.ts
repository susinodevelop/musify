import { Artist } from "@/interfaces/Artist";
import { Playlist } from "@/interfaces/Playlist";
import { Track } from "@/interfaces/Track";
import { User } from "@/interfaces/User";
import axios from "axios";

const AUDIUS_API_URL = "https://discoveryprovider.audius.co/v1";

// Función para buscar pistas
export const searchTracks = async (query: string): Promise<Track[]> => {
  const response = await axios.get(`${AUDIUS_API_URL}/tracks/search`, {
    params: { query, limit: 50 },
  });
  return response.data.data;
};

// Función para obtener detalles de una pista
export const getTrackDetails = async (trackId: string): Promise<Track> => {
  const response = await axios.get(`${AUDIUS_API_URL}/tracks/${trackId}`, {
    params: { track_id: trackId },
  });
  return response.data.data[0];
};

export const getStreameableTrackMp3 = (trackId: string): string => {
  return `${AUDIUS_API_URL}/tracks/${trackId}/stream`;
};

// Función para obtener canciones aleatorias
export const getRandomTracks = async (
  query: string,
  count: number
): Promise<Track[]> => {
  const tracks = await searchTracks(query);

  // Si el número de canciones solicitadas es mayor que los disponibles, devuelve todas las canciones
  if (count >= tracks.length) {
    return tracks;
  }

  // Selecciona canciones aleatorias de la lista
  const randomTracks: Track[] = [];
  const usedIndices = new Set<number>();

  while (randomTracks.length < count) {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    if (!usedIndices.has(randomIndex)) {
      randomTracks.push(tracks[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return randomTracks;
};

// Función para obtener artistas aleatorios
export const getRandomArtists = async (
  query: string,
  count: number
): Promise<Artist[]> => {
  const response = await axios.get(`${AUDIUS_API_URL}/users/search`, {
    params: { query, limit: 50 },
  });

  const artists: Artist[] = response.data.data;

  // Si el número de artistas solicitados es mayor que los disponibles, devuelve todos los artistas
  if (count >= artists.length) {
    return artists;
  }

  // Selecciona artistas aleatorios de la lista
  const randomArtists: Artist[] = [];
  const usedIndices = new Set<number>();

  while (randomArtists.length < count) {
    const randomIndex = Math.floor(Math.random() * artists.length);
    if (!usedIndices.has(randomIndex)) {
      randomArtists.push(artists[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return randomArtists;
};

// Función para obtener detalles de un artista
export const getArtistDetails = async (artistId: string): Promise<Artist> => {
  const response = await axios.get(`${AUDIUS_API_URL}/users/${artistId}`);
  return response.data.data[0];
};

// Función para obtener playlists aleatorias
export const getRandomPlaylists = async (count: number): Promise<Playlist[]> => {
  // Realiza una solicitud para obtener una lista de playlists
  const response = await axios.get(`${AUDIUS_API_URL}/playlists/trending`, {
    params: {
      limit: 50, // Puedes ajustar este número según sea necesario
    },
  });

  const playlists: Playlist[] = response.data.data;

  // Si el número de playlists solicitadas es mayor que los disponibles, devuelve todas las playlists
  if (count >= playlists.length) {
    return playlists;
  }

  // Selecciona playlists aleatorias de la lista
  const randomPlaylists: Playlist[] = [];
  const usedIndices = new Set<number>();

  while (randomPlaylists.length < count) {
    const randomIndex = Math.floor(Math.random() * playlists.length);
    if (!usedIndices.has(randomIndex)) {
      randomPlaylists.push(playlists[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return randomPlaylists;
};

// Función para obtener detalles de una lista de reproducción
export const getPlaylistDetails = async (playlistId: string): Promise<any> => {
  const response = await axios.get(`${AUDIUS_API_URL}/playlists/${playlistId}`);
  return response.data.data[0];
};

// Función para obtener las pistas de una lista de reproducción
export const getPlaylistTracks = async (
  playlistId: string
): Promise<Track[]> => {
  const response = await axios.get(`${AUDIUS_API_URL}/playlists/${playlistId}`);
  return response.data.data[0].tracks;
};

// Función para obtener detalles de un usuarrio
export const getUserDetails = async (userId: string): Promise<User> => {
  const response = await axios.get(`${AUDIUS_API_URL}/users/${userId}`);
  return response.data.data;
};

// Función para buscar playlists relacionadas con un usuario
export const searchUserPlaylists = async (userName: string): Promise<Playlist[]> => {
  try {
    const response = await axios.get(`${AUDIUS_API_URL}/playlists/search`, {
      params: { query: userName },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al buscar las playlists del usuario:", error);
    throw error;
  }
};

// Función para obtener recomendaciones de Audius (Audius no tiene un endpoint directo para recomendaciones)
export const getRecommendations = async (trackId: string): Promise<Track[]> => {
  // Audius no tiene un endpoint directo para recomendaciones, pero puedes obtener pistas similares usando tags o géneros.
  const trackDetails = await getTrackDetails(trackId);
  return searchTracks(trackDetails.genre || trackDetails.title.split(" ")[0]);
};
