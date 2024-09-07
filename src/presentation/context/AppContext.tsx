import React from "react";
import ArtistRepository from "@/domain/repositories/ArtistRepository";
import PlaylistRepository from "@/domain/repositories/PlaylistRepository";
import TrackRepository from "@/domain/repositories/TrackRepository";
import UserRepository from "@/domain/repositories/UserRepository";
import { container } from "inversify/inversify.config";
import { TYPES } from "inversify/types";
import { createContext } from "react";

interface AppContextType {
  artistRepository: ArtistRepository;
  playlistRepository: PlaylistRepository;
  trackRepository: TrackRepository;
  userRepository: UserRepository;
}

const RepositoryContext = createContext<AppContextType | undefined>(undefined);

export const RepositoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const artistRepository = container.get<ArtistRepository>(
    TYPES.ArtistRepository
  );
  const playlistRepository = container.get<PlaylistRepository>(
    TYPES.PlaylistRepository
  );
  const trackRepository = container.get<TrackRepository>(TYPES.TrackRepository);
  const userRepository = container.get<UserRepository>(TYPES.UserRepository);

  return (
    <RepositoryContext.Provider
      value={{
        artistRepository,
        playlistRepository,
        trackRepository,
        userRepository,
      }}
    >
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepositories = (): AppContextType => {
  const context = React.useContext(RepositoryContext);
  if (context === undefined) {
    throw new Error("useRepositories must be used within a RepositoryProvider");
  }
  return context;
};
