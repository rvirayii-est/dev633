---
name: Technical Craft & Minimalist Journal
colors:
  surface: '#fbf8fc'
  surface-dim: '#dcd9dd'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2f7'
  surface-container: '#f0edf1'
  surface-container-high: '#eae7eb'
  surface-container-highest: '#e4e1e6'
  on-surface: '#1b1b1e'
  on-surface-variant: '#4a4455'
  inverse-surface: '#303033'
  inverse-on-surface: '#f3f0f4'
  outline: '#7b7487'
  outline-variant: '#ccc3d8'
  surface-tint: '#732ee4'
  primary: '#630ed4'
  on-primary: '#ffffff'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#d2bbff'
  secondary: '#5e5c6e'
  on-secondary: '#ffffff'
  secondary-container: '#e4e0f5'
  on-secondary-container: '#646274'
  tertiary: '#6129bc'
  on-tertiary: '#ffffff'
  tertiary-container: '#7a47d5'
  on-tertiary-container: '#ede1ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#e4e0f5'
  secondary-fixed-dim: '#c7c4d8'
  on-secondary-fixed: '#1b1a29'
  on-secondary-fixed-variant: '#464555'
  tertiary-fixed: '#ebddff'
  tertiary-fixed-dim: '#d3bbff'
  on-tertiary-fixed: '#250059'
  on-tertiary-fixed-variant: '#581db3'
  background: '#fbf8fc'
  on-background: '#1b1b1e'
  surface-variant: '#e4e1e6'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-precision, technical, and distraction-free digital canvas tailored for an engineering journal and developer portfolio. It channels a refined blend of modern minimalism, structured Swiss typography, and developer-first ergonomics.

### Personality & Tone
- **Precise & Analytical:** Clean architectural alignment, crisp micro-borders, and disciplined monospaced accents evoke meticulous technical competence.
- **Editorial & Bookish:** Optimized reading rhythm for technical documentation, code exploration, and architectural deep-dives.
- **Understated Elegance:** Eliminates gratuitous decoration, dramatic gradients, and superficial SaaS flourishes in favor of typographic contrast and white space.

### Emotional Target
The user should feel the clarity, focus, and utility of an immaculate IDE combined with an editorial publication: quiet, reliable, deeply legible, and effortlessly modern.

## Colors

The color architecture enforces an intentional 80-15-5 discipline: 80% neutral grays and deep slate typography, 15% pure light surfaces, and an acute 5% measured violet accent for interactive intent and code syntax emphasis.

### Palette Architecture
- **Primary Interactive (`#7C3AED`):** Used strictly for high-priority calls-to-action, active navigational states, inline link markers, and focal points.
- **Interactive State Hover (`#6D28D9`):** A darker, weighted violet for deliberate tactile response on press or hover.
- **Deep Structural Purple (`#5B21B6`):** Reserved for high-contrast syntax tokens, active selection boundaries, and strong accents.
- **Subdued Tint Surface (`#EDE9FE`):** Soft lavender background tint applied to tech badges, tag chips, active table-of-contents pills, and subtle inline code snippets.
- **Surface Canvas (`#FAFAFA`):** Warm-neutral tinted base screen background reducing ocular fatigue during extended reading.
- **Surface Elevated (`#FFFFFF`):** Pure white used for self-contained cards, popovers, and floating toolbars.
- **Structural Borders (`#E4E4E7`):** Fine 1px divider lines that define architectural boundaries without visual noise.
- **Typography Scale:** `#18181B` for commanding primary text ensuring AAA WCAG compliance, backed by `#71717A` for metadata, timestamps, and secondary captions.

## Typography

The typographic system relies on a dual engine: **Geist** for crisp, proportional geometric clarity across narrative and UI layers, and **JetBrains Mono** for technical data, metadata, tags, and syntax blocks.

### Rules & Hierarchy
- **Reading Measure:** Article body text must never exceed a line length of 68-72 characters (`max-w-prose` / ~680px) to safeguard optimal scanning and reading cadence.
- **Headings:** Set with tight tracking (`letterSpacing: -0.02em` to `-0.03em`) to yield a firm, editorial presence that anchors technical writing.
- **Technical Monospace:** JetBrains Mono is employed wherever data precision matters: git hashes, dates, performance metrics, file trees, category tags, and inline snippets. Code blocks maintain an open 1.55+ relative line-height for legibility during architectural code analysis.

## Layout & Spacing

The layout adopts a centered, content-first fixed grid model. Rather than edge-to-edge SaaS dashboards, the system prioritizes restrained reading columns and disciplined modular grids.

### Breakpoints & Container Constraints
- **Desktop (>= 1024px):** Max container width of 1120px for portfolio index and project matrices. Content columns for journal entries are constrained to 720px with an optional sticky 240px rail for table-of-contents and technical metadata.
- **Tablet (768px - 1023px):** Fluid 8-column layout with 24px margins; secondary sidebars reflow to collapsible upper drawer elements.
- **Mobile (< 768px):** Single-column stacked layout with 20px edge safety margins (`margin-mobile`), 16px vertical element gaps.

### Spacing Cadence
Spacing follows an exact 4px/8px modular base. Horizontal margins between discrete content modules enforce breathing room (`space-xl` / 40px), while metadata rows and inline status metrics collapse into tight, structured intervals (`space-xs` and `space-sm`).

## Elevation & Depth

Visual hierarchy rejects heavy skeuomorphism and diffuse colored dropshadows, relying instead on clean surface transitions, 1px perimeter definition, and micro-elevation.

### Layering Philosophy
- **Base Canvas:** Neutral `#FAFAFA` provides the background plane.
- **Level 1 (Cards & Code Panes):** Pure white (`#FFFFFF`) or tinted slate, bounded by a uniform `1px solid #E4E4E7` hairline stroke.
- **Level 2 (Hover States & Interactive Focus):** A subtle, neutral micro-shadow combined with an accent boundary:
  `box-shadow: 0 1px 3px 0 rgba(24, 24, 27, 0.04), 0 1px 2px -1px rgba(24, 24, 27, 0.04);`
  On hover, borders transition to `#7C3AED` (or a lighter neutral `#D4D4D8`).
- **Overlays (Modals & Command Palettes):** Backdrop overlay uses an ultra-fine translucent scrim: `rgba(24, 24, 27, 0.2)` accompanied by `backdrop-filter: blur(4px)`.

## Shapes

The design system maintains a modern, balanced geometry with a consistent corner radius of 10px to 14px (represented by roundedness tier 2).

### Geometry Principles
- **Base Containers & Cards:** Set at `0.75rem` (12px) to introduce friendliness while preserving strict structural alignment.
- **Interactive Controls (Inputs, Buttons):** Set at `0.5rem` (8px) to provide a snappy, tool-like interaction footprint.
- **Pills & Tag Badges:** Rendered with full pills (`rounded-full` / 9999px) or `0.375rem` (6px) rounded tags depending on context (e.g., status vs. tech stack metadata).
- **Embedded Code Viewports:** Anchored at `0.75rem` (12px) with crisp 1px borders and inner radii offset by 3px for nested syntax toolbars.

## Components

### Buttons
- **Primary:** Background `#7C3AED`, label `#FFFFFF` in `Geist` Medium (14px), border `none`, padding `0.5rem 1rem` (`8px 16px`), radius `8px`. Hover: `#6D28D9` with a subtle transform transition (`translate-y-[-0.5px]`).
- **Secondary / Neutral:** Background `#FFFFFF`, label `#18181B`, border `1px solid #E4E4E7`. Hover: background `#FAFAFA`, border `#D4D4D8`.
- **Ghost / Code Action:** Transparent background, text `#71717A`, font `JetBrains Mono` (12px). Hover: background `#EDE9FE`, text `#7C3AED`.

### Chips & Badges
- **Tech Stack Chips:** Background `#EDE9FE`, text `#5B21B6`, font `JetBrains Mono` (12px, Weight 500), border `1px solid rgba(124, 58, 237, 0.15)`, radius `6px`, padding `2px 8px`.
- **Status Indicator:** Flex row with a 6px circular dot (`#10B981` for active or `#7C3AED` for in-progress), wrapped in a subtle neutral container with `#71717A` text.

### Cards & Project Tiles
- **Structure:** Background `#FFFFFF`, border `1px solid #E4E4E7`, border-radius `12px`, internal padding `1.5rem` (`24px`).
- **Hover Motion:** Border color shifts to `#7C3AED` smoothly over 150ms. No dramatic scale transformations.
- **Header Structure:** Displays title (`headline-sm`), accompanied by a right-aligned monospaced deployment timestamp or GitHub metric (`code-sm`).

### Code Blocks & Markdown
- **Container:** Background `#18181B` (or deep slate) for inverted code blocks, or `#FFFFFF` with `1px solid #E4E4E7` for minimal daylight blocks. Radius `12px`.
- **Toolbar:** Top bar containing language tag (`label-sm`, uppercase), file path, and a one-click copy button with clipboard state feedback.
- **Inline Code:** Background `#EDE9FE`, color `#5B21B6`, font `JetBrains Mono` (13px), padding `2px 6px`, radius `4px`.

### Inputs & Form Controls
- **Text Inputs:** Height 40px, background `#FFFFFF`, border `1px solid #E4E4E7`, radius `8px`, text `#18181B`, placeholder `#71717A`. Focus ring: `2px solid #7C3AED` with an offset of 1px.
- **Checkboxes & Radios:** Size 16px, border `1px solid #D4D4D8`, radius `4px` (checkbox) or `50%` (radio). Checked state: background `#7C3AED`, white checkmark icon.

### Lists & Activity Feeds
- **Journal Archive List:** Clean borderless list rows divided by a subtle bottom border (`1px solid #E4E4E7`). Row layout spans date (`JetBrains Mono`, `#71717A`, 14px), title (`Geist` SemiBold, `#18181B`), and contextual category chip on the far right.