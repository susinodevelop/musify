import { Artwork } from "./Artwork";
import { CoverPhoto } from "./CoverPhoto";

export interface Artist {
  album_count: number;
  artist_pick_track_id: string;
  bio: string;
  cover_photo: CoverPhoto;
  followee_count: number;
  follower_count: number;
  does_follow_current_user: boolean;
  handle: string;
  id: string;
  is_verified: boolean;
  location: string;
  name: string;
  playlist_count: number;
  profile_picture: Artwork;
  repost_count: number;
  track_count: number;
  is_deactivated: boolean;
  is_available: boolean;
  erc_wallet: string;
  spl_wallet: string;
  supporter_count: number;
  supporting_count: number;
  total_audio_balance: number;
}