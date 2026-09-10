import { getCollection, type CollectionEntry } from 'astro:content';

export type Learning = CollectionEntry<'learnings'>;
export type Project = CollectionEntry<'projects'>;

/** Drafts are visible while developing and dropped from production builds. */
const isVisible = (entry: { data: { draft: boolean } }) =>
  import.meta.env.DEV || !entry.data.draft;

export async function getLearnings(): Promise<Learning[]> {
  const entries = await getCollection('learnings', isVisible);
  return entries.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}

export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection('projects', isVisible);
  return entries.sort(
    (a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name),
  );
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Rough reading time from the raw Markdown body, 200 words per minute. */
export function readingTime(body: string | undefined): string {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/** URL-safe slug used for category routes. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
