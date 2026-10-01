import type { Metadata } from "next";
import { ButtonLink, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experiments and learning notes from Kavya Katal.",
};
export default function LabPage() {
  return (
    <main id="main" className="simple-page page-width">
      <Eyebrow accent="blue">The lab</Eyebrow>
      <h1>
        A place to
        <br />
        <span>try things out.</span>
      </h1>
      <p>
        Smaller experiments will live here when their purpose, code, and
        learnings are ready to share.
      </p>
      <div className="simple-line" />
      <div className="simple-bottom">
        <span>Ideas → experiments → understanding</span>
        <ButtonLink href="/projects" secondary>
          See the work
        </ButtonLink>
      </div>
    </main>
  );
}
