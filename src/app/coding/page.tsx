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
  title: "Coding Profiles",
  description: "Coding practice and public profiles from Kavya Katal.",
};

export default function CodingPage() {
  return (
    <main id="main">
      <section className="image-hero coding-hero">
        <Image
          className="hero-image"
          src="/media/coding-desk.webp"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="page-width image-hero-inner">
          <Eyebrow accent="blue">Coding profiles</Eyebrow>
          <h1>
            Code. Solve.
            <br />
            <span>Keep learning.</span>
          </h1>
          <p>
            A home for public coding work, selected practice, and the projects
            that put those skills to use.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#profiles">Explore profiles</ButtonLink>
            <ButtonLink href="/about" secondary>
              About me
            </ButtonLink>
          </div>
          {isDesignPreview && <PreviewNotice />}
        </div>
      </section>
      <section className="content-section page-width" id="profiles">
        <SectionHeading
          eyebrow="Profiles"
          title="Practice with a purpose."
          description="Profiles and activity will appear here only with your confirmed handles, links, and current data."
        />
        {isDesignPreview ? (
          <div className="profile-preview">
            <div>
              <span>01 / Code</span>
              <h3>Public repositories</h3>
              <p>
                Projects, implementation choices, and a trail of work visitors
                can inspect.
              </p>
              <b>Design sample</b>
            </div>
            <div>
              <span>02 / Solve</span>
              <h3>Problem solving</h3>
              <p>
                Consistent practice, presented without unverified scores or
                competitive claims.
              </p>
              <b>Design sample</b>
            </div>
            <div>
              <span>03 / Learn</span>
              <h3>Exploration</h3>
              <p>
                Experiments that connect new concepts to things built by hand.
              </p>
              <b>Design sample</b>
            </div>
          </div>
        ) : (
          <EmptyEditorial
            title="Profiles are awaiting verification."
            description="Handles and activity metrics will appear after they are confirmed."
          />
        )}
      </section>
    </main>
  );
}
