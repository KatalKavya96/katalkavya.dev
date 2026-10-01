# Codex Prompt — Update an Existing Page

Use this for future page refinements.

---

Update the requested portfolio page without drifting from the repository design/product contract.

First read `AGENTS.md`, the matching `docs/PAGE_SPEC_*.md`, `docs/DESIGN_SYSTEM.md`, `docs/COMPONENT_SYSTEM.md`, `docs/MOTION_INTERACTION.md`, and inspect the current implementation plus matching reference image.

Before coding, tell me:

- what currently exists,
- what you will change,
- what you will deliberately preserve,
- whether the change affects responsive behavior, content/data or shared components.

Then implement the smallest coherent change.

Non-negotiables:

- keep layouts spacious,
- remove irrelevant information instead of compressing it,
- never invent data,
- do not reuse another page's hero motif,
- preserve accessibility/reduced motion,
- do not add dependencies for trivial visual effects,
- update docs if the intended behavior changes,
- update `CHANGELOG.md` for meaningful visible changes.

After implementation run the standard validation commands and summarize the result.
