import type { Metadata } from "next";
import Image from "next/image";
import {
  ButtonLink,
  EmptyEditorial,
  Eyebrow,
  PreviewNotice,
  SectionHeading,
} from "@/components/ui";
import { isDesignPreview } from "@/content/site";

export const metadata: Metadata = {
  title: "Open Source",
  description: "Open source work and contribution stories from Kavya Katal.",
};

export default function OpenSourcePage() {
  return (
    <main id="main">
      <section className="image-hero source-hero">
        <Image
          className="hero-image"
          src="/media/open-source-ridge.webp"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="page-width image-hero-inner">
          <Eyebrow accent="green">Open source</Eyebrow>
          <h1>
            Building
            <br />
            <span>in public.</span>
          </h1>
          <p>
            Contributions are best understood through the problem, the review,
            and the change that landed.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#contributions">See the approach</ButtonLink>
            <ButtonLink href="/contact" secondary>
              Connect
            </ButtonLink>
          </div>
          {isDesignPreview && <PreviewNotice />}
        </div>
      </section>
      <section className="content-section page-width" id="contributions">
        <SectionHeading
          eyebrow="Contribution stories"
          title="Small changes. Real context."
          description="Featured contributions will link directly to their public pull requests and explain Kavya's exact role."
        />
        {isDesignPreview ? (
          <div className="contribution-preview">
            <div>
              <span className="contribution-number">01</span>
              <span className="sample-label">Design sample</span>
              <h3>Understand the system</h3>
              <p>
                Start with the surrounding project and the need the change
                addresses.
              </p>
            </div>
            <div>
              <span className="contribution-number">02</span>
              <span className="sample-label">Design sample</span>
              <h3>Make the change</h3>
              <p>
                Show the implementation, tests, and decisions visible in the
                pull request.
              </p>
            </div>
            <div>
              <span className="contribution-number">03</span>
              <span className="sample-label">Design sample</span>
              <h3>Trace the outcome</h3>
              <p>
                Link to review and merge evidence when those details are
                verified.
              </p>
            </div>
          </div>
        ) : (
          <EmptyEditorial
            title="Contributions are being verified."
            description="Specific repositories and pull requests will be published after confirmation."
          />
        )}
      </section>
      <section className="statement-section page-width">
        <div className="statement-index">Public work</div>
        <div>
          <p className="statement-copy">
            A pull request tells a richer story than a number ever could.
          </p>
          <p className="statement-sub">
            This section will favor a few meaningful examples over a wall of
            counts.
          </p>
        </div>
      </section>
    </main>
  );
}
