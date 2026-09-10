import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

import { SITE } from '../data/site';
import { getLearnings } from '../utils/content';

export const GET: APIRoute = async (context) => {
  const entries = await getLearnings();

  return rss({
    title: `${SITE.name} — Learnings`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.published,
      categories: [entry.data.category, ...entry.data.tags],
      link: `/learnings/${entry.id}`,
    })),
    customData: `<language>en-us</language>`,
  });
};
