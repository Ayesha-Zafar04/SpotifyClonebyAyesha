import { 
  DeezerTrackRaw, 
  DeezerArtistRaw, 
  DeezerAlbumRaw, 
  Track, 
  Artist, 
  Album 
} from "../types/music";

export function mapDeezerTrack(t: DeezerTrackRaw): Track {
  return {
    id: String(t.id),
    title: t.title,
    artistId: String(t.artist.id),
    artistName: t.artist.name,
    artistImage: t.artist.picture_medium || t.artist.picture,
    albumId: t.album ? String(t.album.id) : undefined,
    albumTitle: t.album ? t.album.title : undefined,
    image: t.album?.cover_medium || t.album?.cover || t.artist.picture_medium || t.artist.picture || "",
    url: t.preview || "",
    duration: t.duration,
  };
}

export function mapDeezerArtist(a: DeezerArtistRaw): Artist {
  return {
    id: String(a.id),
    name: a.name,
    image: a.picture_medium || a.picture,
    tracklistUrl: a.tracklist,
    nbAlbums: a.nb_album,
    nbFans: a.nb_fan,
  };
}

export function mapDeezerAlbum(al: DeezerAlbumRaw): Album {
  return {
    id: String(al.id),
    title: al.title,
    image: al.cover_medium || al.cover,
    artistId: al.artist ? String(al.artist.id) : "",
    artistName: al.artist ? al.artist.name : "",
    releaseDate: al.release_date,
    tracksCount: al.nb_tracks,
  };
}
