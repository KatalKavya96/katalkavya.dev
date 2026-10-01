import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Kavya Katal on LinkedIn or GitHub.",
};

export default function ContactPage() {
  return (
    <main id="main" className="simple-page page-width contact-page">
      <Eyebrow accent="violet">Contact</Eyebrow>
      <h1>
        Let&apos;s
        <br />
        <span>connect.</span>
      </h1>
      <p>
        For engineering, product, or open-source conversations, find me through
        these public profiles.
      </p>
      <div className="simple-line" />
      <div className="simple-bottom">
        <span>Choose the channel that works for you.</span>
        <div className="simple-links">
          <a
            href="https://www.linkedin.com/in/kavya-katal-64260a318"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/KatalKavya96"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </main>
  );
}
