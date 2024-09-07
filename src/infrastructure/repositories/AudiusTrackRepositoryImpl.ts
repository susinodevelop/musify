import AudiusConfig from "@/config/AudiusConfig";
import TrackEntity from "@/domain/entities/TrackEntity";
import TrackRepository from "@/domain/repositories/TrackRepository";
import axios from "axios";
import { injectable } from "inversify";
import TrackMapper from "../mapper/TrackMapper";

@injectable()
export default class AudiusTrackRepositoryImpl implements TrackRepository {
  async search(query: string): Promise<TrackEntity[]> {
    const response = await axios.get(`${AudiusConfig.API_URL}/tracks/search`, {
      params: { query, limit: 50 },
    });
    const tracks = response.data.data;
    return TrackMapper.toEntities(tracks);
  }

  async getById(id: string): Promise<TrackEntity> {
    const response = await axios.get(`${AudiusConfig.API_URL}/tracks/${id}`, {
      params: { track_id: id },
    });
    const track = response.data.data[0];
    return TrackMapper.toEntity(track);
  }

  async getStreamUrl(id: string): Promise<string> {
    return `${AudiusConfig.API_URL}/tracks/${id}/stream`;
  }

  async getRandom(query: string, count: number): Promise<TrackEntity[]> {
    const tracks = await this.search(query);

    // Si el número de canciones solicitadas es mayor que los disponibles, devuelve todas las canciones
    if (count >= tracks.length) {
      return tracks;
    }

    // Selecciona canciones aleatorias de la lista
    const randomTracks: TrackEntity[] = [];
    const usedIndices = new Set<number>();

    while (randomTracks.length < count) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      if (!usedIndices.has(randomIndex)) {
        randomTracks.push(tracks[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    return randomTracks;
  }
}
