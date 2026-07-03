import { NextResponse } from "next/server";
import { getFeaturedCharts } from "@/lib/music/featured";

export async function GET() {
  try {
    const data = await getFeaturedCharts();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Featured Music Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
