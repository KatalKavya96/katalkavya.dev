export type SampleProject = {
  number: string;
  title: string;
  category: string;
  description: string;
  tone: "violet" | "amber" | "blue";
  visual: "system" | "product" | "research";
};

/** Layout samples only. They render in development and are excluded from production. */
export const sampleProjects: SampleProject[] = [
  {
    number: "01",
    title: "A flagship system",
    category: "Featured case study",
    description:
      "A place for the problem, the build, and the engineering decisions behind it.",
    tone: "violet",
    visual: "system",
  },
  {
    number: "02",
    title: "A shipped product",
    category: "Product engineering",
    description:
      "A product story told through its interface, trade-offs, and real outcome.",
    tone: "amber",
    visual: "product",
  },
  {
    number: "03",
    title: "An open contribution",
    category: "Open source",
    description:
      "A contribution connected to its pull request and the system it improved.",
    tone: "blue",
    visual: "research",
  },
];

export const isDesignPreview = process.env.NODE_ENV !== "production";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Open Source", href: "/open-source" },
  { label: "Coding", href: "/coding" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
] as const;
