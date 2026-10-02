export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  tone: "violet" | "amber" | "blue";
  visual: "system" | "product" | "research";
  media?: { src: string; alt: string; position?: string };
  mark?: string;
  sourceUrl: string;
  evidenceUrl?: string;
  context?: string;
  pushedAt?: string;
};

export type Contribution = {
  organization: string;
  title: string;
  description: string;
  url: string;
  status: "Merged";
  domain: string;
  pullNumber: number;
  additions: number;
  deletions: number;
  changedFiles: number;
  lastVerified: string;
};

export type PublicProfile = {
  platform: string;
  handle: string;
  url: string;
  category: "Code" | "Problem solving" | "AI & data";
  description: string;
  lastVerified: string;
};

// Descriptions below are grounded in the linked repository README or authored PR.
// They describe the public work, not Kavya's sole ownership or an unverified outcome.
export const projects: Project[] = [
  {
    slug: "caramelai",
    number: "01",
    title: "CaramelAI / Dinner",
    category: "Agentic developer tools",
    description:
      "An autonomous coding harness with isolated Git worktrees, bounded checks, repair checkpoints, and reviewable patch export.",
    tags: ["TypeScript", "Bun", "Docker", "AI agents"],
    tone: "violet",
    visual: "system",
    sourceUrl: "https://github.com/KatalKavya96/CaramelAI",
    context:
      "The repository README documents a controller-owned verification loop and an organizer API adapter still pending.",
  },
  {
    slug: "framelabs",
    number: "02",
    title: "FrameLabs",
    category: "Developer tools · Full stack",
    description:
      "A collaborative engineering-diagram workspace with visual editing, a synchronized DSL, version history, and live presence.",
    tags: ["React Flow", "Prisma", "Socket.IO"],
    tone: "blue",
    visual: "system",
    media: {
      src: "/media/framelabs-hero.webp",
      alt: "FrameLabs mark from the project repository",
    },
    sourceUrl: "https://github.com/KatalKavya96/Framelabs-Solo",
  },
  {
    slug: "hostin",
    number: "03",
    title: "HostIn",
    category: "Product engineering",
    description:
      "Contributed to a multi-tenant property platform, from its app shell to workspace UI and end-to-end tests.",
    tags: ["Full stack", "Multi-tenant", "E2E"],
    tone: "amber",
    visual: "product",
    media: {
      src: "/media/hostin-property.webp",
      alt: "Property image from the HostIn project repository",
    },
    mark: "/media/hostin-mark.webp",
    sourceUrl: "https://github.com/1forgeco/HostIn",
    evidenceUrl: "https://github.com/1forgeco/HostIn/pull/43",
  },
  {
    slug: "forgeos",
    number: "04",
    title: "ForgeOS",
    category: "Agentic product engineering",
    description:
      "Contributed a visual browser-agent studio with editable workflows, specialist agents, and a versioned deployment model.",
    tags: ["Browser agents", "Workflows", "Cloudflare"],
    tone: "violet",
    visual: "product",
    media: {
      src: "/media/forgeos-og.webp",
      alt: "ForgeOS project Open Graph artwork from the repository",
    },
    mark: "/media/forgeos-mark.webp",
    sourceUrl: "https://github.com/1forgeco/forgeOS",
    evidenceUrl: "https://github.com/1forgeco/forgeOS/pull/1",
  },
  {
    slug: "electrify",
    number: "05",
    title: "Electrify",
    category: "Full stack · Systems",
    description:
      "A team-built EV charging system covering stations, machine schedules, bookings, and role-based access.",
    tags: ["React", "Express", "Prisma"],
    tone: "amber",
    visual: "product",
    media: {
      src: "/media/electrify-logo.webp",
      alt: "Electrify logo artwork from the project repository",
    },
    sourceUrl: "https://github.com/KatalKavya96/Electrify",
  },
  {
    slug: "maintainex",
    number: "06",
    title: "Maintainex",
    category: "Open-source tooling",
    description:
      "A maintenance-tracking dashboard with activity, repository, organization, and analytics views.",
    tags: ["Next.js", "Express", "Prisma"],
    tone: "blue",
    visual: "research",
    mark: "/media/maintainex-mark.png",
    sourceUrl: "https://github.com/KatalKavya96/Maintainex",
  },
  {
    slug: "property-price-prediction",
    number: "07",
    title: "Property Price Prediction",
    category: "Machine learning",
    description:
      "A team project using an Ames Housing preprocessing and model pipeline with a Streamlit prediction interface.",
    tags: ["Python", "Scikit-learn", "Streamlit"],
    tone: "violet",
    visual: "research",
    media: {
      src: "/media/property-architecture.webp",
      alt: "Architecture diagram from the Property Price Prediction repository",
    },
    sourceUrl: "https://github.com/KatalKavya96/Property_Price_Prediction",
  },
];

export const contributions: Contribution[] = [
  {
    organization: "Apache Magpie",
    title: "Bitbucket bridge",
    description:
      "Added the initial read-only bridge for Bitbucket Cloud and Data Center, with normalized repository and PR data.",
    url: "https://github.com/apache/magpie/pull/739",
    status: "Merged",
    domain: "Developer infrastructure",
    pullNumber: 739,
    additions: 1309,
    deletions: 8,
    changedFiles: 20,
    lastVerified: "2026-10-01",
  },
  {
    organization: "Apache Airflow",
    title: "XComs page controls",
    description:
      "Added expand and collapse controls to the Airflow XComs page.",
    url: "https://github.com/apache/airflow/pull/56083",
    status: "Merged",
    domain: "Product UI",
    pullNumber: 56083,
    additions: 32,
    deletions: 7,
    changedFiles: 2,
    lastVerified: "2026-10-01",
  },
  {
    organization: "Meshery",
    title: "Architecture design",
    description:
      "Contributed a Spring Cloud microservices architecture design to Meshery's public catalog.",
    url: "https://github.com/meshery/meshery/pull/16294",
    status: "Merged",
    domain: "Cloud native",
    pullNumber: 16294,
    additions: 4416,
    deletions: 0,
    changedFiles: 1,
    lastVerified: "2026-10-01",
  },
];

// These exact URLs were supplied by Kavya. Metrics remain absent until independently checked.
export const profiles: PublicProfile[] = [
  {
    platform: "GitHub",
    handle: "KatalKavya96",
    url: "https://github.com/KatalKavya96",
    category: "Code",
    description: "Repositories and public pull requests",
    lastVerified: "2026-10-01",
  },
  {
    platform: "LeetCode",
    handle: "KavyaKatal96",
    url: "https://leetcode.com/u/KavyaKatal96/",
    category: "Problem solving",
    description: "Algorithms and problem-solving practice",
    lastVerified: "2026-10-01",
  },
  {
    platform: "Codeforces",
    handle: "KavyaKatal09",
    url: "https://codeforces.com/profile/KavyaKatal09",
    category: "Problem solving",
    description: "Competitive programming",
    lastVerified: "2026-10-01",
  },
  {
    platform: "CodeChef",
    handle: "kavyakatal09",
    url: "https://www.codechef.com/users/kavyakatal09",
    category: "Problem solving",
    description: "Competitive programming",
    lastVerified: "2026-10-01",
  },
  {
    platform: "HackerRank",
    handle: "kavyakatal09",
    url: "https://www.hackerrank.com/profile/kavyakatal09",
    category: "Problem solving",
    description: "Coding challenges",
    lastVerified: "2026-10-01",
  },
  {
    platform: "GeeksforGeeks",
    handle: "kavyaka5gdv",
    url: "https://www.geeksforgeeks.org/profile/kavyaka5gdv",
    category: "Problem solving",
    description: "Problem-solving practice",
    lastVerified: "2026-10-01",
  },
  {
    platform: "Kaggle",
    handle: "kavyakatal",
    url: "https://www.kaggle.com/kavyakatal",
    category: "AI & data",
    description: "Data and machine-learning work",
    lastVerified: "2026-10-01",
  },
  {
    platform: "Hugging Face",
    handle: "katalkavya96",
    url: "https://huggingface.co/katalkavya96",
    category: "AI & data",
    description: "AI work and explorations",
    lastVerified: "2026-10-01",
  },
  {
    platform: "Tableau Public",
    handle: "kavya.katal",
    url: "https://public.tableau.com/app/profile/kavya.katal",
    category: "AI & data",
    description: "Data visualizations",
    lastVerified: "2026-10-01",
  },
];

export const githubSnapshot = {
  authoredPullRequests: 177,
  mergedPullRequests: 148,
  openPullRequests: 7,
  lastVerified: "2026-10-01",
  sourceUrl:
    "https://github.com/search?q=author%3AKatalKavya96+is%3Apr+is%3Amerged&type=pullrequests",
} as const;

// Read from linked public profiles on 2026-10-01. Live adapters replace these
// values whenever the corresponding platform responds successfully.
export const profileMetricsSnapshot = {
  lastVerified: "2026-10-01",
  github: { publicRepos: 104, followers: 44 },
  codeforces: { rating: 970, rank: "newbie" },
  leetcode: { solved: 866, easy: 286, medium: 437, hard: 143 },
  kaggle: { datasets: 9 },
} as const;

export const repositoryPushSnapshot: Record<string, string> = {
  caramelai: "2026-09-27T00:17:32Z",
  framelabs: "2026-06-21T08:19:13Z",
  hostin: "2026-08-30T05:27:37Z",
  forgeos: "2026-07-24T16:18:34Z",
  electrify: "2026-04-28T22:10:25Z",
  maintainex: "2026-06-17T17:37:29Z",
  "property-price-prediction": "2026-04-21T22:31:25Z",
};
