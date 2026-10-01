import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { profiles } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Coding Profiles",
  description:
    "Verified public coding, problem-solving, and AI/data profiles for Kavya Katal.",
};

const featuredPlatforms = ["GitHub", "LeetCode", "Kaggle"];
const featured = featuredPlatforms.map((name) =>
  profiles.find((profile) => profile.platform === name)!,
);
const otherProfiles = profiles.filter(
  (profile) => !featuredPlatforms.includes(profile.platform),
);

export default function CodingPage() {
  return (
    <main id="main" className="viewport-page coding-page">
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
            Public code, problem-solving practice, and AI/data explorations
            across the platforms I use.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="https://github.com/KatalKavya96"
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub <span aria-hidden="true">↗</span>
            </a>
            <ButtonLink href="#profiles" secondary>
              Explore profiles
            </ButtonLink>
          </div>
        </div>
      </section>
      <section
        className="viewport-work page-width"
        id="profiles"
        aria-labelledby="profiles-title"
      >
        <div className="viewport-section-head">
          <div>
            <Eyebrow accent="blue">Public profiles</Eyebrow>
            <h2 id="profiles-title">Three kinds of practice.</h2>
          </div>
          <span className="section-meta">Metrics shown only when verified</span>
        </div>
        <div className="profile-grid">
          {featured.map((profile, index) => (
            <a
              key={profile.platform}
              className="profile-card"
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="profile-index">
                0{index + 1} / {profile.category}
              </span>
              <span className="profile-mark" aria-hidden="true">
                {profile.platform === "GitHub"
                  ? "GH"
                  : profile.platform === "LeetCode"
                    ? "LC"
                    : "K"}
              </span>
              <strong>{profile.platform}</strong>
              <span className="profile-handle">{profile.handle}</span>
              <p>{profile.description}</p>
              <span className="profile-visit">
                View profile <b aria-hidden="true">↗</b>
              </span>
            </a>
          ))}
        </div>
        <div className="profile-secondary">
          <span>More places to explore</span>
          <div>
            {otherProfiles.map((profile) => (
              <a
                key={profile.platform}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.platform} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
