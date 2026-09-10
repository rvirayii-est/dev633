# deV633

deV633 is my personal developer site and engineering knowledge hub: the systems I
build, and the technical notes I keep while building them.

It is a static site. Every page is rendered at build time and served as plain HTML.
There is no backend, no database, and no CMS. The Git repository **is** the publishing
system.

```text
Write Markdown  →  commit  →  push to GitHub  →  Cloudflare Pages build  →  live site
```

## Technology stack

| Layer | Choice |
| --- | --- |
| Framework | Astro 7, static output |
| Language | TypeScript (strict) |
| Content | Markdown / MDX via Astro content collections |
| Schema validation | Zod |
| Styling | Hand-written CSS with custom properties |
| Fonts | Geist Sans and JetBrains Mono, self-hosted via Fontsource |
| Hosting | Cloudflare Pages |

Client-side JavaScript is limited to the theme toggle, the mobile menu, and the
article table-of-contents default state.

## Setup

Requires Node 20 or newer (Node 22 LTS recommended).

```bash
npm install
```

## Local development

```bash
npm run dev       # dev server on http://localhost:4321
npm run build     # production build into dist/
npm run preview   # serve the built site locally
npm run check     # astro check: TypeScript and template diagnostics
```

## Repository structure

```text
astro.config.mjs          Astro configuration, integrations, Shiki themes
src/
  content.config.ts       Collection definitions and frontmatter schemas
  content/
    learnings/            Technical notes, one Markdown file per entry
    projects/             Project case studies, one Markdown file per project
  components/             Reusable UI pieces (header, cards, icons, archive)
  layouts/BaseLayout.astro  Page shell: head, header, main, footer
  pages/                  Routes; file path maps to URL
  data/site.ts            Site constants, navigation, tech stack lists
  styles/global.css       Design tokens and shared component classes
  utils/content.ts        Collection queries, date and reading-time helpers
public/                   Static assets served as-is (favicon, robots.txt, OG image)
docs/                     Architecture, content, design and deployment docs
specs/                    Original design reference (not part of the build)
```

## Adding a learning post

Create a Markdown file in `src/content/learnings/`. The file name becomes the URL,
so `spring-boot-dependency-injection.md` is served at
`/learnings/spring-boot-dependency-injection`.

```markdown
---
title: 'Getting Started with Spring Boot'
description: 'One or two sentences, used in listings, search results, and RSS.'
published: 2026-09-11
updated: 2026-09-20      # optional
category: Backend        # Backend | Frontend | Database | DevOps | Architecture | Security | IoT | General
tags: ['Spring Boot', 'Java']
draft: false             # true hides it from production builds
---

Body content in Markdown.
```

Commit and push. Cloudflare Pages rebuilds and the entry appears in the archive, in
its category page, on the home page if it is among the three newest, and in the RSS
feed.

Categories are validated against the list in `src/data/site.ts`. An unknown category
fails the build rather than rendering a broken page.

## Adding a project

Create a Markdown file in `src/content/projects/`. The body is the case study.

```markdown
---
name: 'TelemetryPulse'
description: 'One sentence shown on the project cards.'
status: 'Active'         # Active | Production | Open Source | Experiment | Archived
technologies: ['Spring Boot', 'PostgreSQL', 'Docker']
github: 'https://github.com/you/repo'      # optional
website: 'https://example.com'             # optional
featured: true           # featured projects appear on the home page
order: 2                 # lower numbers sort first on /projects
draft: false
---

## What it is
## Problem being solved
## Architecture
## Design decisions
## Status
```

## Adding images

Put files in `public/images/` and reference them with a root-relative path:

```markdown
![Ingestion pipeline](/images/telemetry-pipeline.png)
```

Everything under `public/` is copied to the site root unchanged. Prefer SVG for
diagrams and compressed PNG or WebP for screenshots.

## Deployment

Cloudflare Pages, building from the GitHub repository. Full settings and first-time
setup steps are in [docs/deployment.md](docs/deployment.md).

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 22 |

## Documentation

- [docs/architecture.md](docs/architecture.md) — how the site is put together
- [docs/content-guide.md](docs/content-guide.md) — writing and publishing content
- [docs/design-system.md](docs/design-system.md) — tokens, components, conventions
- [docs/design-reference.md](docs/design-reference.md) — how `specs/` became the implementation
- [docs/deployment.md](docs/deployment.md) — Cloudflare Pages configuration
- [docs/project-context/](docs/project-context/) — durable project state, decisions, backlog
