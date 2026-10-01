import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ButtonLink,
  Eyebrow,
  ProjectCard,
  ProjectVisual,
} from "@/components/ui";
import {
  LiveDataProvider,
  LiveStatus,
  RepoPulse,
} from "@/components/live-data";
import { getCuratedProjects } from "@/lib/curation";
import { projectDomains } from "@/content/domains";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering projects by Kavya Katal, curated from GitHub with live repository metadata and direct evidence links.",
};
export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ domain?: string }>;
}) {
  const { domain } = await searchParams;
  const selectedDomain = projectDomains.find((item) => item === domain);
  const allProjects = await getCuratedProjects();
  const visible = selectedDomain
    ? allProjects.filter((project) =>
        project.category.split(" · ").includes(selectedDomain),
      )
    : allProjects;
  const flagship = visible[0];
  return (
    <LiveDataProvider>
      <main id="main" className="projects-page expansive-page">
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
              Agentic engineering, developer tools, and full-stack products —
              with public source and contribution evidence.
            </p>
            <div className="hero-actions">
              <ButtonLink href="#project-work">Explore projects</ButtonLink>
              <ButtonLink href="/open-source" secondary>
                Open source work
              </ButtonLink>
            </div>
            <LiveStatus compact />
          </div>
        </section>
        <section
          className="page-width curated-projects"
          id="project-work"
          aria-labelledby="project-title"
        >
          <div className="curated-projects-head">
            <div>
              <Eyebrow accent="amber">Selected projects</Eyebrow>
              <h2 id="project-title">Built to be inspected.</h2>
            </div>
            <span>{visible.length} public repositories</span>
          </div>
          <nav
            className="domain-filters"
            aria-label="Filter projects by domain"
          >
            <Link
              className={!selectedDomain ? "active" : ""}
              href="/projects#project-work"
              aria-current={!selectedDomain ? "page" : undefined}
            >
              All
            </Link>
            {projectDomains.map((item) => (
              <Link
                key={item}
                className={selectedDomain === item ? "active" : ""}
                href={`/projects?domain=${encodeURIComponent(item)}#project-work`}
                aria-current={selectedDomain === item ? "page" : undefined}
              >
                {item}
              </Link>
            ))}
          </nav>
          {flagship ? (
            <>
              <div className="feature-project curated-flagship">
                <div className="feature-copy">
                  <span className="feature-index">
                    Featured / {flagship.category}
                  </span>
                  <h3>{flagship.title}</h3>
                  <p>{flagship.description}</p>
                  <RepoPulse slug={flagship.slug} />
                  <div className="feature-facts">
                    {flagship.tags.slice(0, 4).map((tag) => (
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
              <div className="project-grid project-full-grid">
                {visible.slice(1).map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </>
          ) : (
            <div className="empty-project-filter">
              No projects are assigned to this domain yet.{" "}
              <Link href="/projects#project-work">View all projects</Link>
            </div>
          )}
          <Link className="project-more" href="/lab">
            Explore smaller experiments <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
    </LiveDataProvider>
  );
}
