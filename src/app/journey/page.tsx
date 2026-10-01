import type { Metadata } from "next";
import { ButtonLink, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Journey",
  description: "The learning and building journey of Kavya Katal.",
};
export default function JourneyPage() {
  return (
    <main id="main" className="simple-page page-width">
      <Eyebrow accent="amber">Journey</Eyebrow>
      <h1>
        Built over
        <br />
        <span>time.</span>
      </h1>
      <p>
        A narrative of the experiences, turning points, and lessons that shaped
        the work. Dates and milestones will be added after verification.
      </p>
      <div className="simple-line" />
      <div className="simple-bottom">
        <span>Learning is an ongoing project.</span>
        <ButtonLink href="/about" secondary>
          About Kavya
        </ButtonLink>
      </div>
    </main>
  );
}
