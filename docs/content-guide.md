# Content guide

## Publishing model

The repository is the CMS. A post exists when a Markdown file exists on the default
branch. Publishing is a push.

```text
src/content/learnings/<slug>.md  →  /learnings/<slug>
src/content/projects/<slug>.md   →  /projects/<slug>
```

File names are the URL. Use lowercase words separated by hyphens, and do not rename a
file after it is published unless you intend to change the URL.

## Learnings frontmatter

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Article heading and page title |
| `description` | yes | One or two sentences; used in cards, metadata, and RSS |
| `published` | yes | `YYYY-MM-DD`; drives ordering everywhere |
| `updated` | no | Shown next to the published date when present |
| `category` | no | One of the fixed categories; defaults to `General` |
| `tags` | no | Free-form list; the first two or three are shown |
| `draft` | no | `true` keeps it out of production builds |

Categories are `Backend`, `Frontend`, `Database`, `DevOps`, `Architecture`,
`Security`, `IoT`, `General`. They are defined in `src/data/site.ts` and validated at
build time. To add one, add it to that list first.

Tags are free-form and unvalidated. Keep them consistent by reusing existing ones.

## Projects frontmatter

| Field | Required | Notes |
| --- | --- | --- |
| `name` | yes | Project title |
| `description` | yes | One sentence for the project cards |
| `status` | yes | `Active`, `Production`, `Open Source`, `Experiment`, `Archived` |
| `technologies` | no | Chips on the card; the first five are shown |
| `github` | no | Full URL; adds the source link and terminal icon |
| `website` | no | Full URL; adds the live link |
| `featured` | no | `true` puts it on the home page |
| `order` | no | Lower sorts first on `/projects`; defaults to 100 |
| `draft` | no | `true` keeps it out of production builds |

## Writing a learning entry

Structure a note the way you would want to read it a year later:

1. Open with what the thing is, in two or three sentences. No preamble.
2. Use `##` headings for the two to five ideas that matter. They become the article
   table of contents automatically.
3. Show the code, the command, or the query. A concrete example beats a paragraph.
4. Close with what you would look at next, or when the approach does not apply.

Keep the body under roughly 900 words. Split anything longer into two entries.

## Writing a project case study

A project page is engineering documentation, not a résumé bullet. Cover what exists:

- What the system is
- The problem it solves
- Architecture, as a diagram or a short text pipeline
- Design decisions and the trade-offs behind them
- Current status, honestly stated
- Lessons learned

Do not invent user counts, revenue, uptime, or performance numbers. If a number is
not measured and reproducible, leave it out.

## Markdown that is supported

Headings, paragraphs, lists, links, blockquotes, tables, images, inline code, and
fenced code blocks. Code blocks are highlighted at build time; add the language for
correct colours:

````markdown
```java
@Service
class OrderService {}
```
````

Wide tables and long code blocks scroll horizontally inside their own container, so
they never widen the page on a phone.

For MDX-only features rename the file to `.mdx`. Plain `.md` is enough for most notes.

## Images

Store files in `public/images/` and reference them root-relative:

```markdown
![Ingestion pipeline](/images/telemetry-pipeline.png)
```

Always write alt text that says what the image shows. Prefer SVG for diagrams;
compress screenshots before committing them.

## Drafts

Set `draft: true` while writing. The entry renders in `npm run dev` and is excluded
from `npm run build`, so it is safe to commit an unfinished note.

## Checklist before pushing

```bash
npm run check
npm run build
```

Both must pass. A schema error fails the build rather than shipping a broken page.
