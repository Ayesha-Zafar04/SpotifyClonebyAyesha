import { NextResponse } from "next/server";
import { searchAllMusic, searchTracks, searchArtists, searchAlbums } from "@/lib/music/search";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type"); // optional: track, artist, album

    if (!query.trim()) {
      return NextResponse.json({
        tracks: [],
        artists: [],
        albums: [],
      });
    }

    // Type-specific search overrides
    if (type === "track") {
      const tracks = await searchTracks(query);
      return NextResponse.json({ tracks, artists: [], albums: [] });
    }

    if (type === "artist") {
      const artists = await searchArtists(query);
      return NextResponse.json({ tracks: [], artists, albums: [] });
    }

    if (type === "album") {
      const albums = await searchAlbums(query);
      return NextResponse.json({ tracks: [], artists: [], albums });
    }

    // Default: unified concurrent search across all types
    const data = await searchAllMusic(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Search Music Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
