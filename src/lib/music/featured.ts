import { deezerFetch } from "./client";
import { mapDeezerTrack, mapDeezerArtist, mapDeezerAlbum } from "./mappers";
import { DeezerTrackRaw, DeezerArtistRaw, DeezerAlbumRaw, Track, Artist, Album } from "../types/music";

interface DeezerChartRawResponse {
  tracks?: { data: DeezerTrackRaw[] };
  albums?: { data: DeezerAlbumRaw[] };
  artists?: { data: DeezerArtistRaw[] };
}

export interface FeaturedCharts {
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
}

/**
 * Fetch featured music (top tracks, top albums, top artists) from Deezer's chart endpoint.
 */
export async function getFeaturedCharts(): Promise<FeaturedCharts> {
  try {
    const rawData = await deezerFetch<DeezerChartRawResponse>("/chart", {
      revalidate: 3600, // cache for 1 hour
    });

    const tracks = (rawData.tracks?.data || []).map(mapDeezerTrack);
    const artists = (rawData.artists?.data || []).map(mapDeezerArtist);
    const albums = (rawData.albums?.data || []).map(mapDeezerAlbum);

    return {
      tracks,
      artists,
      albums,
    };
  } catch (error) {
    console.error("Error in getFeaturedCharts:", error);
    return {
      tracks: [],
      artists: [],
      albums: [],
    };
  }
}
