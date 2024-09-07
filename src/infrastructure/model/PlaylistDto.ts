import ArtworkDto from "./ArtworkDto";
import TrackDto from "./TrackDto";
import UserDto from "./UserDto";

export default interface PlaylistDto {
  id: string;
  title: string;
  description: string;
  owner_id: string;
  owner: UserDto;
  tracks: TrackDto[];
  duration: number;
  artwork: ArtworkDto;
  is_private: boolean;
  is_album: boolean;
  repost_count: number;
  favorite_count: number;
  created_at: string;
}
