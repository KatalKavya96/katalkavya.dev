import type { Metadata } from "next";
import Image from "next/image";
import {
  ButtonLink,
  EmptyEditorial,
  Eyebrow,
  PreviewNotice,
  ProjectVisual,
  SampleCard,
  SectionHeading,
} from "@/components/ui";
import { isDesignPreview, sampleProjects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected project stories and case studies from Kavya Katal.",
};

export default function ProjectsPage() {
  const flagship = sampleProjects[0];
  return (
    <main id="main">
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
            Selected work, presented through the problems, decisions, and
            details that shaped it.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#work">Explore projects</ButtonLink>
            <ButtonLink href="/contact" secondary>
              Start a conversation
            </ButtonLink>
          </div>
          {isDesignPreview && <PreviewNotice />}
        </div>
      </section>
      <section className="content-section page-width" id="work">
        <SectionHeading
          eyebrow="The work"
          title="A closer look at what gets built."
          description="The final collection will be curated around substantive work, with direct links to demos and source where available."
        />
        {isDesignPreview ? (
          <>
            <div className="feature-project">
              <div className="feature-copy">
                <span className="feature-index">
                  01 / Featured case study <i>Design sample</i>
                </span>
                <h3>{flagship.title}</h3>
                <p>{flagship.description}</p>
                <div className="feature-facts">
                  <span>Problem</span>
                  <span>System</span>
                  <span>Decisions</span>
                  <span>Evidence</span>
                </div>
                <span className="feature-link">
                  Case study layout <b>↗</b>
                </span>
              </div>
              <ProjectVisual project={flagship} />
            </div>
            <div className="project-grid lower-grid">
              {sampleProjects.slice(1).map((project) => (
                <SampleCard key={project.number} project={project} />
              ))}
            </div>
          </>
        ) : (
          <EmptyEditorial
            title="Project case studies are being prepared."
            description="No demo project names or outcomes are published as facts."
          />
        )}
      </section>
      <section className="process-section page-width">
        <SectionHeading
          eyebrow="How stories unfold"
          title="From context to evidence."
        />
        <div className="process-grid">
          <div>
            <span>01</span>
            <h3>Context</h3>
            <p>What problem was worth solving?</p>
          </div>
          <div>
            <span>02</span>
            <h3>Decisions</h3>
            <p>Which trade-offs shaped the build?</p>
          </div>
          <div>
            <span>03</span>
            <h3>System</h3>
            <p>How do the important pieces fit?</p>
          </div>
          <div>
            <span>04</span>
            <h3>Proof</h3>
            <p>What can a visitor inspect?</p>
          </div>
        </div>
      </section>
    </main>
  );
}
