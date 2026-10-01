import { NextRequest, NextResponse } from "next/server";
import { isAdminSession, SESSION_COOKIE } from "@/lib/admin-auth";
import {
  fetchRepository,
  getCuration,
  getCuratedProjects,
  parseRepository,
  saveCuration,
  validDomains,
} from "@/lib/curation";

export const dynamic = "force-dynamic";

function unauthorized(request: NextRequest) {
  return !isAdminSession(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function GET(request: NextRequest) {
  if (unauthorized(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [curation, currentProjects] = await Promise.all([
    getCuration(),
    getCuratedProjects(),
  ]);
  return NextResponse.json(
    {
      curation,
      currentProjects,
      storageReady: Boolean(process.env.GITHUB_CONTENT_TOKEN),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

type Mutation = {
  action?: string;
  repository?: string;
  domains?: unknown;
  direction?: string;
};

export async function POST(request: NextRequest) {
  if (unauthorized(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  let body: Mutation;
  try {
    body = (await request.json()) as Mutation;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const repository =
    typeof body.repository === "string"
      ? parseRepository(body.repository)
      : null;
  if (!repository)
    return NextResponse.json(
      { error: "Enter a GitHub repository URL or owner/name" },
      { status: 400 },
    );
  const curation = await getCuration();
  const index = curation.projects.findIndex(
    (project) => project.repository.toLowerCase() === repository.toLowerCase(),
  );
  const hiddenIndex = curation.hiddenRepositories.findIndex(
    (item) => item.toLowerCase() === repository.toLowerCase(),
  );

  if (body.action === "add" || body.action === "show") {
    const snapshot = await fetchRepository(repository);
    if (!snapshot && index < 0)
      return NextResponse.json(
        { error: "GitHub repository could not be verified" },
        { status: 502 },
      );
    if (index < 0)
      curation.projects.unshift({
        repository,
        domains: validDomains(body.domains),
        addedAt: new Date().toISOString(),
        snapshot: snapshot ?? undefined,
      });
    if (hiddenIndex >= 0) curation.hiddenRepositories.splice(hiddenIndex, 1);
  } else if (body.action === "domains") {
    if (index < 0)
      return NextResponse.json(
        { error: "Add this repository before editing domains" },
        { status: 404 },
      );
    curation.projects[index].domains = validDomains(body.domains);
  } else if (body.action === "move") {
    if (index < 0)
      return NextResponse.json(
        { error: "Add this repository before reordering" },
        { status: 404 },
      );
    const to =
      index +
      (body.direction === "up" ? -1 : body.direction === "down" ? 1 : 0);
    if (to >= 0 && to < curation.projects.length)
      [curation.projects[index], curation.projects[to]] = [
        curation.projects[to],
        curation.projects[index],
      ];
  } else if (body.action === "hide") {
    if (hiddenIndex < 0) curation.hiddenRepositories.push(repository);
  } else {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  const result = await saveCuration(curation);
  if (!result.ok)
    return NextResponse.json(
      { error: result.reason ?? "Save failed" },
      { status: 503 },
    );
  return NextResponse.json(
    { curation },
    { headers: { "Cache-Control": "no-store" } },
  );
}
