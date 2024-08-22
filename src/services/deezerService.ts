import axios from "axios";
import { Track } from "../interfaces/Track";

const DEEZER_API_URL = "https://api.deezer.com";

export const searchTracks = async (query: string): Promise<Track[]> => {
  const response = await axios.get(`${DEEZER_API_URL}/search`, {
    params: { q: query },
  });
  return response.data.data;
};

export const getTrackDetails = async (trackId: number): Promise<Track> => {
  const response = await axios.get(`${DEEZER_API_URL}/track/${trackId}`);
  return response.data;
};
