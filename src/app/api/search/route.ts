import { NextResponse } from "next/server";
import { getCuratedProjects } from "@/lib/curation";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await getCuratedProjects();
  return NextResponse.json(
    projects.map((project) => ({
      title: project.title,
      href: project.sourceUrl,
      description: project.category,
    })),
    { headers: { "Cache-Control": "public, s-maxage=300" } },
  );
}
