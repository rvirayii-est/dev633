# Deployment: Cloudflare Pages

Dev633 deploys as a plain static site. No Cloudflare Workers, Functions, KV, or
server-side rendering are used, and none should be added without a real requirement.

```text
GitHub repository  ──►  Cloudflare Pages build  ──►  static Dev633 site on the edge
```

## Build configuration

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (repository root) |
| Install command | `npm ci` (Cloudflare runs this automatically when `package-lock.json` is present) |
| Node version | `22` |
| Environment variables | None required |

Astro's static output needs no runtime configuration. The only variable worth setting
is `NODE_VERSION`, and only if the preset default drifts below Node 20.

| Variable | Value | Scope |
| --- | --- | --- |
| `NODE_VERSION` | `22` | Production and preview |

## First-time setup

1. Push this repository to GitHub.
2. In the Cloudflare dashboard open **Workers & Pages**, then **Create**, then
   **Pages**, then **Connect to Git**.
3. Authorise the GitHub account and select the repository.
4. Set the production branch to `main`.
5. Enter the build settings from the table above.
6. Add `NODE_VERSION = 22` under environment variables.
7. Save and deploy. The first build takes a couple of minutes; later builds are
   faster.

Cloudflare then builds on every push to `main` and gives every other branch and pull
request its own preview URL.

## Custom domain

1. Open the Pages project, then **Custom domains**, then **Set up a domain**.
2. Enter the domain. If the zone is on Cloudflare, the DNS record is created for you.
3. Wait for the certificate to issue.
4. Update `SITE.url` in `src/data/site.ts` and the `Sitemap:` line in
   `public/robots.txt` to the new origin, then commit.

Step 4 matters: canonical URLs, Open Graph tags, the sitemap, and the RSS feed are all
built from `SITE.url`.

## Verifying a deployment

```bash
curl -I https://<your-domain>/                # 200, HTML
curl -s https://<your-domain>/rss.xml | head  # feed renders
curl -s https://<your-domain>/sitemap-index.xml | head
curl -I https://<your-domain>/does-not-exist  # 404 page
```

Also check that a recently added Markdown file appears in the archive and in the feed.

## Rollback

Pages keeps every deployment. Open the project, find the last good deployment, and use
**Rollback to this deployment**. Reverting the offending commit and pushing achieves
the same thing more permanently.

## Build failures worth recognising

| Symptom | Cause |
| --- | --- |
| `Invalid enum value` on a content file | A `category` or `status` outside the allowed list |
| `Expected date, received string` | A malformed `published` date; use `YYYY-MM-DD` |
| Node syntax errors in the build log | The build ran on a Node version below 20; set `NODE_VERSION` |
| Missing pages after a successful build | The entry is still `draft: true` |

Run `npm run build` locally before pushing. It fails the same way Cloudflare does.
