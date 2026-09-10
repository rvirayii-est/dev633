# Architecture

## Shape of the system

Dev633 is a static site generator run at build time. Nothing executes on a server at
request time.

```text
Markdown files ──► Astro content collections ──► page components ──► static HTML
                          (Zod schema)                                    │
                                                                          ▼
                                                        Cloudflare Pages edge network
```

There is no database, no API, no authentication, and no admin interface. Adding any of
those would need a requirement that does not currently exist.

## Build pipeline

1. `astro build` reads `src/content.config.ts` and loads every Markdown file under
   `src/content/learnings` and `src/content/projects` with the `glob` loader.
2. Each file's frontmatter is validated against its Zod schema. A missing field or an
   unknown category fails the build.
3. Route files under `src/pages` generate one HTML file per route. Dynamic routes
   (`[slug].astro`, `[category].astro`) enumerate their paths in `getStaticPaths`.
4. Markdown bodies are rendered to HTML, with code blocks highlighted by Shiki at
   build time in both a light and a dark theme.
5. `@astrojs/sitemap` writes `sitemap-index.xml`; `src/pages/rss.xml.ts` writes the
   feed. Everything lands in `dist/`.

## Content collections

Two collections, defined in `src/content.config.ts`:

- **learnings** — technical notes. Sorted newest first everywhere. Categorised from a
  fixed vocabulary so category pages stay a closed set.
- **projects** — case studies. Sorted by an explicit `order` field, then by name.

Draft entries are visible in `npm run dev` and excluded from production builds. That
filter lives in `src/utils/content.ts`, not in each page, so it cannot be forgotten.

`src/utils/content.ts` is the only place that queries collections. Pages call
`getLearnings()` or `getProjects()` and get a sorted, filtered list.

## Routing

| Route | Source |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/learnings` | `src/pages/learnings/index.astro` |
| `/learnings/<slug>` | `src/pages/learnings/[slug].astro` |
| `/learnings/topics/<category>` | `src/pages/learnings/topics/[category].astro` |
| `/projects` | `src/pages/projects/index.astro` |
| `/projects/<slug>` | `src/pages/projects/[slug].astro` |
| `/about` | `src/pages/about.astro` |
| `/rss.xml` | `src/pages/rss.xml.ts` |
| `/404` | `src/pages/404.astro` |

Category pages live under `/learnings/topics/` rather than `/learnings/<category>` so
they can never collide with an article slug.

## Layout and components

`BaseLayout.astro` owns the document shell: `<head>` via `BaseHead.astro`, the fixed
header, `<main>`, and the footer. Every page uses it, so metadata, fonts, theme
bootstrap, and the skip link are implemented once.

Components are plain `.astro` files with scoped styles. There is no UI framework and
no client-side component runtime. Shared visual patterns (card, panel, chip, button,
prose) are global classes in `src/styles/global.css`; anything used by a single
component stays in that component's `<style>` block.

## Client-side JavaScript

Three small inline scripts, no bundled framework:

1. **Theme bootstrap** in `BaseHead.astro`, which sets `data-theme` before first
   paint so there is no flash of the wrong theme.
2. **Theme toggle** in `ThemeToggle.astro`, cycling system, light, and dark and
   storing the choice in `localStorage`.
3. **Menu and table-of-contents** helpers: closing the mobile menu on outside click
   or Escape, and opening the article table of contents on desktop widths only.

## SEO

`BaseHead.astro` is the single implementation of page metadata: title, description,
canonical URL, Open Graph, Twitter card, feed link, sitemap link, and theme colour.
Pages pass props; none of them write meta tags directly.

## Constraints kept deliberately

- One developer must be able to maintain this. Simple beats clever.
- No dependency is added unless it removes real work.
- No fabricated metrics in content: no user counts, uptime figures, or adoption
  numbers unless they are real and verifiable.
