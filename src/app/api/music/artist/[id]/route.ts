import { NextResponse } from "next/server";
import { getArtistDetails } from "@/lib/music/details";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Bad Request: Artist ID is required" },
        { status: 400 }
      );
    }

    const artist = await getArtistDetails(id);

    if (!artist) {
      return NextResponse.json(
        { error: "Not Found: Artist does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(artist);
  } catch (error) {
    console.error("GET Artist Details Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
