import { Album } from "@/interfaces/Album";
import { Artist } from "@/interfaces/Artist";
import { Track } from "@/interfaces/Track";
import axios from "axios";

const DEEZER_API_URL = "https://api.deezer.com";

// Función para buscar pistas
export const searchTracks = async (query: string): Promise<Track[]> => {
  const response = await axios.get(`${DEEZER_API_URL}/search`, {
    headers: {
      Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
    },
    params: { q: query },
  });
  return response.data.data;
};

// Función para obtener detalles de una pista
export const getTrackDetails = async (trackId: number): Promise<Track> => {
  const response = await axios.get(`${DEEZER_API_URL}/track/${trackId}`, {
    headers: {
      Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
    },
  });
  return response.data;
};

// Función para obtener canciones aleatorias
export const getRandomTracks = async (
  query: string,
  count: number
): Promise<Track[]> => {
  // Realiza una búsqueda genérica para obtener una lista de canciones
  const response = await axios.get(`${DEEZER_API_URL}/search/track`, {
    params: { q: query },
    headers: {
      Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
    },
  });

  const tracks: Track[] = response.data.data;

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

// Función para obtener álbumes aleatorios
export const getRandomAlbums = async (
  query: string,
  count: number
): Promise<Album[]> => {
  // Realiza una búsqueda genérica para obtener una lista de álbumes
  const response = await axios.get(`${DEEZER_API_URL}/search/album`, {
    params: { q: query },
    headers: {
      Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
    },
  });

  const albums: Album[] = response.data.data;

  // Si el número de álbumes solicitados es mayor que los disponibles, devuelve todos los álbumes
  if (count >= albums.length) {
    return albums;
  }

  // Selecciona álbumes aleatorios de la lista
  const randomAlbums: Album[] = [];
  const usedIndices = new Set<number>();

  while (randomAlbums.length < count) {
    const randomIndex = Math.floor(Math.random() * albums.length);
    if (!usedIndices.has(randomIndex)) {
      randomAlbums.push(albums[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return randomAlbums;
};

// Función para obtener detalles de un álbum
export const getAlbumDetails = async (albumId: number): Promise<Album> => {
  const response = await axios.get(`${DEEZER_API_URL}/album/${albumId}`, {
    headers: {
      Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
    },
  });
  return response.data;
};

// Función para obtener artistas aleatorios
export const getRandomArtists = async (
  query: string,
  count: number
): Promise<Artist[]> => {
  // Realiza una búsqueda genérica para obtener una lista de artistas
  const response = await axios.get(`${DEEZER_API_URL}/search/artist`, {
    params: { q: query },
    headers: {
      Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
    },
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
export const getArtistDetails = async (artistId: number): Promise<Artist> => {
  const response = await axios.get(`${DEEZER_API_URL}/artist/${artistId}`, {
    headers: {
      Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
    },
  });
  return response.data;
};

// Función para obtener los álbumes de un artista
export const getArtistAlbums = async (artistId: number): Promise<Album[]> => {
  const response = await axios.get(
    `${DEEZER_API_URL}/artist/${artistId}/albums`,
    {
      headers: {
        Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
      },
    }
  );
  return response.data.data;
};

// Función para obtener las pistas de un álbum
export const getAlbumTracks = async (albumId: number): Promise<Track[]> => {
  const response = await axios.get(
    `${DEEZER_API_URL}/album/${albumId}/tracks`,
    {
      headers: {
        Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
      },
    }
  );
  return response.data.data;
};

// TODO Función para obtener detalles de una lista de reproducción
// export const getPlaylistDetails = async (playlistId: number): Promise<Playlist> => {
//   const response = await axios.get(`${DEEZER_API_URL}/playlist/${playlistId}`, {
//     headers: {
//       Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
//     },
//   });
//   return response.data;
// };

// TODO Función para obtener las pistas de una lista de reproducción
// export const getPlaylistTracks = async (playlistId: number): Promise<Track[]> => {
//   const response = await axios.get(`${DEEZER_API_URL}/playlist/${playlistId}/tracks`, {
//     headers: {
//       Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
//     },
//   });
//   return response.data.data;
// };

// TODO Función para obtener detalles de un usuario
// export const getUserDetails = async (userId: number): Promise<User> => {
//   const response = await axios.get(`${DEEZER_API_URL}/user/${userId}`, {
//     headers: {
//       Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
//     },
//   });
//   return response.data;
// };

// TODO Función para obtener las listas de reproducción de un usuario
// export const getUserPlaylists = async (userId: number): Promise<Playlist[]> => {
//   const response = await axios.get(`${DEEZER_API_URL}/user/${userId}/playlists`, {
//     headers: {
//       Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
//     },
//   });
//   return response.data.data;
// };

// TODO Función para obtener las recomendaciones de Deezer
// export const getRecommendations = async (trackId: number): Promise<Track[]> => {
//   const response = await axios.get(`${DEEZER_API_URL}/track/${trackId}/radio`, {
//     headers: {
//       Cookie: `arl=${process.env.EXPO_PUBLIC_DEEZER_ARL}`,
//     },
//   });
//   return response.data.data;
// };
