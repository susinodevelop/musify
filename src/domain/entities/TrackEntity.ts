import ArtistEntity from "./ArtistEntity";
import UserEntity from "./UserEntity";

export default interface TrackEntity {
  id: string;
  title: string;
  description: string;
  cover: string;
  artist: ArtistEntity;
  duration: number;
  genre: string;
}
