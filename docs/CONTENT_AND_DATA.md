# Content & Data Rules

## 1. Source of truth

All content should live in typed data files or a future CMS adapter, never scattered across presentation components.

Suggested content modules:

```text
src/content/profile.ts
src/content/projects.ts
src/content/openSource.ts
src/content/codingProfiles.ts
src/content/lab.ts
src/content/journey.ts
```

## 2. Suggested TypeScript models

```ts
export type Project = {
  slug: string;
  name: string;
  category:
    | "agentic-ai"
    | "ai-ml"
    | "open-source"
    | "full-stack"
    | "product"
    | "experiment";
  summary: string;
  description?: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  caseStudy?: boolean;
  status?: string;
  featured?: boolean;
  media: {
    poster: string;
    video?: string;
    alt: string;
  };
};

export type OpenSourceContribution = {
  id: string;
  organization: string;
  repository: string;
  title: string;
  summary: string;
  contributionType: string;
  prUrl?: string;
  status?: "merged" | "open" | "closed";
  technologies?: string[];
  date?: string;
  verified: boolean;
};

export type CodingProfile = {
  platform: string;
  handle: string;
  url: string;
  description: string;
  primary?: boolean;
  metrics?: Array<{ label: string; value: string }>;
  lastVerified?: string;
};
```

## 3. Accuracy

Mockup values are not source data.
Before exposing a metric in production:

- verify it from the platform/API/profile,
- or collect it manually from the user,
- store `lastVerified` when it can become stale.

## 4. GitHub integration

Prefer server-side/revalidated retrieval for:

- public profile metadata,
- repository metadata,
- PR/contribution data that can be reliably queried.

Cache aggressively. The page must still render if GitHub is unavailable.
Never expose API secrets client-side.

## 5. Coding platform data

Platform APIs differ in availability and reliability.
Do not scrape fragile pages from the browser runtime.
Prefer:

1. official API,
2. build-time/server-side adapter,
3. manually verified content.

## 6. Content writing rules

- Project summary: ideally 12–25 words.
- Contribution summary: explain impact, not just implementation.
- Avoid adjectives that are not evidence.
- Prefer active verbs: built, designed, integrated, implemented, contributed, evaluated, shipped.
- Explain personal contribution precisely on collaborative work.

## 7. Media

For each flagship project aim to collect:

- 1 strong hero screenshot/poster,
- 1 short 8–20 second product/demo loop,
- 2–5 supporting screenshots,
- optional architecture graphic.

Do not use a video simply because a video exists.

## 8. Missing data behavior

If data is missing:

- hide the field,
- do not fill with fake values,
- do not display "0" unless zero is meaningful and confirmed.
