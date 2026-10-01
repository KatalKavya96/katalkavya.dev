import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ButtonLink,
  Eyebrow,
  ProjectCard,
  ProjectVisual,
} from "@/components/ui";
import { projects } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected engineering projects by Kavya Katal, with links to public source and evidence.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ set?: string }>;
}) {
  const { set } = await searchParams;
  const showMore = set === "more";
  const flagship = projects[0];
  const shelfProjects = showMore ? projects.slice(4, 7) : projects.slice(1, 4);
  return (
    <main id="main" className="viewport-page projects-page">
      <section className="image-hero projects-hero">
        <Image
          className="hero-image"
          src="/media/projects-studio.webp"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="page-width image-hero-inner">
          <Eyebrow accent="amber">Projects</Eyebrow>
          <h1>
            Ideas into
            <br />
            <span>real systems.</span>
          </h1>
          <p>
            Agentic engineering, developer tools, and full-stack products — with
            public source and contribution evidence.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#project-work">Explore projects</ButtonLink>
            <ButtonLink href="/open-source" secondary>
              Open source work
            </ButtonLink>
          </div>
        </div>
      </section>
      <section
        className="viewport-work page-width"
        id="project-work"
        aria-labelledby="project-title"
      >
        <div className="viewport-section-head">
          <div>
            <Eyebrow accent="amber">Selected projects</Eyebrow>
            <h2 id="project-title">Built to be inspected.</h2>
          </div>
          <div className="shelf-switch" aria-label="Project selection">
            <Link
              href="/projects#project-work"
              aria-current={!showMore ? "page" : undefined}
              className={!showMore ? "active" : undefined}
            >
              Featured
            </Link>
            <Link
              href="/projects?set=more#project-work"
              aria-current={showMore ? "page" : undefined}
              className={showMore ? "active" : undefined}
            >
              More work
            </Link>
          </div>
        </div>
        <div className="feature-project">
          <div className="feature-copy">
            <span className="feature-index">
              Flagship / Agentic developer tools
            </span>
            <h3>{flagship.title}</h3>
            <p>{flagship.description}</p>
            <div className="feature-facts">
              {flagship.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a
              className="feature-link"
              href={flagship.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore repository <b aria-hidden="true">↗</b>
            </a>
          </div>
          <ProjectVisual project={flagship} />
        </div>
        <div className="project-grid project-mini-grid">
          {shelfProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Link className="project-more" href="/lab">
          More experiments and learning <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
