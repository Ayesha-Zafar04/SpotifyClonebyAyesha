import { NextResponse } from "next/server";
import { getTrackDetails } from "@/lib/music/details";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Bad Request: Track ID is required" },
        { status: 400 }
      );
    }

    const track = await getTrackDetails(id);

    if (!track) {
      return NextResponse.json(
        { error: "Not Found: Track does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(track);
  } catch (error) {
    console.error("GET Track Details Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
