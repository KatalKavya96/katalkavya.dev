import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Project } from "@/content/portfolio";
import { RepoPulse } from "@/components/live-data";

export function Eyebrow({
  children,
  accent = "violet",
}: {
  children: ReactNode;
  accent?: "violet" | "green" | "amber" | "blue";
}) {
  return (
    <div className={`eyebrow eyebrow-${accent}`}>
      <span aria-hidden="true" />
      {children}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        secondary ? "button button-secondary" : "button button-primary"
      }
    >
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  if (project.slug === "caramelai") {
    return (
      <div
        className="project-visual caramel-visual"
        aria-label="Dinner workflow illustration based on the repository documentation"
      >
        <div className="terminal-window">
          <div className="terminal-top">
            <span className="terminal-dots">● ● ●</span>
            <span>DINNER / AUTONOMOUS CODING HARNESS</span>
            <span>⌘</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-rail">
              <b>D</b>
              <span>01</span>
              <span>02</span>
              <span>03</span>
            </div>
            <div className="terminal-main">
              <div className="terminal-command">
                <span>~/dinner</span> run <i>--task</i> &quot;ship a safe
                patch&quot;
              </div>
              <div className="terminal-step">
                <span className="step-icon">✓</span>
                <div>
                  <strong>Isolate worktree</strong>
                  <small>Clean branch and bounded workspace</small>
                </div>
                <em>READY</em>
              </div>
              <div className="terminal-step">
                <span className="step-icon">✓</span>
                <div>
                  <strong>Run verification</strong>
                  <small>Tests, checks and repair checkpoints</small>
                </div>
                <em>PASS</em>
              </div>
              <div className="terminal-step">
                <span className="step-icon">↗</span>
                <div>
                  <strong>Export reviewable patch</strong>
                  <small>Evidence attached to the change</small>
                </div>
                <em>OUTPUT</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.slug === "framelabs") {
    return (
      <div
        className="project-visual framelabs-visual"
        aria-label="FrameLabs repository mark with an architecture diagram illustration"
      >
        <div className="diagram-grid" aria-hidden="true" />
        <div className="diagram-line line-a" aria-hidden="true" />
        <div className="diagram-line line-b" aria-hidden="true" />
        <span className="diagram-node node-a">API</span>
        <span className="diagram-node node-b">DATA</span>
        <span className="diagram-node node-c">UI</span>
        <div className="framelabs-logo">
          <Image
            src={project.media!.src}
            alt={project.media!.alt}
            width={80}
            height={84}
          />
          <strong>FrameLabs</strong>
          <small>Architecture, edited together</small>
        </div>
      </div>
    );
  }

  if (project.media) {
    return (
      <div className={`project-visual media-visual media-${project.slug}`}>
        <Image
          src={project.media.src}
          alt={project.media.alt}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          className="project-media-image"
          style={{ objectPosition: project.media.position ?? "center" }}
        />
        {project.mark && (
          <span className="project-media-mark">
            <Image src={project.mark} alt="" width={34} height={34} />
          </span>
        )}
        <span className="media-source">Project repository media</span>
      </div>
    );
  }

  return (
    <div className={`project-visual fallback-visual visual-${project.tone}`}>
      {project.mark && (
        <Image
          src={project.mark}
          alt={`${project.title} mark from the repository`}
          width={78}
          height={78}
        />
      )}
      <strong>{project.title}</strong>
      <small>{project.category}</small>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className="project-card real-project-card"
      href={project.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ProjectVisual project={project} />
      <div className="card-body">
        <div className="card-kicker">
          <span>
            {project.number} / {project.category}
          </span>
          <RepoPulse slug={project.slug} />
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <span className="card-bottom">
          <span>{project.tags.slice(0, 3).join(" · ")}</span>
          <span aria-hidden="true">↗</span>
        </span>
      </div>
    </a>
  );
}
