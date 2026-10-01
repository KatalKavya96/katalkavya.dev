import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { contributions, githubSnapshot } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Selected public pull requests by Kavya Katal across open-source systems.",
};

export default function OpenSourcePage() {
  return (
    <main id="main" className="viewport-page source-page">
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
            Contributions across developer infrastructure, product UI, and
            cloud-native systems — with the pull requests to inspect.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#contributions">View contributions</ButtonLink>
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
      </section>
      <section
        className="viewport-work page-width"
        id="contributions"
        aria-labelledby="contributions-title"
      >
        <div className="viewport-section-head">
          <div>
            <Eyebrow accent="green">Featured contributions</Eyebrow>
            <h2 id="contributions-title">A trail of real changes.</h2>
          </div>
          <a
            className="source-metric"
            href={githubSnapshot.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>{githubSnapshot.mergedPullRequests}</strong>
            <span>
              merged PRs <small>Verified {githubSnapshot.lastVerified}</small>
            </span>
          </a>
        </div>
        <div className="contribution-grid">
          {contributions.map((item, index) => (
            <a
              className="contribution-card"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              key={item.url}
            >
              <span className="contribution-top">
                <span>
                  0{index + 1} / {item.organization}
                </span>
                <b>{item.status}</b>
              </span>
              <span className="contribution-middle">
                <small>{item.domain}</small>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </span>
              <span className="contribution-bottom">
                View pull request <b aria-hidden="true">↗</b>
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
