import pullSnapshot from "@/content/pr-snapshot.json";

export type PublicPull = {
  number: number;
  title: string;
  url: string;
  repository: string;
  owner: string;
  createdAt: string;
  status: "Open" | "Merged" | "Closed";
};

export type Organization = { login: string; avatarUrl: string; url: string };
export type PullGroup = {
  repository: string;
  owner: string;
  pulls: PublicPull[];
};
export type OpenSourceFeed = {
  groups: PullGroup[];
  organizations: Organization[];
  totalAuthored: number;
  live: boolean;
};

type GitHubSearchItem = {
  number: number;
  title: string;
  html_url: string;
  repository_url: string;
  created_at: string;
  state: "open" | "closed";
  pull_request?: { merged_at?: string | null };
  merged_at?: string | null;
};
type GitHubSearchResponse = {
  total_count?: number;
  items?: GitHubSearchItem[];
};
type GitHubOwner = {
  login?: string;
  type?: string;
  avatar_url?: string;
  html_url?: string;
};

const knownOrganizations: Record<string, string> = {
  "1forgeco": "285062053",
  "DCODE-HQ": "222009873",
  "Newton-School": "64539991",
  PalisadoesFoundation: "24500036",
  SASTxNST: "213286858",
  apache: "47359",
  "devclub-nstru": "189866967",
  layer5io: "44620851",
  meshery: "52376019",
};

async function githubGet<T>(path: string): Promise<T | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const response = await fetch(`https://api.github.com/${path}`, {
      headers,
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function normalize(item: GitHubSearchItem): PublicPull | null {
  const repository = item.repository_url.replace(
    "https://api.github.com/repos/",
    "",
  );
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) return null;
  return {
    number: item.number,
    title: item.title,
    url: item.html_url,
    repository,
    owner: repository.split("/")[0],
    createdAt: item.created_at,
    status:
      item.state === "open"
        ? "Open"
        : item.pull_request?.merged_at || item.merged_at
          ? "Merged"
          : "Closed",
  };
}

export async function getOpenSourceFeed(): Promise<OpenSourceFeed> {
  const search =
    "search/issues?q=author%3AKatalKavya96+is%3Apr&sort=created&order=desc&per_page=100";
  const first = await githubGet<GitHubSearchResponse>(`${search}&page=1`);
  const second =
    first && (first.total_count ?? 0) > 100
      ? await githubGet<GitHubSearchResponse>(`${search}&page=2`)
      : null;
  const live = Boolean(first?.items?.length);
  const source: GitHubSearchItem[] = live
    ? [...(first?.items ?? []), ...(second?.items ?? [])]
    : pullSnapshot.map((item) => ({
        number: item.number,
        title: item.title,
        html_url: item.html_url,
        repository_url: item.repository_url,
        created_at: item.created_at,
        state: item.state as "open" | "closed",
        merged_at: item.merged_at,
      }));

  const pulls = source
    .map(normalize)
    .filter((item): item is PublicPull => Boolean(item));
  pulls.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const grouped = new Map<string, PullGroup>();
  for (const pull of pulls) {
    if (pull.owner.toLowerCase() === "katalkavya96") continue;
    const group = grouped.get(pull.repository) ?? {
      repository: pull.repository,
      owner: pull.owner,
      pulls: [],
    };
    group.pulls.push(pull);
    grouped.set(pull.repository, group);
  }

  const owners = [
    ...new Set([...grouped.values()].map((group) => group.owner)),
  ];
  const unknown = owners.filter((owner) => !knownOrganizations[owner]);
  const resolved = await Promise.all(
    unknown.map((owner) => githubGet<GitHubOwner>(`users/${owner}`)),
  );
  const dynamicOrgs = new Map<string, Organization>();
  unknown.forEach((owner, index) => {
    const data = resolved[index];
    if (data?.type === "Organization" && data.avatar_url) {
      dynamicOrgs.set(owner, {
        login: owner,
        avatarUrl: data.avatar_url,
        url: data.html_url ?? `https://github.com/${owner}`,
      });
    }
  });
  const organizations = owners
    .map((owner) => {
      if (knownOrganizations[owner]) {
        return {
          login: owner,
          avatarUrl: `https://avatars.githubusercontent.com/u/${knownOrganizations[owner]}?v=4`,
          url: `https://github.com/${owner}`,
        };
      }
      return dynamicOrgs.get(owner) ?? null;
    })
    .filter((item): item is Organization => Boolean(item));

  return {
    groups: [...grouped.values()],
    organizations,
    totalAuthored: live
      ? (first?.total_count ?? pulls.length)
      : pullSnapshot.length,
    live,
  };
}
