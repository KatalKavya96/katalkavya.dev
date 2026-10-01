import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Kavya Katal.",
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
        Contact information and verified profile links will appear here once
        provided by Kavya.
      </p>
      <div className="simple-line" />
      <div className="simple-bottom">
        <span>Open to a good conversation.</span>
      </div>
    </main>
  );
}
