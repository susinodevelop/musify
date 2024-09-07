import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import ArtistRepository from "@/domain/repositories/ArtistRepository";
import AudiusArtistRepositoryImpl from "@/infrastructure/repositories/AudiusArtistRepositoryImpl";
import AudiusPlaylistRepositoryImpl from "@/infrastructure/repositories/AudiusPlaylistRepositoryImpl";
import AudiusTrackRepositoryImpl from "@/infrastructure/repositories/AudiusTrackRepositoryImpl";
import PlaylistRepository from "@/domain/repositories/PlaylistRepository";
import TrackRepository from "@/domain/repositories/TrackRepository";
import AudiusUserRepositoryImpl from "@/infrastructure/repositories/AudiusUserRepositoryImpl";

const container = new Container();
container
  .bind<ArtistRepository>(TYPES.ArtistRepository)
  .to(AudiusArtistRepositoryImpl);
container
  .bind<PlaylistRepository>(TYPES.PlaylistRepository)
  .to(AudiusPlaylistRepositoryImpl);
container
  .bind<TrackRepository>(TYPES.TrackRepository)
  .to(AudiusTrackRepositoryImpl);
container.bind(TYPES.UserRepository).to(AudiusUserRepositoryImpl);

export { container };
