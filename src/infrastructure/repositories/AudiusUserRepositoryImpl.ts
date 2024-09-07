import AudiusConfig from "@/config/AudiusConfig";
import PlaylistEntity from "@/domain/entities/PlaylistEntity";
import UserEntity from "@/domain/entities/UserEntity";
import UserRepository from "@/domain/repositories/UserRepository";
import axios from "axios";
import { injectable } from "inversify";
import PlaylistMapper from "../mapper/PlaylistMapper";
import UserMapper from "../mapper/UserMapper";

@injectable()
export default class AudiusUserRepositoryImpl implements UserRepository {
  async getById(id: string): Promise<UserEntity> {
    const response = await axios.get(`${AudiusConfig.API_URL}/users/${id}`);
    const user = response.data.data;
    return UserMapper.toEntity(user);
  }

  async getPlaylists(username: string): Promise<PlaylistEntity[]> {
    try {
      const response = await axios.get(`${AudiusConfig}/playlists/search`, {
        params: { query: username },
      });
      const playlists = response.data.data;
      return PlaylistMapper.toEntities(playlists);
    } catch (error) {
      console.error("Error al buscar las playlists del usuario:", error);
      throw error;
    }
  }
}
