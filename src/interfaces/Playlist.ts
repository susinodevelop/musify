import { Track } from "./Track";
import { Artist } from "./Artist";

export interface Playlist {
  id: string; // Identificador único de la playlist
  title: string; // Título de la playlist
  description: string; // Descripción de la playlist
  owner_id: string; // Identificador del creador de la playlist
  owner: Artist; // Detalles del creador de la playlist
  tracks: Track[]; // Lista de pistas incluidas en la playlist
  duration: number; // Duración total de la playlist en segundos
  artwork: {
    "150x150": string;
    "480x480": string;
    "1000x1000": string;
  }; // Imágenes de portada de la playlist
  is_private: boolean; // Si la playlist es privada o no
  is_album: boolean; // Si la playlist está etiquetada como álbum
  repost_count: number; // Número de veces que la playlist ha sido repostada
  favorite_count: number; // Número de veces que la playlist ha sido marcada como favorita
  created_at: string; // Fecha de creación de la playlist
}
