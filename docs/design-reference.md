# Design reference: how `specs/` became the implementation

This document exists so a future session does not redesign the site away from its
intended direction. The sample under `specs/` is the visual baseline. Treat it as the
brief, not as code to copy.

## Files used

| Path | What it provided |
| --- | --- |
| `specs/technical_craft_minimalist_journal/DESIGN.md` | Colour palette, type scale, spacing, radii, component specs |
| `specs/dev633_home/` | Home page: hero, code panel, exploring strip, learnings grid, projects grid, GitHub call to action |
| `specs/dev633_learnings/` | Archive: tinted header with stat block, category filters, entry rows, right rail |
| `specs/dev633_article_detail/` | Article: breadcrumb, tag row, metadata line, prose column, sticky table of contents, previous/next |
| `specs/dev633_projects/` | Project index: status badges, index numbers, technology chips, case study links |
| `specs/dev633_case_study/` | Project detail: header block, sectioned body, next-project footer |
| `specs/dev633_about/` | About: intro panel, principle cards, profile rail, tech stack grid |
| `specs/dev633_wordmark_logo/` | Wordmark: prompt caret in a soft purple tile, "Dev" plus purple "633" |

Each sample directory holds a `code.html` (a Tailwind CDN prototype) and a
`screen.png`. The screenshots were the reference; the HTML was read for structure and
token values, then reimplemented.

## Retained from the sample

- Page structure and section order on every page.
- The 80/15/5 colour discipline: neutral canvas, white cards, purple accent only on
  interactive and technical emphasis.
- Geist plus JetBrains Mono, with monospace reserved for dates, tags, counts, status
  lines, and file names.
- Bordered white cards on a warm neutral canvas, hovering to a purple border, with no
  scale transforms and no heavy shadows.
- The dark hero code panel with line numbers, window dots, and a status footer.
- The learnings archive as rows with a category chip, date, reading time, and a right
  rail carrying a category breakdown and a feed card.
- The article layout: breadcrumb, tag row, metadata line, 720px prose column, sticky
  table of contents, and previous/next navigation.
- The projects grid with status badge, index number, technology chips, and a case
  study link.
- The about page's intro panel with the accent left border, the four principle cards,
  the profile rail, and the numbered tech stack groups.
- The footer: wordmark, tagline, link row, and the monospace status line.

## Changed, and why

| Change | Reason |
| --- | --- |
| Tailwind CDN replaced with hand-written CSS custom properties | The CDN script is a development tool, not a production dependency. The token set is small and fixed, so a framework adds a build step and a dependency for no gain. |
| Material Symbols icon font replaced with inline SVG | Removed a render-blocking third-party request; only the dozen icons actually used ship. |
| Duplicate wordmark in the sample header removed | The sample rendered both an image logo and the text mark. One text wordmark is correct. |
| Google Fonts replaced with self-hosted Fontsource | No third-party request on every page load. |
| Newsletter subscribe form replaced with an RSS card | A form needs a backend. RSS delivers the same promise with no server. |
| Search box on the archive replaced with category pages | Client-side search over a handful of Markdown files is not worth the JavaScript. Static category routes filter with zero script. |
| "Load older notes" pagination dropped | There is nothing to paginate yet. It returns when the archive is long enough to need it. |
| Invented metrics removed: star counts, uptime percentages, request rates, latency figures, repository counts | The site must not display numbers that are not real. Stat blocks now show counts derived from the actual content. |
| Sample project screenshots and inline data visualisations dropped | They depicted systems that do not exist. Real screenshots go in `public/images/` when there are real screenshots. |
| Mobile navigation added | The sample only specified a desktop navigation bar. Below 900px the links move into a disclosure menu. |
| Dark theme added | The sample provided a toggle control but no dark palette. A full dark token set was derived from the light one. |
| Uppercase eyebrow labels made consistent | The sample mixed lowercase and uppercase mono pills. One rule now applies everywhere. |
| Article table of contents made collapsible on mobile | A sticky rail has nowhere to sit on a phone, so it becomes a disclosure at the top of the article. |
| Grid tracks changed to `minmax(0, 1fr)`, tables and code blocks given their own scroll container | The prototype overflowed horizontally at narrow widths. |

## If you are changing the design

Read `specs/dev633_home/screen.png` first. Keep the hierarchy, the neutral-plus-purple
discipline, and the technical-journal tone. Improve accessibility, responsiveness, and
contrast freely. Do not swap this for a generic portfolio template.
