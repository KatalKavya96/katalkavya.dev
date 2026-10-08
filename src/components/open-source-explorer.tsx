"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const seen = new Set<string>();
  const organizations = feed.organizations.filter((organization) => {
    const login = organization.login.toLowerCase();
    if (seen.has(login)) return false;
    seen.add(login);
    return true;
  });
  const windowRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const direction = useRef<1 | -1>(1);
  const [canBack, setCanBack] = useState(false);
  const [canForward, setCanForward] = useState(false);

  const move = (step: -1 | 1) => {
    const windowElement = windowRef.current;
    if (!windowElement) return;
    const item = windowElement.querySelector<HTMLElement>(".ribbon-track a");
    const track = windowElement.querySelector<HTMLElement>(".ribbon-track");
    const gap = track
      ? Number.parseFloat(getComputedStyle(track).columnGap) || 0
      : 0;
    windowElement.scrollBy({
      left: step * ((item?.offsetWidth ?? 150) + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  useEffect(() => {
    const windowElement = windowRef.current;
    if (!windowElement) return;
    const trackElement =
      windowElement.querySelector<HTMLElement>(".ribbon-track");
    const updateControls = () => {
      const end = windowElement.scrollWidth - windowElement.clientWidth;
      setCanBack(windowElement.scrollLeft > 3);
      setCanForward(windowElement.scrollLeft < end - 3);
    };
    const observer = new ResizeObserver(updateControls);
    observer.observe(windowElement);
    if (trackElement) observer.observe(trackElement);
    windowElement.addEventListener("scroll", updateControls, { passive: true });
    updateControls();
    const timer = window.setInterval(() => {
      if (
        paused.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const end = windowElement.scrollWidth - windowElement.clientWidth;
      if (end < 8) return;
      if (windowElement.scrollLeft >= end - 3) direction.current = -1;
      if (windowElement.scrollLeft <= 3) direction.current = 1;
      const item = windowElement.querySelector<HTMLElement>(".ribbon-track a");
      const gap = trackElement
        ? Number.parseFloat(getComputedStyle(trackElement).columnGap) || 0
        : 0;
      windowElement.scrollBy({
        left: direction.current * ((item?.offsetWidth ?? 150) + gap),
        behavior: "smooth",
      });
    }, 5200);
    return () => {
      observer.disconnect();
      windowElement.removeEventListener("scroll", updateControls);
      window.clearInterval(timer);
    };
  }, [organizations.length]);

  if (!organizations.length) return null;
  return (
    <section
      className="organization-ribbon"
      aria-labelledby="organizations-title"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
      onFocusCapture={() => {
        paused.current = true;
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          paused.current = false;
      }}
    >
      <div className="page-width ribbon-inner">
        <div className="ribbon-heading">
          <div>
            <span>PUBLIC WORK</span>
            <h2 id="organizations-title">
              Organizations I&apos;ve contributed to
            </h2>
          </div>
          <div
            className="ribbon-controls"
            aria-label="Organization carousel controls"
          >
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={!canBack}
              aria-label="Previous organizations"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={!canForward}
              aria-label="More organizations"
            >
              →
            </button>
          </div>
        </div>
        <div className="ribbon-window" ref={windowRef}>
          <div className="ribbon-track">
            {organizations.map((organization) => (
              <a
                key={organization.login.toLowerCase()}
                href={organization.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ribbon-logo">
                  <Image
                    src={organization.avatarUrl}
                    alt=""
                    width={45}
                    height={45}
                    unoptimized
                  />
                </span>
                <span>{organization.login}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PullCard({
  group,
  index,
  avatarUrl,
  active,
  pinned,
  onHover,
  onLeave,
  onToggle,
}: {
  group: PullGroup;
  index: number;
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
      onClick={(event) => {
        if (!(event.target instanceof Element)) return;
        if (event.target.closest("a, button")) return;
        onToggle();
      }}
    >
      <button
        type="button"
        className="pull-card-toggle"
        onClick={onToggle}
        onFocus={onHover}
        aria-expanded={active}
        aria-label={`${repoName}: ${pinned ? "unpin" : "pin"} pull request timeline`}
      >
        <span className="pull-card-index">
          {String(index + 1).padStart(2, "0")} / PUBLIC CONTRIBUTION
        </span>
        <span className="pull-card-top">
          <span className="pull-project-identity">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt=""
                width={44}
                height={44}
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
          {groups.map((group, index) => (
            <PullCard
              key={group.repository}
              group={group}
              index={index}
              avatarUrl={organizations.get(group.owner)}
              active={
                hovered === group.repository || pinned === group.repository
              }
              pinned={pinned === group.repository}
              onHover={() => setHovered(group.repository)}
              onLeave={() => setHovered(null)}
              onToggle={() => {
                setHovered(null);
                setPinned((current) =>
                  current === group.repository ? null : group.repository,
                );
              }}
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
