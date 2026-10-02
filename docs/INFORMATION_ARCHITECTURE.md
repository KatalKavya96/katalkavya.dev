# Information Architecture

## Primary routes

```text
/
/projects
/projects/[slug]
/open-source
/coding
/lab
/journey
/about
/contact
/resume (or downloadable resume action)
```

Only expose the most important routes in the primary navigation. `Contact` may be represented by the `Let's connect` CTA rather than a nav item.

## Home

Purpose: establish identity and send visitors toward strongest proof.

The page shows a compact hero and six selected public projects. The collection may continue below the desktop viewport; mobile stacks the cards.

## Projects

Purpose: curated work, filterable by domain.

The page shows a flagship project followed by all visible curated repositories. Domain filters use the URL query and the collection scrolls naturally.

## Project detail

Purpose: prove engineering depth.

Recommended modules:

1. Project hero + demo
2. Problem / context
3. What was built
4. Architecture
5. Interesting engineering decisions
6. Product/UI walkthrough
7. Metrics/evaluation where meaningful
8. Failures/iterations
9. Code/repository/evidence
10. Learnings

Not every project needs every module.

## Open Source

Purpose: show contribution quality and progression, not raw counts.

The page groups authored PRs by repository, shows six cards initially, and exposes additional repositories on demand. Each card opens a PR timeline; a ribbon lists verified organization owners.

## Coding Profiles

Purpose: show consistent coding/problem-solving practice without turning into a score board.

At the reference desktop viewport, the desk hero, four verified summary values, four primary profile cards, and authored PR activity ribbon form the first screen. Additional linked platform cards follow below. Mobile stacks the cards and keeps the same verified content readable.

## Lab

Purpose: smaller experiments and reconstructed concepts.

Categories:

- AI / ML
- Deep Learning
- Agentic AI
- Systems / Networking
- Developer Tooling
- Algorithms

## Journey

Purpose: chronological growth and accomplishments.
Use a narrative timeline, not a resume clone.

## About

Purpose: human context, working style, interests and current direction.
Keep concise.

# Current live collections

Home shows six curated GitHub projects; Projects shows the complete collection with URL-based domain filters. Open Source groups authored pull requests by repository and exposes a scrollable per-card history. Coding Profiles emphasizes four platforms with verified numeric data and keeps other supplied profiles as linked destinations. `/admin` is an unlisted, owner-only route for project curation and is never a primary navigation destination.
