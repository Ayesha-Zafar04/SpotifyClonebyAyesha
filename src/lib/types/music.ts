// Deezer API raw responses interfaces
export interface DeezerArtistRaw {
  id: number;
  name: string;
  picture: string;
  picture_small?: string;
  picture_medium?: string;
  picture_big?: string;
  picture_xl?: string;
  tracklist?: string;
  nb_album?: number;
  nb_fan?: number;
}

export interface DeezerAlbumRaw {
  id: number;
  title: string;
  cover: string;
  cover_small?: string;
  cover_medium?: string;
  cover_big?: string;
  cover_xl?: string;
  artist?: {
    id: number;
    name: string;
  };
  nb_tracks?: number;
  release_date?: string;
  tracks?: {
    data: DeezerTrackRaw[];
  };
}

export interface DeezerTrackRaw {
  id: number;
  title: string;
  title_short?: string;
  duration: number;
  preview: string; // direct MP3 link (30s)
  artist: DeezerArtistRaw;
  album?: DeezerAlbumRaw;
}

// Mapped application-level normalized models
export interface Track {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  artistImage?: string;
  albumId?: string;
  albumTitle?: string;
  image: string;
  url: string;
  duration: number;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  tracklistUrl?: string;
  nbAlbums?: number;
  nbFans?: number;
}

export interface Album {
  id: string;
  title: string;
  image: string;
  artistId: string;
  artistName: string;
  releaseDate?: string;
  tracksCount?: number;
  tracks?: Track[];
}

export interface SearchResults {
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
}
