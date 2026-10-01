import { NextResponse } from "next/server";
import { getOpenSourceFeed } from "@/lib/open-source-feed";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getOpenSourceFeed(), {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
    },
  });
}
