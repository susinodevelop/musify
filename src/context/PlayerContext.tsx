import React, { createContext, useState, useContext } from "react";
import { Track } from "@/interfaces/Track";
import { Audio } from "expo-av";
import { getStreameableTrackMp3 } from "@/services/audiusService";

export enum TrackStatus {
  UNLOAD,
  LOADED,
  PLAYING,
  WAITING,
}

interface PlayerContextType {
  track: Track | null;
  status: TrackStatus;
  progress: number;
  loadAndPlayTrack: (track: Track) => Promise<void>;
  pauseTrack: () => Promise<void>;
}

export const PlayerContext = createContext<PlayerContextType>({
  track: null,
  status: TrackStatus.UNLOAD,
  progress: 0,
  loadAndPlayTrack: async () => {},
  pauseTrack: async () => {},
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [status, setStatus] = useState<TrackStatus>(TrackStatus.UNLOAD);
  const [progress, setProgress] = useState<number>(0);

  const loadAndPlayTrack = async (newTrack: Track) => {
    if (sound) {
      await sound.unloadAsync();
    }

    setTrack(newTrack);
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: await getStreameableTrackMp3(newTrack.id),
    });

    setSound(newSound);
    setStatus(TrackStatus.LOADED);

    await newSound.playAsync();
    setStatus(TrackStatus.PLAYING);

    newSound.setOnPlaybackStatusUpdate((playbackStatus) => {
      if (playbackStatus.isLoaded) {
        setProgress(playbackStatus.durationMillis ? playbackStatus.positionMillis / playbackStatus.durationMillis : 0);
        if (playbackStatus.didJustFinish) {
          setStatus(TrackStatus.UNLOAD);
          setTrack(null);
          setProgress(0);
        }
      }
    });
  };

  const pauseTrack = async () => {
    if (sound && status === TrackStatus.PLAYING) {
      await sound.pauseAsync();
      setStatus(TrackStatus.WAITING);
    }
  };

  return (
    <PlayerContext.Provider
      value={{ track, status, progress, loadAndPlayTrack, pauseTrack }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
