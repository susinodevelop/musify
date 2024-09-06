import React, { createContext, useState, useContext, useEffect } from "react";
import { Track } from "@/interfaces/Track";
import {
  Audio,
  AVPlaybackStatus,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
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
  isLooping: boolean;
  updateProgress: (progress: number) => void;
  loadAndPlayTrack: (track: Track) => Promise<void>;
  pauseTrack: () => Promise<void>;
  changeIsLooping: () => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  track: null,
  status: TrackStatus.UNLOAD,
  progress: 0,
  isLooping: false,
  updateProgress: () => {},
  loadAndPlayTrack: async () => {},
  pauseTrack: async () => {},
  changeIsLooping: () => {},
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [soundStatus, setSoundStatus] = useState<AVPlaybackStatus | null>(null);
  const [status, setStatus] = useState<TrackStatus>(TrackStatus.UNLOAD);
  const [progress, setProgress] = useState<number>(0);
  const [isLooping, setLooping] = useState<boolean>(false);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  const loadAndPlayTrack = async (newTrack: Track) => {
    if (sound) {
      await sound.unloadAsync();
    }

    setTrack(newTrack);
    const { sound: newSound } = await Audio.Sound.createAsync(
      {
        uri: await getStreameableTrackMp3(newTrack.id),
      },
      {
        shouldPlay: true,
        rate: 1.0,
        isLooping: isLooping,
        progressUpdateIntervalMillis: 100,
        shouldCorrectPitch: true,
        positionMillis: 0,
      },
      handlePlaybackStatusUpdate
    );

    setSound(newSound);
    setStatus(TrackStatus.LOADED);

    await newSound.playAsync();
    setStatus(TrackStatus.PLAYING);
  };

  const handlePlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.error(playbackStatus.error);
      }
    } else {
      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        setStatus(TrackStatus.UNLOAD);
        setTrack(null);
        setProgress(0);
      }
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
          setSoundStatus(status);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, sound]);

  const pauseTrack = async () => {
    if (sound && status === TrackStatus.PLAYING) {
      await sound.pauseAsync();
      setStatus(TrackStatus.WAITING);
    }
  };

  const changeIsLooping = () => {
    setLooping(!isLooping);
  };

  const updateProgress = (newProgress: number) => {
    // console.log("updateProgress", newProgress);//TODO eliminar
    if (soundStatus?.isLoaded) {
      const newPositionMillis = soundStatus.durationMillis! * newProgress;
      setSoundStatus({
        ...soundStatus,
        positionMillis: newPositionMillis,
      });
      sound?.setPositionAsync(newPositionMillis).catch((error) => {
        console.error("Error setting position:", error);
      });

      setProgress(newProgress);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        track,
        status,
        progress,
        isLooping,
        updateProgress,
        loadAndPlayTrack,
        pauseTrack,
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
