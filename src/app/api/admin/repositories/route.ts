import { NextRequest, NextResponse } from "next/server";
import { isAdminSession, SESSION_COOKIE } from "@/lib/admin-auth";
import { getPublicRepositories } from "@/lib/curation";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminSession(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const repositories = await getPublicRepositories();
  return NextResponse.json(
    { repositories },
    { headers: { "Cache-Control": "no-store" } },
  );
}
