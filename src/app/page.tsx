import Link from "next/link";
import {
  ButtonLink,
  EmptyEditorial,
  Eyebrow,
  PreviewNotice,
  SampleCard,
  SectionHeading,
} from "@/components/ui";
import { isDesignPreview, sampleProjects } from "@/content/site";

export default function HomePage() {
  return (
    <main id="main">
      <section className="home-hero page-width">
        <div className="home-copy">
          <Eyebrow accent="green">Portfolio / Kavya Katal</Eyebrow>
          <h1>
            Kavya
            <br />
            <span>Katal.</span>
          </h1>
          <p className="hero-lead">
            Curious about how ideas become useful, well-built systems.
          </p>
          <p className="hero-support">
            A space for selected work, the decisions behind it, and what
            I&apos;m learning along the way.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/projects">Explore my work</ButtonLink>
            <ButtonLink href="/about" secondary>
              More about me
            </ButtonLink>
          </div>
          {isDesignPreview && <PreviewNotice />}
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
          {isDesignPreview && (
            <>
              <div className="sphere-chip chip-one">
                <span>01</span>
                <strong>Build</strong>
                <small>Selected projects</small>
              </div>
              <div className="sphere-chip chip-two">
                <span>02</span>
                <strong>Contribute</strong>
                <small>Open source</small>
              </div>
              <div className="sphere-chip chip-three">
                <span>03</span>
                <strong>Explore</strong>
                <small>Learning lab</small>
              </div>
            </>
          )}
        </div>
      </section>
      <div className="capability-bar">
        <div className="page-width capability-inner">
          <span>Ways to explore</span>
          <Link href="/projects">
            Build <b>↗</b>
          </Link>
          <Link href="/open-source">
            Contribute <b>↗</b>
          </Link>
          <Link href="/lab">
            Experiment <b>↗</b>
          </Link>
          <Link href="/coding">
            Practice <b>↗</b>
          </Link>
        </div>
      </div>
      <section className="content-section page-width" id="selected-work">
        <SectionHeading
          eyebrow="Selected work"
          title="The work, and the thinking behind it."
          description="Each project will lead with a clear problem, a considered solution, and evidence you can inspect."
          action={{ label: "All projects", href: "/projects" }}
        />
        {isDesignPreview ? (
          <div className="project-grid">
            {sampleProjects.map((project) => (
              <SampleCard key={project.number} project={project} />
            ))}
          </div>
        ) : (
          <EmptyEditorial
            title="Selected work is being curated."
            description="Verified case studies and project links will appear here once supplied."
          />
        )}
      </section>
      <section className="statement-section page-width">
        <div className="statement-index">01 — Approach</div>
        <div>
          <p className="statement-copy">
            Good work is easier to understand when the <em>reasoning</em> is
            visible.
          </p>
          <p className="statement-sub">
            This portfolio is structured to show the context, choices, and proof
            behind each piece of work.
          </p>
        </div>
      </section>
      <section className="next-section page-width">
        <Eyebrow accent="blue">Continue exploring</Eyebrow>
        <h2>Follow the thread.</h2>
        <div className="next-grid">
          <Link href="/open-source">
            <span>01 / Public work</span>
            <strong>Open source</strong>
            <b>↗</b>
          </Link>
          <Link href="/lab">
            <span>02 / In progress</span>
            <strong>The lab</strong>
            <b>↗</b>
          </Link>
          <Link href="/about">
            <span>03 / The person</span>
            <strong>About Kavya</strong>
            <b>↗</b>
          </Link>
        </div>
      </section>
      <section className="final-cta page-width">
        <span>Have something in mind?</span>
        <h2>
          Let&apos;s make
          <br />
          something matter.
        </h2>
        <ButtonLink href="/contact">Get in touch</ButtonLink>
      </section>
    </main>
  );
}
