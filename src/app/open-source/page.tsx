import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { OpenSourceExplorer } from "@/components/open-source-explorer";
import { getOpenSourceFeed } from "@/lib/open-source-feed";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Kavya Katal's public pull requests across open-source repositories, with a live timeline and direct evidence links.",
};

export const dynamic = "force-dynamic";

export default async function OpenSourcePage() {
  const feed = await getOpenSourceFeed();
  const latest = feed.groups.slice(0, 3);
  return (
    <main id="main" className="source-page expansive-page">
      <span
        className="page-live-dot"
        role="status"
        aria-label={
          feed.live
            ? "Live pull request data"
            : "Verified public pull request data"
        }
        title={
          feed.live
            ? "Live pull request data"
            : "Verified public pull request data"
        }
      />
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
            Pull requests across developer infrastructure, product interfaces,
            and cloud-native systems — each linked to the work itself.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#contributions">Explore contributions</ButtonLink>
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
        <div
          className="hero-proof proof-source"
          aria-label="Recent public contributions"
        >
          {latest.map((group, index) => (
            <a
              key={group.repository}
              className={`floating-proof proof-${index + 1}`}
              href={group.pulls[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="proof-initial">
                {group.owner.slice(0, 1).toUpperCase()}
              </span>
              <span>
                <strong>{group.repository}</strong>
                <small>
                  PR #{group.pulls[0].number} ·{" "}
                  {group.pulls[0].status.toLowerCase()}
                </small>
              </span>
              <i />
            </a>
          ))}
        </div>
      </section>
      <OpenSourceExplorer initialFeed={feed} />
    </main>
  );
}
