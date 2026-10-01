"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type {
  OpenSourceFeed,
  PullGroup,
  PublicPull,
} from "@/lib/open-source-feed";

function formattedDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PullStatus({ pull }: { pull: PublicPull }) {
  return (
    <span className={`pull-status status-${pull.status.toLowerCase()}`}>
      {pull.status}
    </span>
  );
}

function OrganizationRibbon({ feed }: { feed: OpenSourceFeed }) {
  const organizations = feed.organizations;
  if (!organizations.length) return null;
  const item = (
    organization: (typeof organizations)[number],
    index: number,
    clone: boolean,
  ) => (
    <a
      key={`${organization.login}-${index}-${clone}`}
      href={organization.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={clone ? -1 : undefined}
      aria-hidden={clone ? true : undefined}
    >
      <Image
        src={organization.avatarUrl}
        alt=""
        width={25}
        height={25}
        unoptimized
      />
      <span>{organization.login}</span>
    </a>
  );
  return (
    <div
      className="organization-ribbon"
      aria-label="Organizations with public pull requests by Kavya"
    >
      <span className="ribbon-label">Contributed to</span>
      <div className="ribbon-window">
        <div className="ribbon-track">
          {organizations.map((org, i) => item(org, i, false))}
          {organizations.map((org, i) => item(org, i, true))}
        </div>
      </div>
    </div>
  );
}

function PullCard({
  group,
  avatarUrl,
  active,
  pinned,
  onHover,
  onLeave,
  onToggle,
}: {
  group: PullGroup;
  avatarUrl?: string;
  active: boolean;
  pinned: boolean;
  onHover: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  const latest = group.pulls[0];
  const repoName = group.repository.split("/")[1];
  return (
    <article
      className={`pull-project-card ${active ? "is-active" : ""} ${pinned ? "is-pinned" : ""}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onLeave();
      }}
    >
      <button
        type="button"
        className="pull-card-toggle"
        onClick={onToggle}
        onFocus={onHover}
        aria-expanded={active}
        aria-label={`${repoName}: ${active ? "close" : "open"} pull request timeline`}
      >
        <span className="pull-card-top">
          <span className="pull-project-identity">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt=""
                width={34}
                height={34}
                unoptimized
              />
            ) : (
              <span className="org-letter">
                {group.owner.slice(0, 1).toUpperCase()}
              </span>
            )}
            <span>
              <small>{group.owner}</small>
              <strong>{repoName}</strong>
            </span>
          </span>
          <span className="pull-card-action">
            {pinned ? "Pinned" : active ? "Click to pin" : "Explore PRs"}{" "}
            <b aria-hidden="true">↗</b>
          </span>
        </span>
        <span className="latest-label">Latest raised pull request</span>
        <strong className="latest-title">{latest.title}</strong>
        <span className="latest-meta">
          <PullStatus pull={latest} />
          <span>#{latest.number}</span>
          <span>{formattedDate(latest.createdAt)}</span>
        </span>
        <span className="pull-card-foot">
          <span>
            {group.pulls.length} authored PR
            {group.pulls.length === 1 ? "" : "s"} in this repository
          </span>
          <span aria-hidden="true">{active ? "−" : "+"}</span>
        </span>
      </button>
      <div className="pull-timeline" aria-hidden={!active}>
        <div className="timeline-heading">
          <strong>Pull request timeline</strong>
          <span>Newest first</span>
        </div>
        <div className="timeline-scroll" tabIndex={active ? 0 : -1}>
          {group.pulls.map((pull) => (
            <a
              key={pull.url}
              href={pull.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={active ? undefined : -1}
            >
              <span className="timeline-dot" />
              <span className="timeline-content">
                <strong>{pull.title}</strong>
                <small>
                  #{pull.number} · {formattedDate(pull.createdAt)}
                </small>
              </span>
              <PullStatus pull={pull} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export function OpenSourceExplorer({
  initialFeed,
}: {
  initialFeed: OpenSourceFeed;
}) {
  const [feed, setFeed] = useState(initialFeed);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let active = true;
    const update = async () => {
      try {
        const response = await fetch("/api/open-source", { cache: "no-store" });
        if (response.ok && active)
          setFeed((await response.json()) as OpenSourceFeed);
      } catch {
        /* The verified snapshot stays available. */
      }
    };
    const interval = window.setInterval(() => void update(), 300_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const organizations = new Map(
    feed.organizations.map((org) => [org.login, org.avatarUrl]),
  );
  const groups = showAll ? feed.groups : feed.groups.slice(0, 6);
  return (
    <>
      <OrganizationRibbon feed={feed} />
      <section
        id="contributions"
        className="page-width source-explorer"
        aria-labelledby="contributions-title"
      >
        <div className="explorer-head">
          <div>
            <span className="eyebrow eyebrow-green">
              <span aria-hidden="true" /> OPEN SOURCE
            </span>
            <h2 id="contributions-title">A trail of real changes.</h2>
          </div>
          <span>
            {feed.groups.length} repositories · {feed.totalAuthored} authored
            PRs
          </span>
        </div>
        <div className="pull-project-grid">
          {groups.map((group) => (
            <PullCard
              key={group.repository}
              group={group}
              avatarUrl={organizations.get(group.owner)}
              active={
                hovered === group.repository || pinned === group.repository
              }
              pinned={pinned === group.repository}
              onHover={() => setHovered(group.repository)}
              onLeave={() => setHovered(null)}
              onToggle={() =>
                setPinned((current) =>
                  current === group.repository ? null : group.repository,
                )
              }
            />
          ))}
        </div>
        {feed.groups.length > 6 && (
          <button
            type="button"
            className="show-all-projects"
            onClick={() => setShowAll((value) => !value)}
          >
            {showAll
              ? "Show selected repositories"
              : `Explore all ${feed.groups.length} repositories`}{" "}
            <span aria-hidden="true">↗</span>
          </button>
        )}
      </section>
    </>
  );
}
