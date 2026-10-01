export const projectDomains = [
  "Agentic AI",
  "AI / ML",
  "Developer tools",
  "Full stack",
  "Product",
  "Open source",
  "Experiment",
] as const;
export type ProjectDomain = (typeof projectDomains)[number];
