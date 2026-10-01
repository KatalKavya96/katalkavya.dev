import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Journey",
  description: "Selected public milestones in Kavya Katal's engineering work.",
};

const milestones = [
  {
    date: "2025",
    title: "Apache Airflow",
    detail: "XComs page controls merged",
    url: "https://github.com/apache/airflow/pull/56083",
  },
  {
    date: "2025",
    title: "Meshery",
    detail: "Spring Cloud architecture design merged",
    url: "https://github.com/meshery/meshery/pull/16294",
  },
  {
    date: "2026",
    title: "Apache Magpie",
    detail: "Initial Bitbucket bridge merged",
    url: "https://github.com/apache/magpie/pull/739",
  },
];

export default function JourneyPage() {
  return (
    <main id="main" className="simple-page page-width journey-page">
      <Eyebrow accent="amber">Journey</Eyebrow>
      <h1>
        Built over
        <br />
        <span>time.</span>
      </h1>
      <p>
        Selected public milestones, each linked to the contribution that
        documents it.
      </p>
      <div className="simple-line" />
      <div className="simple-link-grid">
        {milestones.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              {item.date} / {item.title}
            </span>
            <small>{item.detail}</small>
            <b aria-hidden="true">↗</b>
          </a>
        ))}
      </div>
    </main>
  );
}
