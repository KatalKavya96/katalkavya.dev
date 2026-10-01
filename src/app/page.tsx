import Link from "next/link";
import { ButtonLink, Eyebrow, ProjectCard } from "@/components/ui";
import { projects } from "@/content/portfolio";

export default function HomePage() {
  return (
    <main id="main" className="viewport-page home-page">
      <section className="home-hero page-width">
        <div className="home-copy">
          <Eyebrow accent="green">Kavya Katal / Engineering portfolio</Eyebrow>
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
            <span>01</span>
            <strong>CaramelAI</strong>
            <small>Autonomous coding harness</small>
          </div>
          <div className="sphere-chip chip-two">
            <span>02</span>
            <strong>Apache Magpie</strong>
            <small>Bitbucket bridge</small>
          </div>
          <div className="sphere-chip chip-three">
            <span>03</span>
            <strong>FrameLabs</strong>
            <small>Collaborative diagrams</small>
          </div>
        </div>
      </section>
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
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
