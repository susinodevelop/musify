import TrackEntity from "@/domain/entities/TrackEntity";
import TrackDto from "../model/TrackDto";
import UserMapper from "./UserMapper";
import ArtistMapper from "./ArtistMapper";

export default class TrackMapper {
  static toEntity = (track: TrackDto): TrackEntity => {
    return {
      id: track.id,
      title: track.title,
      description: track.description,
      cover: track.artwork["1000x1000"],
      artist: ArtistMapper.toEntity(track.user),
      duration: track.duration,
      genre: track.genre,
    };
  };

  static toEntities = (track: TrackDto[]): TrackEntity[] => {
    return track.map((track) => TrackMapper.toEntity(track));
  };
}
