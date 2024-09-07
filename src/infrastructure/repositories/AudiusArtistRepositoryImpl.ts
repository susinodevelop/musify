import AudiusConfig from "@/config/AudiusConfig";
import ArtistEntity from "@/domain/entities/ArtistEntity";
import ArtistRepository from "@/domain/repositories/ArtistRepository";
import axios from "axios";
import { injectable } from "inversify";
import ArtistDto from "../model/ArtistDto";
import ArtistMapper from "../mapper/ArtistMapper";

@injectable()
export default class AudiusArtistRepositoryImpl implements ArtistRepository {
  async getRandom(query: string, count: number): Promise<ArtistEntity[]> {
    const response = await axios.get(`${AudiusConfig.API_URL}/users/search`, {
      params: { query, limit: 50 },
    });

    const artists: ArtistDto[] = response.data.data;

    // Si el número de artistas solicitados es mayor que los disponibles, devuelve todos los artistas
    if (count >= artists.length) {
      return ArtistMapper.toEntities(artists);
    }

    // Selecciona artistas aleatorios de la lista
    const randomArtists: ArtistDto[] = [];
    const usedIndices = new Set<number>();

    while (randomArtists.length < count) {
      const randomIndex = Math.floor(Math.random() * artists.length);
      if (!usedIndices.has(randomIndex)) {
        randomArtists.push(artists[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    return ArtistMapper.toEntities(randomArtists);
  }

  async getById(id: string): Promise<ArtistEntity> {
    const response = await axios.get(`${AudiusConfig.API_URL}/users/${id}`);
    const artist = response.data.data[0];
    return ArtistMapper.toEntity(artist);
  }
}
