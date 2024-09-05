import React, { createContext, useState, useContext, useEffect } from "react";
import { Track } from "@/interfaces/Track";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
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
  loadAndPlayTrack: (track: Track) => Promise<void>;
  pauseTrack: () => Promise<void>;
  changeIsLooping: () => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  track: null,
  status: TrackStatus.UNLOAD,
  progress: 0,
  isLooping: false,
  loadAndPlayTrack: async () => {},
  pauseTrack: async () => {},
  changeIsLooping: () => {},
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
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
        isLooping: isLooping, //TODO modificar desde boton de loop
        progressUpdateIntervalMillis: 100,
        shouldCorrectPitch: true,
        positionMillis: 0, //TODO modificar para el resume
      },
      (playbackStatus) => {
        //TODO revisar funcion
        if (!playbackStatus.isLoaded) {
          //TODO unloaded status
          if (playbackStatus.error) {
            console.error(playbackStatus.error);
          }
        } else {
          if (playbackStatus.isPlaying) {
            // console.log("playing");
          } else {
            // console.log("paused");
          }
          if (playbackStatus.isBuffering) {
            // console.log("buffering");
          }
          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            // console.log("finished");
            setStatus(TrackStatus.UNLOAD);
            setTrack(null);
            setProgress(0);
          }
        }
      },
      false
    );

    setSound(newSound);
    setStatus(TrackStatus.LOADED);

    await newSound.playAsync();
    setStatus(TrackStatus.PLAYING);
  };

  useEffect(() => {
    let interval = null;

    if (TrackStatus.PLAYING === status && sound) {
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

  useEffect(() => {
    console.log(isLooping);
  }, [isLooping]);

  return (
    <PlayerContext.Provider
      value={{
        track,
        status,
        progress,
        loadAndPlayTrack,
        pauseTrack,
        isLooping,
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
