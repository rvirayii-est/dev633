---
name: 'deV633'
description: 'This site: a static Astro publication where the Git repository is the CMS and every note is a Markdown file.'
status: 'Active'
technologies: ['Astro', 'TypeScript', 'Markdown', 'Cloudflare Pages']
github: 'https://github.com/rvirayii-est/dev633'
featured: true
order: 3
draft: false
---

## What it is

deV633 is a personal engineering journal and portfolio. It is a static site: every
page is rendered at build time and served as plain HTML, with no server, database, or
admin panel behind it.

## The problem it solves

Technical detail evaporates. A tricky migration, a subtle concurrency bug, or a
protocol quirk gets solved once and then forgotten. I wanted a publishing path short
enough that writing the note is easier than losing it.

## Architecture

The whole pipeline is the Git workflow:

```text
Write Markdown  →  commit  →  push to GitHub  →  Cloudflare Pages build  →  live
```

- **Astro** renders content collections to static HTML with almost no client JavaScript.
- **Content collections** validate frontmatter with a schema, so a typo in a category
  fails the build instead of rendering a broken page.
- **Cloudflare Pages** builds on push and serves the output from its edge network.

## Design decisions

- **No CMS.** The repository is the source of truth. Adding a post means adding a file.
- **Two content types only.** Learnings and projects. More collections can be added
  when there is content that does not fit either.
- **Hand-written CSS with design tokens** instead of a utility framework, because the
  surface area is small and the token set is fixed.
- **Theme switching is the only client script**, alongside a menu toggle and the
  table-of-contents default state.

## Current status

The foundation is in place: layouts, the design system, both collections, listing and
detail pages, RSS, sitemap, and starter content. Ongoing work is content.
