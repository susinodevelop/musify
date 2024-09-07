import TrackEntity from "../entities/TrackEntity";

export default interface TrackRepository {
  search(query: string): Promise<TrackEntity[]>;

  getById(id: string): Promise<TrackEntity>;

  getStreamUrl(id: string): Promise<string>;

  getRandom(query: string, count: number): Promise<TrackEntity[]>;
}
