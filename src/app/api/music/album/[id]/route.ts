import { NextResponse } from "next/server";
import { getAlbumDetails } from "@/lib/music/details";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Bad Request: Album ID is required" },
        { status: 400 }
      );
    }

    const album = await getAlbumDetails(id);

    if (!album) {
      return NextResponse.json(
        { error: "Not Found: Album does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(album);
  } catch (error) {
    console.error("GET Album Details Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
