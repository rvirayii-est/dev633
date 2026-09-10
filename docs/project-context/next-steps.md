# Next steps

Prioritised. Keep it short: if everything is P0, nothing is.

## P0

1. **Replace the placeholder identity.** Set the real GitHub URL, handle, and contact
   address in `src/data/site.ts`. They currently point at `dev633` placeholders.
2. **Create the GitHub repository and connect Cloudflare Pages.** Settings are in
   `docs/deployment.md`. Confirm the first deploy, then update `SITE.url` and the
   `Sitemap:` line in `public/robots.txt` if a custom domain is attached.
3. **Replace the two placeholder project case studies.** `telemetry-pulse.md` and
   `bytevault-auth.md` are marked as starter content in their bodies. Replace them
   with real projects or delete them.

## P1

4. **Write the first real learning entries.** The four starter notes exist to prove
   the pipeline. Aim for entries drawn from actual debugging and design work.
5. **Rewrite the about page copy in your own voice.** The structure is right; the
   sentences are a reasonable draft, not your words.
6. **Add a real Open Graph image.** `public/og-default.svg` is generated. Per-entry
   cards can come later.

## P2

7. **Tag pages.** Categories have routes; tags do not. Worth it once tags are used
   consistently across a dozen or more entries.
8. **Archive pagination.** Add it when the archive passes roughly 30 entries.
9. **A search box.** Only if category browsing stops being enough, and only with a
   prebuilt static index rather than a heavyweight library.
10. **A third collection for long-form writing** if a piece appears that is genuinely
    not a learning or a project.
