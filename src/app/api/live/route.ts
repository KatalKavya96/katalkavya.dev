import { NextResponse } from "next/server";
import { getLiveSnapshot } from "@/lib/live-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await getLiveSnapshot();
  return NextResponse.json(snapshot, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
    },
  });
}
