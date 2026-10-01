import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, Eyebrow } from "@/components/ui";
import {
  LiveDataProvider,
  LiveStatus,
  GitHubLiveMetrics,
  CodeforcesLiveMetrics,
  LeetCodeLiveMetrics,
  KaggleLiveMetrics,
} from "@/components/live-data";
import { profiles } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Coding Profiles",
  description:
    "Verified public coding, problem-solving, and AI/data profiles for Kavya Katal.",
};

const featuredPlatforms = ["GitHub", "LeetCode", "Codeforces", "Kaggle"];
const featured = featuredPlatforms.map((name) =>
  profiles.find((profile) => profile.platform === name)!,
);
const otherProfiles = profiles.filter(
  (profile) => !featuredPlatforms.includes(profile.platform),
);
const brandIcons: Record<string, string> = {
  GitHub: "/media/github.svg",
  LeetCode: "/media/leetcode.svg",
  Codeforces: "/media/codeforces.svg",
  Kaggle: "/media/kaggle.svg",
};

export default function CodingPage() {
  return (
    <LiveDataProvider>
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
            <LiveStatus compact />
          </div>
          <div
            className="hero-proof proof-coding"
            aria-label="Public coding platforms"
          >
            {featured.map((profile) => (
              <a
                key={profile.platform}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={brandIcons[profile.platform]}
                  alt=""
                  width={27}
                  height={27}
                />
                <span>
                  <strong>{profile.platform}</strong>
                  <small>{profile.category}</small>
                </span>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </section>
        <div className="coding-proof-strip">
          <div className="page-width coding-proof-inner">
            <span>
              <Image src="/media/github.svg" alt="" width={19} height={19} />
              <strong>GitHub</strong>
              <GitHubLiveMetrics />
            </span>
            <span>
              <Image
                src="/media/codeforces.svg"
                alt=""
                width={19}
                height={19}
              />
              <strong>Codeforces</strong>
              <CodeforcesLiveMetrics />
            </span>
            <span>
              <strong>{profiles.length}</strong>
              <small>Linked public platforms</small>
            </span>
          </div>
        </div>
        <section
          className="viewport-work page-width"
          id="profiles"
          aria-labelledby="profiles-title"
        >
          <div className="viewport-section-head">
            <div>
              <Eyebrow accent="blue">Public profiles</Eyebrow>
              <h2 id="profiles-title">Public work, across platforms.</h2>
            </div>
            <span className="section-meta">
              Live metrics where official APIs are available
            </span>
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
                  <Image
                    src={brandIcons[profile.platform]}
                    alt=""
                    width={26}
                    height={26}
                  />
                </span>
                <strong>{profile.platform}</strong>
                <span className="profile-handle">{profile.handle}</span>
                <span className="profile-data-panel">
                  {profile.platform === "GitHub" ? (
                    <GitHubLiveMetrics />
                  ) : profile.platform === "Codeforces" ? (
                    <CodeforcesLiveMetrics />
                  ) : profile.platform === "LeetCode" ? (
                    <LeetCodeLiveMetrics />
                  ) : (
                    <KaggleLiveMetrics />
                  )}
                </span>
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
    </LiveDataProvider>
  );
}
