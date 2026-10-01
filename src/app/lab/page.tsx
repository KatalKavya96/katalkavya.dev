import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Lab",
  description: "Machine-learning and engineering experiments from Kavya Katal.",
};

const labLinks = [
  {
    name: "Property Price Prediction",
    detail: "Ames Housing model pipeline and Streamlit interface",
    url: "https://github.com/KatalKavya96/Property_Price_Prediction",
  },
  {
    name: "Autonomous Systems Lab",
    detail: "Public experiment repository",
    url: "https://github.com/KatalKavya96/autonomous-systems-lab",
  },
  {
    name: "Apache Magpie Lab",
    detail: "Public exploration repository",
    url: "https://github.com/KatalKavya96/apache-magpie-lab",
  },
];

export default function LabPage() {
  return (
    <main id="main" className="simple-page page-width lab-page">
      <Eyebrow accent="blue">The lab</Eyebrow>
      <h1>
        Explore.
        <br />
        <span>Build. Learn.</span>
      </h1>
      <p>
        Smaller experiments have a place here alongside the larger systems.
        Follow the source to see what each repository contains.
      </p>
      <div className="simple-line" />
      <div className="simple-link-grid">
        {labLinks.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{item.name}</span>
            <small>{item.detail}</small>
            <b aria-hidden="true">↗</b>
          </a>
        ))}
      </div>
    </main>
  );
}
