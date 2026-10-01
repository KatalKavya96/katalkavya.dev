import Link from "next/link";
import type { ReactNode } from "react";
import type { SampleProject } from "@/content/site";

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

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && (
        <Link className="text-link" href={action.href}>
          {action.label}
          <span aria-hidden="true">↗</span>
        </Link>
      )}
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

export function PreviewNotice() {
  return (
    <div className="preview-notice" role="note">
      <span className="preview-dot" /> Design preview{" "}
      <span className="preview-divider">/</span> Sample cards are layout
      examples; real content comes after your review.
    </div>
  );
}

export function ProjectVisual({ project }: { project: SampleProject }) {
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
          <span>preview / {project.number}</span>
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

export function SampleCard({ project }: { project: SampleProject }) {
  return (
    <article className="project-card">
      <ProjectVisual project={project} />
      <div className="card-body">
        <div className="card-kicker">
          <span>
            {project.number} / {project.category}
          </span>
          <span className="sample-label">Design sample</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <span className="card-bottom">
          Case study structure <span aria-hidden="true">↗</span>
        </span>
      </div>
    </article>
  );
}

export function EmptyEditorial({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="empty-editorial">
      <span className="empty-line" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
