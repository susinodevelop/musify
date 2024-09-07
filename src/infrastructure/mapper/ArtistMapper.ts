import ArtistEntity from "@/domain/entities/ArtistEntity";
import ArtistDto from "../model/ArtistDto";

export default class ArtistMapper {
  static toEntity = (artist: ArtistDto): ArtistEntity => {
    return {
      id: artist.id,
      name: artist.name,
      cover: artist.profile_picture["1000x1000"],
    };
  };

  static toEntities = (artists: ArtistDto[]): ArtistEntity[] => {
    return artists.map((artist) => ArtistMapper.toEntity(artist));
  };
}
