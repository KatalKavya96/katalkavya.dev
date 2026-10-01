import type { Metadata } from "next";
import { ButtonLink, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "About Kavya Katal and this portfolio.",
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
        I&apos;m Kavya Katal. This space is taking shape around the projects,
        contributions, and questions that matter most to me.
      </p>
      <p className="simple-secondary">
        Once the content is confirmed, you&apos;ll find more about my
        background, working style, and what I&apos;m focused on here.
      </p>
      <div className="simple-line" />
      <div className="simple-bottom">
        <span>The next chapter is being written.</span>
        <ButtonLink href="/contact" secondary>
          Get in touch
        </ButtonLink>
      </div>
    </main>
  );
}
