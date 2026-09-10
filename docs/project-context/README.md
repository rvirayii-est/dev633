# Project context

These four files are written for a future session that has no memory of how deV633
was built. Read them before changing anything.

| File | Contents |
| --- | --- |
| `README.md` | This orientation |
| `current-state.md` | What exists right now, and where |
| `decisions.md` | Architecture decisions and the reasoning behind them |
| `next-steps.md` | Prioritised backlog |

Keep them current. When you finish a piece of work, update `current-state.md` and
`next-steps.md` in the same commit.

## What deV633 is

deV633 is a personal developer site and engineering knowledge hub. It presents the
systems its author builds and the technical notes kept while building them. The tone
is an engineer documenting work, not a marketing portfolio.

Two things matter most:

1. **Learnings** is the heart of the site. Publishing a note must stay trivial.
2. **The design comes from `specs/`.** It is a deliberate visual direction, not a
   placeholder. See `docs/design-reference.md` before changing the look.

## Where to start reading

1. `docs/architecture.md` — how the build works
2. `docs/design-reference.md` — what the sample specified and what was changed
3. `src/content.config.ts` — the content schemas
4. `src/styles/global.css` — every design token
5. `src/data/site.ts` — site constants, navigation, curated lists

## Important directories

```text
src/content/      Markdown; the entire content of the site
src/pages/        Routes
src/components/   UI pieces
src/layouts/      Page shell
src/styles/       Design tokens and shared classes
src/data/         Site constants and curated lists
src/utils/        Collection queries and formatting helpers
docs/             This documentation
specs/            Original design reference; not part of the build
```

## Current architecture in one paragraph

Astro 7 static site, TypeScript strict, two content collections validated with Zod,
hand-written CSS with custom properties, self-hosted fonts, no backend, deployed to
Cloudflare Pages from GitHub. Client JavaScript is limited to the theme toggle, the
mobile menu, and the table-of-contents default state.
