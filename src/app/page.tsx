import Link from "next/link";
import Image from "next/image";
import { ButtonLink, Eyebrow, ProjectCard } from "@/components/ui";
import { LiveDataProvider, LiveStatus } from "@/components/live-data";
import { getCuratedProjects } from "@/lib/curation";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = await getCuratedProjects();
  return (
    <LiveDataProvider>
      <main id="main" className="viewport-page home-page">
        <section className="home-hero page-width">
          <div className="home-copy">
            {projects[0] && (
              <a
                className="hero-status-pill"
                href={projects[0].sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="status-dot" /> <b>Flagship work</b>
                <span>{projects[0].title}</span>
                <i aria-hidden="true">↗</i>
              </a>
            )}
            <Eyebrow accent="green">
              Kavya Katal / Engineering portfolio
            </Eyebrow>
            <h1>
              Kavya
              <br />
              <span>Katal.</span>
            </h1>
            <p className="hero-lead">
              Engineering tools, AI systems, and products built to work.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/projects">View my work</ButtonLink>
              <a
                className="button button-secondary"
                href="https://github.com/KatalKavya96"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
            <LiveStatus compact />
          </div>
          <div className="sphere-scene" aria-hidden="true">
            <div className="sphere-halo" />
            <div className="sphere-orbit orbit-one" />
            <div className="sphere-orbit orbit-two" />
            <div className="sphere-orbit orbit-three" />
            <div className="sphere" />
            <span className="orbit-point point-one" />
            <span className="orbit-point point-two" />
            <span className="orbit-point point-three" />
            <div className="sphere-chip chip-one">
              <span className="chip-symbol">D</span>
              <strong>CaramelAI</strong>
              <small>Autonomous coding harness</small>
            </div>
            <div className="sphere-chip chip-two">
              <span className="chip-symbol chip-image">
                <Image
                  src="/media/apache-avatar.png"
                  alt=""
                  width={25}
                  height={25}
                />
              </span>
              <strong>Apache Magpie</strong>
              <small>Bitbucket bridge</small>
            </div>
            <div className="sphere-chip chip-three">
              <span className="chip-symbol chip-image">
                <Image
                  src="/media/framelabs-hero.webp"
                  alt=""
                  width={25}
                  height={25}
                />
              </span>
              <strong>FrameLabs</strong>
              <small>Collaborative diagrams</small>
            </div>
          </div>
        </section>
        <div className="capability-strip">
          <div className="page-width capability-strip-inner">
            <span>
              AI systems <small>Autonomous workflows</small>
            </span>
            <span>
              Developer tools <small>Diagrams and agents</small>
            </span>
            <span>
              Open source <small>Merged public work</small>
            </span>
            <span>
              Product engineering <small>Shipped interfaces</small>
            </span>
          </div>
        </div>
        <section
          className="viewport-work page-width"
          aria-labelledby="selected-title"
        >
          <div className="viewport-section-head">
            <div>
              <Eyebrow accent="green">Selected work</Eyebrow>
              <h2 id="selected-title">From ideas to working systems.</h2>
            </div>
            <Link href="/projects">
              All projects <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="project-grid">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </main>
    </LiveDataProvider>
  );
}
