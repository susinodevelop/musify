export interface Track {
    id: number;
    title: string;
    artist: {
      name: string;
    };
    album: {
      cover: string;
    };
    preview: string; // URL de la vista previa de la canción
  }
  