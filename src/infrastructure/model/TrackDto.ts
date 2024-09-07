import ArtistDto from "./ArtistDto";
import ArtworkDto from "./ArtworkDto";

export default interface TrackDto {
  artwork: ArtworkDto;
  description: string;
  genre: string;
  id: string;
  track_cid: string;
  mood: string;
  release_date: string;
  remix_of: {
    tracks: null;
  };
  repost_count: number;
  favorite_count: number;
  tags: string;
  title: string;
  user: ArtistDto;
  duration: number;
  downloadable: boolean;
  play_count: number;
  permalink: string;
  is_streamable: boolean;
}
