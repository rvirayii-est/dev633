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
    title: 'Java & Spring',
    summary:
      'Java 21 on Spring Boot 3: modular services, REST APIs, resource-server auth, versioned schema migrations, and health instrumentation.',
    items: [
      'Java 21',
      'Spring Boot 3',
      'Spring Security',
      'OAuth2 Resource Server',
      'Spring Data JPA',
      'Hibernate',
      'Spring Modulith',
      'WebFlux',
      'Flyway',
      'Lombok',
      'Kafka',
    ],
  },
  {
    index: '02',
    title: 'Frontend Engineering',
    summary:
      'Typed Vue 3 single-page applications on Vite, with centralized stores, utility-first styling, and a shared component library.',
    items: [
      'Vue 3',
      'TypeScript',
      'Vite',
      'Pinia',
      'Vue Router',
      'Tailwind CSS',
      'Angular',
      'React',
      'Astro',
      'Storybook',
    ],
  },
  {
    index: '03',
    title: 'Data & Storage',
    summary:
      'Relational schema design and migrations, cache tiers, object storage for documents and media, and embedded databases for tests.',
    items: [
      'PostgreSQL',
      'SQL Server',
      'Oracle',
      'MySQL',
      'MongoDB',
      'Redis',
      'MinIO',
      'SQLite',
    ],
  },
  {
    index: '04',
    title: 'Mobile & Desktop',
    summary:
      'Flutter applications with offline-capable local storage and secure credential handling, plus Rust-backed desktop shells.',
    items: [
      'Flutter',
      'Dart',
      'Riverpod',
      'Dio',
      'go_router',
      'sqflite',
      'Tauri',
      'Android',
      'C#',
    ],
  },
  {
    index: '05',
    title: 'Identity & Security',
    summary:
      'Self-hosted identity provider, standards-based single sign-on, token handling, and role-driven access across services.',
    items: ['Keycloak', 'OIDC', 'OAuth2', 'JWT', 'Spring Security'],
  },
  {
    index: '06',
    title: 'Infrastructure & DevOps',
    summary:
      'Containerized multi-service stacks, reverse proxy routing, TLS automation, edge delivery, and reproducible local environments.',
    items: [
      'Docker',
      'Docker Compose',
      'Nginx',
      'AWS',
      'Cloudflare',
      'Linux',
      'Certbot',
      'Maven',
      'CI/CD',
    ],
  },
  {
    index: '07',
    title: 'Testing & Quality',
    summary:
      'Unit, integration and browser-level coverage, real dependencies in containers, and architecture rules enforced in the build.',
    items: [
      'JUnit 5',
      'Testcontainers',
      'ArchUnit',
      'Vitest',
      'Playwright',
      'Vue Test Utils',
      'ESLint',
      'Prettier',
    ],
  },
  {
    index: '08',
    title: 'Engineering Leadership',
    summary:
      'Technical design ownership, code review before deployment, mentoring, and agile delivery cadence across parallel workstreams.',
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
