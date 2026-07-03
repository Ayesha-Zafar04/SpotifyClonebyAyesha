import { deezerFetch } from "./client";
import { mapDeezerTrack, mapDeezerArtist, mapDeezerAlbum } from "./mappers";
import { 
  DeezerTrackRaw, 
  DeezerArtistRaw, 
  DeezerAlbumRaw, 
  Track, 
  Artist, 
  Album 
} from "../types/music";

/**
 * Fetch detailed metadata for a single track by its ID.
 */
export async function getTrackDetails(id: string): Promise<Track | null> {
  if (!id) return null;
  try {
    const rawData = await deezerFetch<DeezerTrackRaw>(`/track/${id}`, {
      revalidate: 3600, // cache for 1 hour
    });
    return mapDeezerTrack(rawData);
  } catch (error) {
    console.error(`Error fetching track details for ID "${id}":`, error);
    return null;
  }
}

/**
 * Fetch detailed metadata for a single artist by their ID.
 */
export async function getArtistDetails(id: string): Promise<Artist | null> {
  if (!id) return null;
  try {
    const rawData = await deezerFetch<DeezerArtistRaw>(`/artist/${id}`, {
      revalidate: 3600,
    });
    return mapDeezerArtist(rawData);
  } catch (error) {
    console.error(`Error fetching artist details for ID "${id}":`, error);
    return null;
  }
}

/**
 * Fetch detailed metadata for a single album by its ID, including all tracks.
 */
export async function getAlbumDetails(id: string): Promise<Album | null> {
  if (!id) return null;
  try {
    const rawData = await deezerFetch<DeezerAlbumRaw>(`/album/${id}`, {
      revalidate: 3600,
    });
    
    const album = mapDeezerAlbum(rawData);
    
    // Map tracks contained within the album if they exist
    if (rawData.tracks?.data) {
      album.tracks = rawData.tracks.data.map((track) => {
        // Deezer's nested album tracks exclude the full album metadata object, so we supply it manually
        const completeTrack: DeezerTrackRaw = { 
          ...track, 
          album: {
            id: rawData.id,
            title: rawData.title,
            cover: rawData.cover,
            cover_small: rawData.cover_small,
            cover_medium: rawData.cover_medium,
            cover_big: rawData.cover_big,
            cover_xl: rawData.cover_xl,
          }
        };
        return mapDeezerTrack(completeTrack);
      });
    }
    
    return album;
  } catch (error) {
    console.error(`Error fetching album details for ID "${id}":`, error);
    return null;
  }
}
