import PlaylistEntity from "../entities/PlaylistEntity";
import UserEntity from "../entities/UserEntity";

export default interface UserRepository {
  getById(id: string): Promise<UserEntity>;

  getPlaylists(userId: string): Promise<PlaylistEntity[]>;
}
