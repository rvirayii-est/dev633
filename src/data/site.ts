/**
 * Single source of truth for site-wide constants, navigation and the
 * hand-curated lists that appear on the home and about pages.
 * Edit this file rather than hunting through components.
 */

export const SITE = {
  name: 'Dev633',
  /** Update once the production domain is attached in Cloudflare Pages. */
  url: 'https://dev633.pages.dev',
  tagline: 'Building software. Learning continuously. Sharing what works.',
  description:
    'Dev633 is where I share development learnings, experiments, projects, architecture decisions, and lessons from building real software.',
  author: 'Dev633',
  locale: 'en',
  github: 'https://github.com/dev633',
  githubHandle: '@dev633',
  email: 'hello@dev633.dev',
} as const;

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Learnings', href: '/learnings' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
];

export const FOOTER_LINKS: NavItem[] = [
  { label: 'Learnings', href: '/learnings' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'GitHub', href: SITE.github },
  { label: 'RSS', href: '/rss.xml' },
];

/** Shown in the "Currently Exploring" strip on the home page. */
export const CURRENTLY_EXPLORING = [
  'System Design',
  'Cloud Architecture',
  'Cybersecurity',
  'IoT',
  'Spring Boot 3',
  'Distributed Systems',
];

export type StackGroup = {
  index: string;
  title: string;
  summary: string;
  items: string[];
};

/** Rendered on /about and, in condensed form, on the home page. */
export const STACK: StackGroup[] = [
  {
    index: '01',
    title: 'Backend Systems',
    summary:
      'Core runtime services, concurrency primitives, enterprise microservices, and asynchronous event streams.',
    items: ['Java', 'Spring Boot', 'C#', '.NET Core', 'Kotlin'],
  },
  {
    index: '02',
    title: 'Frontend Engineering',
    summary:
      'Modular reactivity, strict type definitions, utility-first design systems, and rapid asset bundling.',
    items: ['Vue 3', 'TypeScript', 'Astro', 'Vite'],
  },
  {
    index: '03',
    title: 'Data Architecture',
    summary:
      'Relational schemas, query optimization, in-memory caching tiers, and realtime relational synchronization.',
    items: ['PostgreSQL', 'SQL Server', 'Supabase', 'Redis'],
  },
  {
    index: '04',
    title: 'Mobile Platforms',
    summary:
      'Cross-platform ergonomics, native hardware bridges, and concise idiomatic mobile logic.',
    items: ['Flutter', 'Dart', 'Tauri'],
  },
  {
    index: '05',
    title: 'Infrastructure & DevOps',
    summary:
      'Containerized orchestration, reverse proxy routing, edge security policies, and declarative pipelines.',
    items: ['Docker', 'Keycloak', 'Nginx', 'Cloudflare', 'Linux', 'GitHub Actions'],
  },
];

/** Ordered category vocabulary shared by the learnings collection and its filters. */
export const CATEGORIES = [
  'Backend',
  'Frontend',
  'Database',
  'DevOps',
  'Architecture',
  'Security',
  'IoT',
  'General',
] as const;

export type Category = (typeof CATEGORIES)[number];
