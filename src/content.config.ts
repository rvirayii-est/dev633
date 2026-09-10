import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

import { CATEGORIES } from './data/site';

/**
 * Technical notes and articles. One Markdown/MDX file per entry;
 * the file name becomes the URL slug (/learnings/<file-name>).
 */
const learnings = defineCollection({
  loader: glob({ base: './src/content/learnings', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(CATEGORIES).default('General'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

/**
 * Engineering write-ups for things I have built.
 * The Markdown body is the case study.
 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    status: z.enum(['Active', 'Production', 'Open Source', 'Experiment', 'Archived']),
    technologies: z.array(z.string()).default([]),
    github: z.url().optional(),
    website: z.url().optional(),
    featured: z.boolean().default(false),
    /** Controls ordering on /projects; lower numbers first. */
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { learnings, projects };
