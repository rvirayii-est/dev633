// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { SITE } from './src/data/site';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // Two themes so code blocks follow the light/dark surface, no client JS.
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
