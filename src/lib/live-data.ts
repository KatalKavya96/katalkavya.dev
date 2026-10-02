import { projects, contributions } from "@/content/portfolio";

export type RepoActivity = {
  pushedAt: string;
  stars: number;
  language: string | null;
};

export type PullActivity = {
  number: number;
  mergedAt: string | null;
  additions: number;
  deletions: number;
  changedFiles: number;
};

export type LiveSnapshot = {
  checkedAt: string;
  repositories: Record<string, RepoActivity>;
  pulls: Record<string, PullActivity>;
  github: {
    publicRepos: number;
    followers: number;
    mergedPulls: number | null;
    weeklyActivity: number[] | null;
  } | null;
  codeforces: {
    rating: number;
    rank: string;
    lastOnline: string;
    ratingHistory: number[] | null;
  } | null;
  leetcode: {
    solved: number;
    easy: number;
    medium: number;
    hard: number;
  } | null;
  kaggle: { datasets: number; latestDataset: string | null } | null;
  huggingFace: { models: number; datasets: number; spaces: number } | null;
};

type GitHubRepository = {
  pushed_at?: string;
  stargazers_count?: number;
  language?: string | null;
};
type GitHubPull = {
  number?: number;
  merged_at?: string | null;
  additions?: number;
  deletions?: number;
  changed_files?: number;
};
type GitHubUser = { public_repos?: number; followers?: number };
type GitHubSearch = { total_count?: number };
type GitHubEvent = { created_at?: string };
type CodeforcesResponse = {
  status?: string;
  result?: Array<{
    rating?: number;
    rank?: string;
    lastOnlineTimeSeconds?: number;
  }>;
};
type CodeforcesRatingResponse = {
  status?: string;
  result?: Array<{ newRating?: number; ratingUpdateTimeSeconds?: number }>;
};
type LeetCodeResponse = {
  data?: {
    matchedUser?: {
      submitStatsGlobal?: {
        acSubmissionNum?: Array<{ difficulty: string; count: number }>;
      };
    };
  };
};
type KaggleDataset = { title?: string; ownerRef?: string };
type HuggingFaceRepo = { id?: string };

function recentWeeks(events: GitHubEvent[]): number[] {
  const now = Date.now();
  const weeks = Array.from({ length: 12 }, () => 0);
  for (const event of events) {
    const date = Date.parse(event.created_at ?? "");
    if (!Number.isFinite(date)) continue;
    const index = 11 - Math.floor((now - date) / (7 * 24 * 60 * 60 * 1000));
    if (index >= 0 && index < weeks.length) weeks[index] += 1;
  }
  return weeks;
}

async function readJson<T>(url: string, github = false): Promise<T | null> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (github) {
    headers.Accept = "application/vnd.github+json";
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
  }
  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(4500),
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function readLeetCode(): Promise<LeetCodeResponse | null> {
  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com/",
      },
      body: JSON.stringify({
        query:
          "query profile($username: String!) { matchedUser(username: $username) { submitStatsGlobal { acSubmissionNum { difficulty count } } } }",
        variables: { username: "KavyaKatal96" },
      }),
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(4500),
    });
    if (!response.ok) return null;
    return (await response.json()) as LeetCodeResponse;
  } catch {
    return null;
  }
}

function githubApiPath(url: string, type: "repos" | "pulls") {
  const parsed = new URL(url);
  const pieces = parsed.pathname.split("/").filter(Boolean);
  return type === "repos"
    ? `https://api.github.com/repos/${pieces[0]}/${pieces[1]}`
    : `https://api.github.com/repos/${pieces[0]}/${pieces[1]}/pulls/${pieces[3]}`;
}

export async function getLiveSnapshot(): Promise<LiveSnapshot> {
  const [
    repositoryResults,
    pullResults,
    githubUser,
    githubSearch,
    githubEvents,
    codeforces,
    codeforcesRatings,
    leetcode,
    kaggle,
    hfModels,
    hfDatasets,
    hfSpaces,
  ] = await Promise.all([
    Promise.all(
      projects.map((project) =>
        readJson<GitHubRepository>(
          githubApiPath(project.sourceUrl, "repos"),
          true,
        ),
      ),
    ),
    Promise.all(
      contributions.map((contribution) =>
        readJson<GitHubPull>(githubApiPath(contribution.url, "pulls"), true),
      ),
    ),
    readJson<GitHubUser>("https://api.github.com/users/KatalKavya96", true),
    readJson<GitHubSearch>(
      "https://api.github.com/search/issues?q=author%3AKatalKavya96+is%3Apr+is%3Amerged&per_page=1",
      true,
    ),
    readJson<GitHubEvent[]>(
      "https://api.github.com/users/KatalKavya96/events/public?per_page=100",
      true,
    ),
    readJson<CodeforcesResponse>(
      "https://codeforces.com/api/user.info?handles=KavyaKatal09",
    ),
    readJson<CodeforcesRatingResponse>(
      "https://codeforces.com/api/user.rating?handle=KavyaKatal09",
    ),
    readLeetCode(),
    readJson<KaggleDataset[]>(
      "https://www.kaggle.com/api/v1/datasets/list?user=kavyakatal&pageSize=100",
    ),
    readJson<HuggingFaceRepo[]>(
      "https://huggingface.co/api/models?author=katalkavya96&limit=100",
    ),
    readJson<HuggingFaceRepo[]>(
      "https://huggingface.co/api/datasets?author=katalkavya96&limit=100",
    ),
    readJson<HuggingFaceRepo[]>(
      "https://huggingface.co/api/spaces?author=katalkavya96&limit=100",
    ),
  ]);

  const repositories: Record<string, RepoActivity> = {};
  projects.forEach((project, index) => {
    const result = repositoryResults[index];
    if (result?.pushed_at && typeof result.stargazers_count === "number") {
      repositories[project.slug] = {
        pushedAt: result.pushed_at,
        stars: result.stargazers_count,
        language: result.language ?? null,
      };
    }
  });

  const pulls: Record<string, PullActivity> = {};
  contributions.forEach((contribution, index) => {
    const result = pullResults[index];
    if (
      typeof result?.number === "number" &&
      typeof result.additions === "number" &&
      typeof result.deletions === "number" &&
      typeof result.changed_files === "number"
    ) {
      pulls[contribution.url] = {
        number: result.number,
        mergedAt: result.merged_at ?? null,
        additions: result.additions,
        deletions: result.deletions,
        changedFiles: result.changed_files,
      };
    }
  });

  const cfUser = codeforces?.status === "OK" ? codeforces.result?.[0] : null;
  const solved =
    leetcode?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  const byDifficulty = (difficulty: string) =>
    solved?.find((entry) => entry.difficulty === difficulty)?.count;
  const publicDatasets = Array.isArray(kaggle)
    ? kaggle.filter((dataset) => dataset.ownerRef === "kavyakatal")
    : null;
  return {
    checkedAt: new Date().toISOString(),
    repositories,
    pulls,
    github:
      githubUser &&
      typeof githubUser.public_repos === "number" &&
      typeof githubUser.followers === "number"
        ? {
            publicRepos: githubUser.public_repos,
            followers: githubUser.followers,
            mergedPulls:
              typeof githubSearch?.total_count === "number"
                ? githubSearch.total_count
                : null,
            weeklyActivity: Array.isArray(githubEvents)
              ? recentWeeks(githubEvents)
              : null,
          }
        : null,
    codeforces:
      cfUser &&
      typeof cfUser.rating === "number" &&
      typeof cfUser.rank === "string" &&
      typeof cfUser.lastOnlineTimeSeconds === "number"
        ? {
            rating: cfUser.rating,
            rank: cfUser.rank,
            lastOnline: new Date(
              cfUser.lastOnlineTimeSeconds * 1000,
            ).toISOString(),
            ratingHistory:
              codeforcesRatings?.status === "OK" &&
              Array.isArray(codeforcesRatings.result)
                ? codeforcesRatings.result
                    .filter((item) => typeof item.newRating === "number")
                    .slice(-12)
                    .map((item) => item.newRating!)
                : null,
          }
        : null,
    leetcode: ["All", "Easy", "Medium", "Hard"].every(
      (difficulty) => typeof byDifficulty(difficulty) === "number",
    )
      ? {
          solved: byDifficulty("All")!,
          easy: byDifficulty("Easy")!,
          medium: byDifficulty("Medium")!,
          hard: byDifficulty("Hard")!,
        }
      : null,
    kaggle: publicDatasets
      ? {
          datasets: publicDatasets.length,
          latestDataset: publicDatasets[0]?.title ?? null,
        }
      : null,
    huggingFace:
      Array.isArray(hfModels) &&
      Array.isArray(hfDatasets) &&
      Array.isArray(hfSpaces)
        ? {
            models: hfModels.length,
            datasets: hfDatasets.length,
            spaces: hfSpaces.length,
          }
        : null,
  };
}
