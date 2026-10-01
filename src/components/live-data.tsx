"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { LiveSnapshot } from "@/lib/live-data";
import {
  profileMetricsSnapshot,
  repositoryPushSnapshot,
} from "@/content/portfolio";
import type { Contribution } from "@/content/portfolio";

const LiveContext = createContext<LiveSnapshot | null>(null);

export function LiveDataProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<LiveSnapshot | null>(null);

  useEffect(() => {
    let active = true;
    const update = async () => {
      try {
        const response = await fetch("/api/live", { cache: "no-store" });
        if (response.ok && active) {
          setSnapshot((await response.json()) as LiveSnapshot);
        }
      } catch {
        // The evidence links and verified copy stay usable when an API is down.
      }
    };
    void update();
    const interval = window.setInterval(() => void update(), 300_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <LiveContext.Provider value={snapshot}>{children}</LiveContext.Provider>
  );
}

export function useLiveData() {
  return useContext(LiveContext);
}

export function LiveStatus({ compact = false }: { compact?: boolean }) {
  const snapshot = useLiveData();
  const hasData =
    snapshot &&
    (Object.keys(snapshot.repositories).length > 0 ||
      snapshot.github ||
      snapshot.codeforces ||
      snapshot.leetcode ||
      snapshot.kaggle);
  return (
    <span
      className={`live-status ${hasData ? "is-live" : ""} ${compact ? "compact" : ""}`}
      role="status"
      aria-label={hasData ? "Live data available" : "Verified public data"}
      title={hasData ? "Live data available" : "Verified public data"}
    >
      <i aria-hidden="true" />
    </span>
  );
}

export function RepoPulse({ slug }: { slug: string }) {
  const activity = useLiveData()?.repositories[slug];
  const pushedAt = activity?.pushedAt ?? repositoryPushSnapshot[slug];
  if (!pushedAt) return <span className="repo-pulse">Public repository</span>;
  const date = new Date(pushedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <span
      className="repo-pulse"
      title={`Latest repository push: ${date}. ${activity ? "Live GitHub API" : "Verified 2026-10-01"}`}
    >
      <i aria-hidden="true" /> Last push {date}
    </span>
  );
}

export function PullPulse({ contribution }: { contribution: Contribution }) {
  const activity = useLiveData()?.pulls[contribution.url];
  return (
    <span className="pull-pulse">
      <b>#{activity?.number ?? contribution.pullNumber}</b>
      <span>
        +{(activity?.additions ?? contribution.additions).toLocaleString()}
      </span>
      <span>
        −{(activity?.deletions ?? contribution.deletions).toLocaleString()}
      </span>
      <small>{activity?.changedFiles ?? contribution.changedFiles} files</small>
    </span>
  );
}

export function GitHubLiveMetrics() {
  const github = useLiveData()?.github;
  const repoCount =
    github?.publicRepos ?? profileMetricsSnapshot.github.publicRepos;
  const followers =
    github?.followers ?? profileMetricsSnapshot.github.followers;
  return (
    <span className="platform-live-metrics">
      <strong>{repoCount}</strong> public repos
      <span aria-hidden="true">·</span>
      <strong>{followers}</strong> followers
      {!github && <small>Oct 2026</small>}
    </span>
  );
}

export function CodeforcesLiveMetrics() {
  const codeforces = useLiveData()?.codeforces;
  return (
    <span className="platform-live-metrics">
      <strong>
        {codeforces?.rating ?? profileMetricsSnapshot.codeforces.rating}
      </strong>{" "}
      rating
      <span aria-hidden="true">·</span>
      {codeforces?.rank ?? profileMetricsSnapshot.codeforces.rank}
      {!codeforces && <small>Oct 2026</small>}
    </span>
  );
}

export function LeetCodeLiveMetrics() {
  const leetcode = useLiveData()?.leetcode;
  return (
    <span className="platform-live-metrics">
      <strong>
        {leetcode?.solved ?? profileMetricsSnapshot.leetcode.solved}
      </strong>{" "}
      solved
      <span aria-hidden="true">·</span>
      {leetcode ? `${leetcode.hard} hard` : "Oct 2026"}
    </span>
  );
}

export function KaggleLiveMetrics() {
  const kaggle = useLiveData()?.kaggle;
  return (
    <span className="platform-live-metrics">
      <strong>
        {kaggle?.datasets ?? profileMetricsSnapshot.kaggle.datasets}
      </strong>{" "}
      public datasets
      {!kaggle && <small>Oct 2026</small>}
    </span>
  );
}

export function MergedPullCount({ fallback }: { fallback: number }) {
  const count = useLiveData()?.github?.mergedPulls;
  return <>{count ?? fallback}</>;
}
