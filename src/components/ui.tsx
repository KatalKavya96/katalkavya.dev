import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/content/portfolio";

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

export function ProjectVisual({
  project,
}: {
  project: Pick<Project, "tone" | "visual" | "number">;
}) {
  return (
    <div
      className={`project-visual visual-${project.tone} visual-${project.visual}`}
      aria-hidden="true"
    >
      <div className="visual-glow" />
      <div className="visual-window">
        <div className="visual-top">
          <i />
          <i />
          <i />
          <span>visual concept / {project.number}</span>
        </div>
        <div className="visual-content">
          <div className="visual-rail">
            <b />
            <b />
            <b />
            <b />
          </div>
          <div className="visual-lines">
            <em />
            <em />
            <em />
            <em />
            <em />
          </div>
          <div className="visual-panel">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
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
