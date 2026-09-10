# Decisions

Short records of choices that would otherwise be re-litigated. Newest last.

## ADR-001: Astro for a static-first architecture

Content is documents. Astro renders Markdown to static HTML with no client framework
and validates frontmatter at build time. Chosen over Next.js and Nuxt, which bring a
runtime the site does not need.

## ADR-002: Markdown in Git instead of a CMS

The publishing path is write, commit, push. No accounts, no hosting cost, no database
to back up, and full history for free. A CMS would add a service to maintain for a
single author.

## ADR-003: Cloudflare Pages for hosting

Free static hosting with a global edge network, automatic builds on push, and preview
URLs per branch. No Cloudflare-specific server features are used, so the site can move
to any static host.

## ADR-004: The `specs/` sample is the visual baseline

The sample is a deliberate design direction, not a placeholder. The implementation
follows its structure and hierarchy; changes were made only for accessibility,
responsiveness, honesty of content, or removal of prototype-only dependencies. They
are listed in `docs/design-reference.md`.

## ADR-005: Hand-written CSS instead of Tailwind

The sample prototype used the Tailwind CDN script, which is a development tool. The
token set is small and fixed, so custom properties plus scoped component styles carry
it with no build step and no dependency. Tailwind would be reasonable if the surface
area grew substantially; it does not pay for itself today.

## ADR-006: Inline SVG icons instead of an icon font

Material Symbols cost a render-blocking third-party stylesheet and shipped a whole
font for a dozen glyphs. `Icon.astro` inlines only the paths in use.

## ADR-007: Category pages instead of client-side filtering

Filtering a handful of Markdown files does not justify shipping JavaScript. Static
routes under `/learnings/topics/` filter at build time and are linkable and indexable.
Revisit if the archive grows past roughly a hundred entries.

## ADR-008: RSS instead of a newsletter form

The sample showed a subscribe form. A form needs a backend and a mailing service. RSS
delivers the same promise with no server and no personal data.

## ADR-009: Two collections, not three

`learnings` and `projects` only. The prompt allowed for a separate blog; there is no
content yet that does not fit "learnings". Adding a third collection is a small change
when a real need appears.

## ADR-010: No fabricated metrics

The sample displayed star counts, uptime percentages, request rates, and latency
figures for systems that do not exist. All were removed. Stat blocks now show counts
derived from the actual content. Numbers appear on the site only when they are real
and reproducible.

## ADR-011: Self-hosted fonts via Fontsource

Geist Sans and JetBrains Mono ship with the site rather than loading from Google
Fonts. One fewer third-party origin, no layout shift from a late stylesheet.

## ADR-012: Theme choice is system, light, or dark

Dark mode was absent from the sample, which only showed the toggle control. A full
dark token set was derived. The choice is applied before first paint by an inline
script so the page never flashes.
