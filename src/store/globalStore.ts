import { Track } from "@/interfaces/Track";
import { Audio } from "expo-av";
import create from "zustand";

export interface GlobalState {
  song: Track | null;
  setSong: (song: Track | null) => void;
}

export const useGlobalStore = create<GlobalState>()((set, get) => ({
  song: null,
  setSong: (song: Track | null) =>
    set((state) => ({
      song: song,
    })),
}));
