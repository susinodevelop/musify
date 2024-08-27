import { Track } from "@/interfaces/Track";
import { getStreameableTrackMp3 } from "@/services/audiusService";
import { Audio } from "expo-av";
import { useState } from "react";

export enum TrackStatus {
  UNLOAD,
  LOADED,
  PLAYING,
  WAITING,
}

const useTrack = () => {
  const [track, setTrack] = useState<Track | null>();
  const [sound, setSound] = useState<Audio.Sound | null>();
  const [status, setStatus] = useState<TrackStatus>(TrackStatus.UNLOAD);

  const load = async (track: Track) => {
    if (sound) {
      unload();
    }
    setTrack(track);
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: getStreameableTrackMp3(track.id) },
      { shouldPlay: true }
    );
    setSound(newSound);
    setStatus(TrackStatus.LOADED);
  };

  const play = async () => {
    if (sound) {
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          unload();
        }
      });
      setStatus(TrackStatus.PLAYING);
    }
  };

  const pause = async () => {
    if (sound) {
      await sound.pauseAsync();
      setStatus(TrackStatus.WAITING);
    }
  };

  const unload = async () => {
    if (sound) {
      await sound.unloadAsync();
      setTrack(null);
      setSound(null);
      setStatus(TrackStatus.UNLOAD);
    }
  };

  return {
    status,
    sound,
    track,
    load,
    play,
    pause,
    unload,
  };
};

export default useTrack;
