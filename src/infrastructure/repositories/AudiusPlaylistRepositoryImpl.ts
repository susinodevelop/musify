import AudiusConfig from "@/config/AudiusConfig";
import PlaylistEntity from "@/domain/entities/PlaylistEntity";
import TrackEntity from "@/domain/entities/TrackEntity";
import PlaylistRepository from "@/domain/repositories/PlaylistRepository";
import axios from "axios";
import { injectable } from "inversify";
import PlaylistMapper from "../mapper/PlaylistMapper";
import TrackMapper from "../mapper/TrackMapper";
import PlaylistDto from "../model/PlaylistDto";

@injectable()
export default class AudiusPlaylistRepositoryImpl
  implements PlaylistRepository
{
  async getRandom(query: string, count: number): Promise<PlaylistEntity[]> {
    // Realiza una solicitud para obtener una lista de playlists
    const response = await axios.get(
      `${AudiusConfig.API_URL}/playlists/trending`,
      {
        params: {
          limit: 50, // Puedes ajustar este número según sea necesario
        },
      }
    );

    const playlists: PlaylistDto[] = response.data.data;

    // Si el número de playlists solicitadas es mayor que los disponibles, devuelve todas las playlists
    if (count >= playlists.length) {
      return PlaylistMapper.toEntities(playlists);
    }

    // Selecciona playlists aleatorias de la lista
    const randomPlaylists: PlaylistDto[] = [];
    const usedIndices = new Set<number>();

    while (randomPlaylists.length < count) {
      const randomIndex = Math.floor(Math.random() * playlists.length);
      if (!usedIndices.has(randomIndex)) {
        randomPlaylists.push(playlists[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    return PlaylistMapper.toEntities(randomPlaylists);
  }

  async getById(id: string): Promise<PlaylistEntity> {
    const response = await axios.get(`${AudiusConfig.API_URL}/playlists/${id}`);
    const playlist = response.data.data[0];
    return PlaylistMapper.toEntity(playlist);
  }

  async getTracks(id: string): Promise<TrackEntity[]> {
    const response = await axios.get(`${AudiusConfig.API_URL}/playlists/${id}`);
    const tracks = response.data.data[0].tracks;
    return TrackMapper.toEntities(tracks);
  }
}
