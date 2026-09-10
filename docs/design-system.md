# Design system

All tokens live in `src/styles/global.css` as CSS custom properties. There is no
utility framework and no design-system package. Values are derived from
`specs/technical_craft_minimalist_journal/DESIGN.md` and the sample views.

## Principles

- Neutral surfaces carry the page; purple is the accent, not the background.
- Structure comes from 1px borders and whitespace, not from shadows.
- Monospace marks technical data: dates, tags, counts, file names, status lines.
- Motion is limited to colour and border transitions of about 150ms.

## Colour tokens

| Token | Light | Role |
| --- | --- | --- |
| `--background` | `#fbf8fc` | Page canvas |
| `--surface` | `#ffffff` | Cards, header, footer |
| `--surface-subtle` | `#f6f2f7` | Panels, inset blocks |
| `--surface-high` | `#eae7eb` | Icon button hover |
| `--text` | `#1b1b1e` | Primary text |
| `--text-muted` | `#4a4455` | Body copy, summaries |
| `--text-faint` | `#6c6577` | Metadata, monospace labels |
| `--border` | `#e4e1e6` | Hairline structure |
| `--border-strong` | `#ccc3d8` | Hover borders on neutral controls |
| `--accent` | `#630ed4` | Links, primary buttons, active nav |
| `--accent-hover` | `#4e0aa8` | Pressed and hover accent |
| `--accent-bright` | `#7c3aed` | Card hover border, dots, markers |
| `--accent-soft` | `#ede0ff` | Chip and eyebrow background |
| `--accent-on-soft` | `#52009e` | Text on the soft accent |

Dark values are redefined under `:root[data-theme='dark']`. Every colour has a
definition in the base `:root` block, so no element depends only on a media query.

## Typography

Geist Sans for everything readable, JetBrains Mono for technical data. Both are
self-hosted through Fontsource, so there is no third-party font request.

| Use | Size | Weight |
| --- | --- | --- |
| Page title (`h1`) | 1.875rem, 2.5rem from 768px | 700 |
| Home hero | 2rem, 3rem from 768px | 700 |
| Section heading | 1.375rem, 1.5rem from 768px | 600 |
| Card title | 1.0625rem to 1.1875rem | 600 |
| Body | 1rem / 1.625 | 400 |
| Prose body | 1rem / 1.75, max 720px | 400 |
| Metadata, chips | 0.6875rem to 0.75rem mono | 500 |

Headings use negative tracking between `-0.015em` and `-0.03em`. Article text is
capped at `--measure` (720px) for a comfortable line length.

## Spacing and layout

A 4px scale: `--space-xs` 4px, `--space-sm` 8px, `--space-md` 16px, `--space-lg` 24px,
`--space-xl` 40px, `--space-2xl` 64px.

`--container` is 1120px. `--gutter` is 20px below 768px and 24px above, applied by the
`.container` class, which is the only thing that sets horizontal page padding.

Radii: `--radius-sm` 4px for chips, `--radius` 8px for controls, `--radius-md` 12px for
cards and panels, `--radius-full` for pills.

## Shared classes

| Class | Use |
| --- | --- |
| `.container` | Centred max-width wrapper with the page gutter |
| `.section` / `.section-head` | Titled section with an optional right-hand link |
| `.grid .grid-2` / `.grid-3` | Responsive card grids, one column on mobile |
| `.card` | White bordered card; hovers to an accent border |
| `.panel` | Subtle inset surface for sidebars and callouts |
| `.chip` / `.chip-neutral` | Tag and technology badges |
| `.eyebrow` | Small mono pill above a page title |
| `.btn .btn-primary` / `.btn-secondary` | Buttons and button-shaped links |
| `.link-accent` | Inline accent link with an arrow that nudges on hover |
| `.meta` | Monospace metadata row |
| `.prose` | Markdown article body |

Anything used in one component only stays in that component's scoped `<style>`.

## Responsive rules

Breakpoints: 640px (two-column grids), 768px (type scale, gutters), 900px (desktop
navigation), 1024px (sidebars and three-column grids).

Rules that keep the layout honest:

- Grid tracks use `minmax(0, 1fr)` so a wide child scrolls instead of stretching.
- Code blocks and tables scroll inside their own container.
- Long URLs and file names use `overflow-wrap: anywhere`.
- The header collapses to a disclosure menu below 900px.

## Theming

Three states: system, light, dark. The choice is stored in `localStorage` under
`dev633-theme` and applied to `documentElement.dataset.theme` before first paint.
Code blocks carry both Shiki themes; the dark one is activated by CSS variables, with
no client-side re-highlighting.

## Accessibility

- Skip link to `#main` as the first focusable element.
- Visible focus ring on every interactive element via `:focus-visible`.
- Card titles carry the link; the full-card overlay uses an `::after` pseudo-element
  so there is exactly one link per card in the accessibility tree.
- Icons are decorative and marked `aria-hidden`; labels are real text.
- `prefers-reduced-motion` disables transitions and smooth scrolling.
