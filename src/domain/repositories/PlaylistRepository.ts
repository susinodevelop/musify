import PlaylistEntity from "../entities/PlaylistEntity";
import TrackEntity from "../entities/TrackEntity";

export default interface PlaylistRepository {
  getRandom(query: string, count: number): Promise<PlaylistEntity[]>;

  getById(id: string): Promise<PlaylistEntity>;

  getTracks(id: string): Promise<TrackEntity[]>;
}
