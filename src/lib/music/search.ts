import { deezerFetch } from "./client";
import { mapDeezerTrack, mapDeezerArtist, mapDeezerAlbum } from "./mappers";
import { 
  DeezerTrackRaw, 
  DeezerArtistRaw, 
  DeezerAlbumRaw, 
  Track, 
  Artist, 
  Album,
  SearchResults 
} from "../types/music";

interface DeezerSearchRawResponse<T> {
  data: T[];
  total?: number;
  next?: string;
}

/**
 * Search for tracks matching a query string.
 */
export async function searchTracks(query: string): Promise<Track[]> {
  if (!query.trim()) return [];
  try {
    const rawData = await deezerFetch<DeezerSearchRawResponse<DeezerTrackRaw>>(
      `/search?q=${encodeURIComponent(query)}`,
      { revalidate: 600 } // cache for 10 minutes
    );
    return (rawData.data || []).map(mapDeezerTrack);
  } catch (error) {
    console.error(`Error in searchTracks for query "${query}":`, error);
    return [];
  }
}

/**
 * Search for artists matching a query string.
 */
export async function searchArtists(query: string): Promise<Artist[]> {
  if (!query.trim()) return [];
  try {
    const rawData = await deezerFetch<DeezerSearchRawResponse<DeezerArtistRaw>>(
      `/search/artist?q=${encodeURIComponent(query)}`,
      { revalidate: 600 }
    );
    return (rawData.data || []).map(mapDeezerArtist);
  } catch (error) {
    console.error(`Error in searchArtists for query "${query}":`, error);
    return [];
  }
}

/**
 * Search for albums matching a query string.
 */
export async function searchAlbums(query: string): Promise<Album[]> {
  if (!query.trim()) return [];
  try {
    const rawData = await deezerFetch<DeezerSearchRawResponse<DeezerAlbumRaw>>(
      `/search/album?q=${encodeURIComponent(query)}`,
      { revalidate: 600 }
    );
    return (rawData.data || []).map(mapDeezerAlbum);
  } catch (error) {
    console.error(`Error in searchAlbums for query "${query}":`, error);
    return [];
  }
}

/**
 * Perform a unified search across tracks, artists, and albums concurrently.
 */
export async function searchAllMusic(query: string): Promise<SearchResults> {
  if (!query.trim()) {
    return { tracks: [], artists: [], albums: [] };
  }
  
  try {
    const [tracks, artists, albums] = await Promise.all([
      searchTracks(query),
      searchArtists(query),
      searchAlbums(query),
    ]);

    return {
      tracks,
      artists,
      albums,
    };
  } catch (error) {
    console.error(`Error in unified searchAllMusic for query "${query}":`, error);
    return {
      tracks: [],
      artists: [],
      albums: []
    };
  }
}
