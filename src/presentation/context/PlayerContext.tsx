import React, { createContext, useState, useContext, useEffect } from "react";
import { Audio, AVPlaybackSourceObject, AVPlaybackStatusToSet } from "expo-av";
import TrackEntity from "@/domain/entities/TrackEntity";
import { useRepositories } from "./RepositoryContext";

interface PlayerContextType {
  track: TrackEntity | null;
  sound: Audio.Sound | null;
  progress: number;
  isLooping: boolean;
  isPlaying: boolean;
  isLoaded: boolean;
  load: (track: TrackEntity) => void;
  play: () => void;
  pause: () => void;
  updateProgress: (progress: number) => void;
  changeIsLooping: () => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  track: null,
  sound: null,
  progress: 0,
  isLooping: false,
  isLoaded: false,
  isPlaying: false,
  load: () => {},
  play: () => {},
  pause: () => {},
  updateProgress: () => {},
  changeIsLooping: () => {},
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [track, setTrack] = useState<TrackEntity | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isLooping, setLooping] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { trackRepository } = useRepositories();

  const load = async (newTrack: TrackEntity) => {
    if (!track || track.id !== newTrack.id) {
      setIsLoaded(false);
      setIsPlaying(false);
      await sound?.unloadAsync();
      setTrack(newTrack);
    }

    const playbackSource: AVPlaybackSourceObject = {
      uri: await trackRepository.getStreamUrl(newTrack.id),
      overrideFileExtensionAndroid: "mp3",
    };

    const initialStatus: AVPlaybackStatusToSet = {
      shouldPlay: true,
      rate: 1.0,
      isLooping: isLooping,
      progressUpdateIntervalMillis: 100,
      shouldCorrectPitch: true,
      positionMillis: progress,
    };

    const newSound = new Audio.Sound();
    setSound(newSound);

    newSound.loadAsync(playbackSource, initialStatus, false).then(() => {
      setIsLoaded(true);
      setIsPlaying(true);
    });
  };

  const play = async () => {
    if (sound) {
      await sound.playAsync().then((status) => {
        setIsPlaying(status.isLoaded && status.isPlaying);
      });
    }
  };

  const pause = async () => {
    if (sound) {
      await sound.pauseAsync().then((status) => {
        setIsPlaying(status.isLoaded && status.isPlaying);
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (sound) {
      interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          setProgress(
            status.durationMillis
              ? status.positionMillis / status.durationMillis
              : 0
          );
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sound]);

  const changeIsLooping = () => {
    setLooping(!isLooping);
  };

  const updateProgress = (newProgress: number) => {
    if (sound) {
      sound.getStatusAsync().then((status) => {
        if (status.isLoaded && status.isPlaying) {
          const newPositionMillis = status.durationMillis! * newProgress;
          sound.setPositionAsync(newPositionMillis).catch((error) => {
            console.error("Error setting position:", error);
          });
          setProgress(newProgress);
        }
      });
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        track,
        sound,
        progress,
        isLooping,
        updateProgress,
        isLoaded,
        isPlaying,
        load,
        play,
        pause,
        changeIsLooping,
      }}
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
