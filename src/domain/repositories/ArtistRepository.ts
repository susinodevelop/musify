import ArtistEntity from "../entities/ArtistEntity";

export default interface ArtistRepository {
  getRandom(query: string, count: number): Promise<ArtistEntity[]>;

  getById(id: string): Promise<ArtistEntity>;
}
