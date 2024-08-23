import { Artist } from "./Artist";
import { Artwork } from "./Artwork";

export interface Track {
  artwork: Artwork;
  description: string;
  genre: string;
  id: string;
  track_cid: string;
  mood: string;
  release_date: string;
  remix_of: RemixOf;
  repost_count: number;
  favorite_count: number;
  tags: string;
  title: string;
  user: Artist;
  duration: number;
  downloadable: boolean;
  play_count: number;
  permalink: string;
  is_streamable: boolean;
}



export interface RemixOf {
  tracks: null;
}


