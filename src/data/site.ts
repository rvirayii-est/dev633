/**
 * Single source of truth for site-wide constants, navigation and the
 * hand-curated lists that appear on the home and about pages.
 * Edit this file rather than hunting through components.
 */

export const SITE = {
  name: 'deV633',
  /** Update once the production domain is attached in Cloudflare Pages. */
  url: 'https://dev633.pages.dev',
  tagline: 'Building software. Learning continuously. Sharing what works.',
  description:
    'deV633 is the engineering journal of a senior Java and Spring Boot developer with 10+ years building enterprise backends, APIs and the interfaces on top of them. Learnings, projects, architecture decisions and lessons from real systems.',
  author: 'Roberto Viray II',
  locale: 'en',
  github: 'https://github.com/rvirayii-est',
  githubHandle: '@rvirayii-est',
  /** Left empty until a public address is chosen; the contact row hides itself. */
  email: '',
} as const;

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Learnings', href: '/learnings' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'About', href: '/about' },
];

export const FOOTER_LINKS: NavItem[] = [
  { label: 'Learnings', href: '/learnings' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: '/resume' },
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
    title: 'Java & Backend',
    summary:
      'Enterprise services, REST APIs, microservices, persistence mapping, and asynchronous event streams.',
    items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'Kafka', 'J2EE'],
  },
  {
    index: '02',
    title: 'Frontend Engineering',
    summary:
      'Component architecture across three major frameworks, strict typing, and accessible interface work.',
    items: ['Angular', 'Vue 3', 'React', 'Next.js', 'TypeScript', 'Astro'],
  },
  {
    index: '03',
    title: 'Data Architecture',
    summary:
      'Relational schema design, query optimization, stored procedures, and production database support.',
    items: ['PostgreSQL', 'SQL Server', 'Oracle', 'MySQL', 'MongoDB'],
  },
  {
    index: '04',
    title: 'Mobile & Desktop',
    summary:
      'Cross-platform applications, native hardware bridges, and Windows desktop tooling for operations teams.',
    items: ['Flutter', 'Dart', 'React Native', 'Android Native', 'C#'],
  },
  {
    index: '05',
    title: 'Infrastructure & DevOps',
    summary:
      'Containerized builds, cloud deployment, reverse proxy routing, edge delivery, and declarative pipelines.',
    items: ['Docker', 'AWS', 'Cloudflare', 'Nginx', 'Linux', 'Maven', 'Tomcat', 'CI/CD'],
  },
  {
    index: '06',
    title: 'Engineering Leadership',
    summary:
      'Technical design ownership, code review before deployment, mentoring, and agile delivery cadence.',
    items: ['Architecture', 'Code Review', 'Mentoring', 'Agile', 'Scrum', 'Kanban'],
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
