import initialCuration from "@/content/curation.json";
import { projects, type Project } from "@/content/portfolio";
import { projectDomains, type ProjectDomain } from "@/content/domains";

export type GitHubRepoSnapshot = {
  name: string;
  description: string | null;
  topics: string[];
  language: string | null;
  pushedAt: string;
  createdAt: string;
  homepage: string | null;
};
export type CuratedProject = {
  repository: string;
  domains: ProjectDomain[];
  addedAt: string;
  snapshot?: GitHubRepoSnapshot;
};
export type Curation = {
  version: 1;
  autoAddAfter: string;
  hiddenRepositories: string[];
  projects: CuratedProject[];
};

type GitHubContent = { content?: string; sha?: string; encoding?: string };
type GitHubRepo = {
  name?: string;
  full_name?: string;
  description?: string | null;
  topics?: string[];
  language?: string | null;
  pushed_at?: string;
  created_at?: string;
  homepage?: string | null;
  fork?: boolean;
  archived?: boolean;
};

const repoPattern = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const curationPath = "src/content/curation.json";
const portfolioRepository = "KatalKavya96/katalkavya.dev";

function contentToken() {
  return process.env.GITHUB_CONTENT_TOKEN;
}
function readToken() {
  return process.env.GITHUB_TOKEN ?? contentToken();
}
function githubHeaders(token?: string): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function parseRepository(input: string): string | null {
  const trimmed = input.trim();
  let value = trimmed;
  if (trimmed.startsWith("https://github.com/")) {
    const url = new URL(trimmed);
    value = url.pathname.replace(/^\/+|\/+$/g, "").replace(/\.git$/, "");
  }
  return repoPattern.test(value) ? value : null;
}

export function validDomains(input: unknown): ProjectDomain[] {
  return Array.isArray(input)
    ? [
        ...new Set(
          input.filter((value): value is ProjectDomain =>
            projectDomains.includes(value as ProjectDomain),
          ),
        ),
      ].slice(0, 4)
    : [];
}

function validSnapshot(input: unknown): GitHubRepoSnapshot | undefined {
  if (!input || typeof input !== "object") return undefined;
  const value = input as Partial<GitHubRepoSnapshot>;
  if (
    typeof value.name !== "string" ||
    typeof value.pushedAt !== "string" ||
    typeof value.createdAt !== "string"
  )
    return undefined;
  return {
    name: value.name.slice(0, 100),
    description:
      typeof value.description === "string"
        ? value.description.slice(0, 400)
        : null,
    topics: Array.isArray(value.topics)
      ? value.topics
          .filter((topic): topic is string => typeof topic === "string")
          .slice(0, 8)
      : [],
    language: typeof value.language === "string" ? value.language : null,
    pushedAt: value.pushedAt,
    createdAt: value.createdAt,
    homepage:
      typeof value.homepage === "string" &&
      value.homepage.startsWith("https://")
        ? value.homepage
        : null,
  };
}

export function parseCuration(input: unknown): Curation | null {
  if (!input || typeof input !== "object") return null;
  const data = input as Partial<Curation>;
  if (
    data.version !== 1 ||
    !Array.isArray(data.projects) ||
    typeof data.autoAddAfter !== "string"
  )
    return null;
  const projects: CuratedProject[] = [];
  const seen = new Set<string>();
  for (const item of data.projects) {
    const repository =
      typeof item?.repository === "string"
        ? parseRepository(item.repository)
        : null;
    if (!repository || seen.has(repository.toLowerCase())) continue;
    seen.add(repository.toLowerCase());
    projects.push({
      repository,
      domains: validDomains(item.domains),
      addedAt:
        typeof item.addedAt === "string" ? item.addedAt : data.autoAddAfter,
      snapshot: validSnapshot(item.snapshot),
    });
  }
  const hiddenRepositories = Array.isArray(data.hiddenRepositories)
    ? data.hiddenRepositories
        .map((value) =>
          typeof value === "string" ? parseRepository(value) : null,
        )
        .filter((value): value is string => Boolean(value))
    : [];
  return {
    version: 1,
    autoAddAfter: data.autoAddAfter,
    hiddenRepositories,
    projects,
  };
}

export async function getCuration(): Promise<Curation> {
  const fallback = parseCuration(initialCuration)!;
  const token = contentToken();
  if (!token) return fallback;
  try {
    const response = await fetch(
      `https://api.github.com/repos/${portfolioRepository}/contents/${curationPath}`,
      {
        headers: githubHeaders(token),
        cache: "no-store",
        signal: AbortSignal.timeout(4500),
      },
    );
    if (!response.ok) return fallback;
    const content = (await response.json()) as GitHubContent;
    if (content.encoding !== "base64" || !content.content) return fallback;
    return (
      parseCuration(
        JSON.parse(Buffer.from(content.content, "base64").toString("utf8")),
      ) ?? fallback
    );
  } catch {
    return fallback;
  }
}

export async function saveCuration(
  curation: Curation,
): Promise<{ ok: boolean; reason?: string }> {
  const token = contentToken();
  if (!token)
    return { ok: false, reason: "GITHUB_CONTENT_TOKEN is not configured" };
  const base = `https://api.github.com/repos/${portfolioRepository}/contents/${curationPath}`;
  try {
    const existing = await fetch(base, {
      headers: githubHeaders(token),
      cache: "no-store",
      signal: AbortSignal.timeout(7000),
    });
    if (!existing.ok && existing.status !== 404)
      return { ok: false, reason: `GitHub read returned ${existing.status}` };
    const current = existing.ok
      ? ((await existing.json()) as GitHubContent)
      : null;
    const response = await fetch(base, {
      method: "PUT",
      headers: { ...githubHeaders(token), "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Curate portfolio projects",
        content: Buffer.from(JSON.stringify(curation, null, 2) + "\n").toString(
          "base64",
        ),
        ...(current?.sha ? { sha: current.sha } : {}),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    return response.ok
      ? { ok: true }
      : { ok: false, reason: `GitHub write returned ${response.status}` };
  } catch {
    return { ok: false, reason: "GitHub is temporarily unavailable" };
  }
}

export async function fetchRepository(
  repository: string,
): Promise<GitHubRepoSnapshot | null> {
  if (!repoPattern.test(repository)) return null;
  try {
    const response = await fetch(`https://api.github.com/repos/${repository}`, {
      headers: githubHeaders(readToken()),
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(4500),
    });
    if (!response.ok) return null;
    const result = (await response.json()) as GitHubRepo;
    if (!result.name || !result.pushed_at || !result.created_at) return null;
    return {
      name: result.name,
      description: result.description ?? null,
      topics: Array.isArray(result.topics) ? result.topics : [],
      language: result.language ?? null,
      pushedAt: result.pushed_at,
      createdAt: result.created_at,
      homepage: result.homepage?.startsWith("https://")
        ? result.homepage
        : null,
    };
  } catch {
    return null;
  }
}

export async function getNewPublicRepositories(
  after: string,
): Promise<Array<{ repository: string; snapshot: GitHubRepoSnapshot }>> {
  return (await getPublicRepositories()).filter(
    (entry) => entry.snapshot.createdAt > after,
  );
}

export async function getPublicRepositories(): Promise<
  Array<{ repository: string; snapshot: GitHubRepoSnapshot }>
> {
  try {
    const pages = await Promise.all(
      [1, 2].map((page) =>
        fetch(
          `https://api.github.com/users/KatalKavya96/repos?per_page=100&sort=created&direction=desc&page=${page}`,
          {
            headers: githubHeaders(readToken()),
            next: { revalidate: 900 },
            signal: AbortSignal.timeout(4500),
          },
        ),
      ),
    );
    if (!pages[0].ok) return [];
    const repositories = (
      await Promise.all(
        pages.map(async (response) =>
          response.ok ? ((await response.json()) as GitHubRepo[]) : [],
        ),
      )
    ).flat();
    return repositories
      .filter(
        (repo) =>
          repo.full_name &&
          repo.name &&
          repo.created_at &&
          repo.pushed_at &&
          !repo.fork &&
          !repo.archived,
      )
      .map((repo) => ({
        repository: repo.full_name!,
        snapshot: {
          name: repo.name!,
          description: repo.description ?? null,
          topics: repo.topics ?? [],
          language: repo.language ?? null,
          pushedAt: repo.pushed_at!,
          createdAt: repo.created_at!,
          homepage: repo.homepage?.startsWith("https://")
            ? repo.homepage
            : null,
        },
      }));
  } catch {
    return [];
  }
}

function projectFromEntry(
  entry: CuratedProject,
  live: GitHubRepoSnapshot | null,
): Project {
  const repository = entry.repository;
  const existing = projects.find(
    (project) =>
      project.sourceUrl.toLowerCase() ===
      `https://github.com/${repository}`.toLowerCase(),
  );
  const data = live ?? entry.snapshot;
  const domains = entry.domains.length ? entry.domains : ["Experiment"];
  const tags = data?.topics.length
    ? data.topics.slice(0, 4)
    : (existing?.tags ?? (data?.language ? [data.language] : []));
  return {
    slug: existing?.slug ?? repository.toLowerCase().replace("/", "--"),
    number: existing?.number ?? "↗",
    title: existing?.title ?? data?.name ?? repository.split("/")[1],
    category: domains.join(" · "),
    description:
      data?.description ||
      existing?.description ||
      `Public repository for ${data?.name ?? repository.split("/")[1]}.`,
    tags,
    tone:
      existing?.tone ??
      (domains.includes("Product")
        ? "amber"
        : domains.includes("AI / ML")
          ? "violet"
          : "blue"),
    visual: existing?.visual ?? "system",
    sourceUrl: `https://github.com/${repository}`,
    evidenceUrl: existing?.evidenceUrl,
    context: existing?.context,
    pushedAt: data?.pushedAt,
    media: existing?.media ?? {
      src: `https://opengraph.githubassets.com/1/${repository}`,
      alt: `GitHub repository preview for ${repository}`,
    },
    mark: existing?.mark,
  };
}

export async function getCuratedProjects(): Promise<Project[]> {
  const curation = await getCuration();
  const incoming = await getNewPublicRepositories(curation.autoAddAfter);
  const registered = new Set(
    curation.projects.map((entry) => entry.repository.toLowerCase()),
  );
  const hidden = new Set(
    curation.hiddenRepositories.map((repo) => repo.toLowerCase()),
  );
  const automatic: CuratedProject[] = incoming
    .filter(
      (entry) =>
        !registered.has(entry.repository.toLowerCase()) &&
        !hidden.has(entry.repository.toLowerCase()),
    )
    .map((entry) => ({
      repository: entry.repository,
      domains: ["Experiment" as ProjectDomain],
      addedAt: entry.snapshot.createdAt,
      snapshot: entry.snapshot,
    }))
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  const ordered = [
    ...curation.projects.filter(
      (entry) => !hidden.has(entry.repository.toLowerCase()),
    ),
    ...automatic,
  ];
  return Promise.all(
    ordered.map(async (entry, index) => ({
      ...projectFromEntry(entry, await fetchRepository(entry.repository)),
      number: String(index + 1).padStart(2, "0"),
    })),
  );
}
