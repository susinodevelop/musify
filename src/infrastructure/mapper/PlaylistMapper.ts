import PlaylistEntity from "@/domain/entities/PlaylistEntity";
import PlaylistDto from "../model/PlaylistDto";

export default class PlaylistMapper {
  static toEntity = (playlist: PlaylistDto): PlaylistEntity => {
    return {
      id: playlist.id,
      title: playlist.title,
      description: playlist.description,
      cover: playlist.artwork["1000x1000"],
      totalTracks: playlist.repost_count,
    };
  };

  static toEntities = (playlists: PlaylistDto[]): PlaylistEntity[] => {
    return playlists.map((playlist) => PlaylistMapper.toEntity(playlist));
  };
}
