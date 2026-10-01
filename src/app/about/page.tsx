import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Kavya Katal and the engineering work documented in this portfolio.",
};

export default function AboutPage() {
  return (
    <main id="main" className="simple-page page-width about-page">
      <Eyebrow accent="green">About</Eyebrow>
      <h1>
        Behind
        <br />
        <span>the work.</span>
      </h1>
      <p>
        I&apos;m Kavya Katal. My public work includes an autonomous coding
        harness, a collaborative engineering-diagram workspace, full-stack
        products, and contributions to Apache and cloud-native projects.
      </p>
      <p className="simple-secondary">
        The strongest proof lives in the repositories and pull requests. This
        portfolio connects each story to the source so you can inspect the work
        directly.
      </p>
      <div className="simple-line" />
      <div className="simple-bottom">
        <span>Build · Contribute · Explore</span>
        <div className="simple-links">
          <Link href="/projects">Projects ↗</Link>
          <Link href="/open-source">Open source ↗</Link>
        </div>
      </div>
    </main>
  );
}
