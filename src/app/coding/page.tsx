import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { LiveDataProvider, LiveStatus } from "@/components/live-data";
import {
  CodingMetricsStrip,
  PrimaryProfileCard,
  SecondaryProfileCard,
} from "@/components/coding-profile-cards";
import { brandIcons } from "@/content/brand-icons";
import { profiles } from "@/content/portfolio";
import { getOpenSourceFeed } from "@/lib/open-source-feed";

export const metadata: Metadata = {
  title: "Coding Profiles",
  description:
    "Verified public coding, problem-solving, and AI/data profiles for Kavya Katal.",
};
export const dynamic = "force-dynamic";

const featuredPlatforms = ["GitHub", "LeetCode", "Kaggle", "Codeforces"];
const featured = featuredPlatforms.map((name) =>
  profiles.find((profile) => profile.platform === name)!,
);
const otherProfiles = profiles.filter(
  (profile) => !featuredPlatforms.includes(profile.platform),
);
const heroPlatforms = [
  "LeetCode",
  "GitHub",
  "Kaggle",
  "HackerRank",
  "Codeforces",
];
const heroProfiles = heroPlatforms.map((name) =>
  profiles.find((profile) => profile.platform === name)!,
);

export default async function CodingPage() {
  const feed = await getOpenSourceFeed();
  const counts = new Map<string, number>();
  for (const group of feed.groups)
    for (const pull of group.pulls) {
      const day = pull.createdAt.slice(0, 10);
      counts.set(day, (counts.get(day) ?? 0) + 1);
    }
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const activity = Array.from({ length: 364 }, (_, index) => {
    const day = new Date(today);
    day.setUTCDate(day.getUTCDate() - 363 + index);
    const date = day.toISOString().slice(0, 10);
    return { date, count: counts.get(date) ?? 0 };
  });
  const totalActivity = activity.reduce((sum, day) => sum + day.count, 0);

  return (
    <LiveDataProvider>
      <main id="main" className="coding-page coding-showcase-page">
        <LiveStatus compact />
        <section className="image-hero coding-hero">
          <Image
            className="hero-image"
            src="/media/coding-desk-v2.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
          <div className="page-width image-hero-inner">
            <Eyebrow accent="blue">Coding profiles</Eyebrow>
            <h1>
              Code, solve,
              <br />
              <span>build, grow.</span>
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
          <div
            className="hero-proof proof-coding"
            aria-label="Public coding platforms"
          >
            {heroProfiles.map((profile) => (
              <a
                key={profile.platform}
                className={`hero-${profile.platform.toLowerCase()}`}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.platform === "Codeforces" ? (
                  <span className="codeforces-bars" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                ) : (
                  <Image
                    src={brandIcons[profile.platform]}
                    alt=""
                    width={27}
                    height={27}
                  />
                )}
                <span>
                  <strong>{profile.platform}</strong>
                  <small>{profile.category}</small>
                </span>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </section>
        <CodingMetricsStrip />
        <section
          id="profiles"
          className="page-width coding-showcase"
          aria-labelledby="profiles-title"
        >
          <div className="coding-showcase-head">
            <div>
              <h2 id="profiles-title">
                <i aria-hidden="true" />
                Primary Profiles
              </h2>
              <p>The platforms where I code, solve, learn, and contribute.</p>
            </div>
            <a href="#more-profiles">
              All profiles <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="profile-showcase-grid">
            {featured.map((profile, index) => (
              <PrimaryProfileCard
                key={profile.platform}
                profile={profile}
                index={index}
                pullActivity={
                  profile.platform === "GitHub"
                    ? activity.slice(-182)
                    : undefined
                }
              />
            ))}
          </div>
          <div
            className="coding-activity"
            aria-label={`${totalActivity} authored open-source pull requests in the last 52 weeks`}
          >
            <div className="activity-label">
              <Image src="/media/github.svg" alt="" width={30} height={30} />
              <span>
                <strong>Open-source PR activity</strong>
                <small>Authored PRs over the past year</small>
              </span>
            </div>
            <div
              className="activity-calendar"
              role="img"
              aria-label={`${totalActivity} authored open-source pull requests in the last 52 weeks`}
            >
              {activity.map((day) => (
                <i
                  key={day.date}
                  className={`level-${Math.min(day.count, 4)}`}
                  title={`${day.date}: ${day.count} authored PR${day.count === 1 ? "" : "s"}`}
                />
              ))}
            </div>
            <div className="activity-total">
              <strong>{totalActivity}</strong>
              <small>in the past year</small>
            </div>
          </div>
          <div id="more-profiles" className="coding-more-head">
            <Eyebrow accent="blue">More profiles</Eyebrow>
            <h2>Practice across platforms.</h2>
          </div>
          <div className="secondary-profile-grid">
            {otherProfiles.map((profile) => (
              <SecondaryProfileCard key={profile.platform} profile={profile} />
            ))}
          </div>
        </section>
      </main>
    </LiveDataProvider>
  );
}
