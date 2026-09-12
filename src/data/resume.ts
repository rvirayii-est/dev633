/**
 * Structured resume content rendered by /resume and reused on the home and
 * about pages.
 *
 * Deliberate editorial rule: the public site describes the *work*, not the
 * employer. Company names, office locations and date ranges are intentionally
 * omitted here — they live only in the downloadable PDF. Keep it that way when
 * editing, and keep the substance in sync with the PDF in `public/`.
 */

export const RESUME = {
  /** Served from public/, so the path is stable and cacheable. */
  pdfPath: '/Roberto-Viray-II-Java-Developer-Resume.pdf',
  /** Filename the browser saves as, via the `download` attribute. */
  pdfFilename: 'Roberto-Viray-II-Java-Developer-Resume.pdf',
  name: 'Roberto E. Viray II',
  headline: 'Software Engineer & Builder · Full-stack Delivery · Backend, Web and Mobile',
  location: 'Philippines',
  /** Shown on /resume only; the site-wide contact rows stay GitHub-first. */
  email: 'robertovirayii@gmail.com',
  yearsExperience: '10+',
  summary:
    'Full-stack software engineer with 10+ years of experience delivering enterprise applications across banking, healthcare, logistics, IoT, and internal business systems. Deep hands-on experience with Java, Spring Boot, REST APIs, microservices, Spring Data JPA, Hibernate, SQL databases, Kafka, and modern web and mobile stacks. Experienced leading engineering work, reviewing code, translating business requirements into technical solutions, mentoring developers, and supporting production-ready releases.',
} as const;

/** Industries shipped into, used as a chip strip on several pages. */
export const RESUME_DOMAINS = [
  'Banking',
  'Healthcare',
  'Logistics',
  'IoT',
  'Enterprise systems',
] as const;

export type SkillGroup = { title: string; items: string[] };

export const RESUME_SKILLS: SkillGroup[] = [
  {
    title: 'Java / Backend',
    items: [
      'Java 8/11/17/21',
      'Spring Boot 3',
      'Spring Framework',
      'Spring Security',
      'OAuth2 Resource Server',
      'Spring Data JPA',
      'Hibernate',
      'Spring Modulith',
      'WebFlux',
      'J2EE',
      'REST APIs',
      'Microservices',
      'Kafka',
      'Flyway',
      'Lombok',
    ],
  },
  {
    title: 'Frontend',
    items: [
      'Vue 3',
      'TypeScript',
      'Vite',
      'Pinia',
      'Vue Router',
      'Tailwind CSS',
      'Angular',
      'React',
      'Next.js',
      'Astro',
      'Storybook',
      'Vaadin',
    ],
  },
  {
    title: 'Mobile / Desktop',
    items: [
      'Flutter',
      'Dart',
      'Riverpod',
      'Dio',
      'Tauri',
      'React Native',
      'Android Native',
      'C#',
      'Windows Desktop',
    ],
  },
  {
    title: 'Data & Storage',
    items: [
      'PostgreSQL',
      'Microsoft SQL Server',
      'Oracle',
      'MySQL',
      'MongoDB',
      'Redis',
      'MinIO',
      'SQLite',
    ],
  },
  {
    title: 'Identity & Security',
    items: ['Keycloak', 'OIDC', 'OAuth2', 'JWT', 'Role-based access control'],
  },
  {
    title: 'Cloud / DevOps',
    items: [
      'Docker',
      'Docker Compose',
      'AWS',
      'Cloudflare',
      'Nginx',
      'Linux',
      'CI/CD',
      'Maven',
      'Tomcat',
      'Git',
    ],
  },
  {
    title: 'Testing & Quality',
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
    title: 'Engineering Leadership',
    items: [
      'Technical Design',
      'Architecture',
      'Code Review',
      'Team Mentoring',
      'Knowledge Sharing',
      'Agile',
      'Scrum',
      'Kanban',
    ],
  },
];

export type Role = {
  /** Seniority label, no employer attached. */
  title: string;
  /** One-line framing of the kind of environment the work happened in. */
  context: string;
  highlights: string[];
  tech: string[];
};

/**
 * Ordered most-senior first rather than chronologically, since the public
 * version carries no dates.
 */
export const RESUME_EXPERIENCE: Role[] = [
  {
    title: 'Advanced App Engineering Associate Manager / Lead Full-stack Software Engineer',
    context: 'Global consulting firm, enterprise client delivery',
    highlights: [
      'Led full-stack engineering activities for enterprise applications spanning backend services, web interfaces, mobile components, and production support.',
      'Designed and developed Spring Boot backend microservices and REST APIs aligned with established architecture standards and application design requirements.',
      'Translated business requirements into maintainable technical solutions and responsive, accessible user experiences.',
      "Reviewed teammates' code before deployment to improve quality, maintainability, and production readiness.",
      'Ran knowledge-sharing sessions across teams and supported multiple assignments involving Java backend, Angular, Vue 3, Flutter, and C# development.',
    ],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'Microservices', 'Angular', 'Vue 3', 'Flutter', 'C#'],
  },
  {
    title: 'Lead Software Engineer / Consultant',
    context: 'IoT product company',
    highlights: [
      'Owned technical architecture, development, deployment planning, and task management for an IoT-focused product ecosystem.',
      'Designed and developed Spring Boot REST APIs supporting integrations and operational product workflows.',
      'Built and supported Flutter mobile applications and C# Windows desktop tools alongside web platform components.',
      'Provided technical direction and coordinated continuous product improvements across multiple application layers.',
    ],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'Flutter', 'C#', 'Windows Desktop', 'Next.js'],
  },
  {
    title: 'Senior Full-stack Java Engineer',
    context: 'Advisory and business services',
    highlights: [
      'Developed, maintained, and enhanced client-facing business applications using Spring Boot REST APIs and React.',
      'Improved existing application architecture based on client requirements and production needs.',
      'Handled issue resolution and feature delivery for business-as-usual development.',
      'Worked with Kafka-based messaging distribution for asynchronous and distributed workflows.',
    ],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'React', 'Kafka', 'SQL'],
  },
  {
    title: 'Senior Java Developer',
    context: 'Financial technology, banking platforms',
    highlights: [
      'Developed and maintained enterprise applications using Java, J2EE, Spring Boot, Angular, and Vue-based technologies.',
      'Implemented new features, diagnosed production issues, and supported iterative Agile sprint delivery.',
      'Worked across Angular and J2EE applications, Spring Boot REST API projects, and robotic process automation initiatives.',
      'Served as backend coordinator for a volunteer project using JHipster and Vue.js.',
    ],
    tech: ['Java', 'J2EE', 'Spring Boot', 'REST APIs', 'Angular', 'Vue.js', 'JHipster'],
  },
  {
    title: 'Associate Software Engineer II',
    context: 'Healthcare technology',
    highlights: [
      'Developed and maintained enterprise web application features using Java, JSP, Servlets, Spring, JPA, Vaadin, JavaScript, HTML, and CSS.',
      'Created and executed JUnit test cases and supported debugging, builds, deployments, and production maintenance using Maven and Tomcat.',
    ],
    tech: ['Java', 'Spring', 'JPA', 'JSP', 'Servlets', 'Vaadin', 'JUnit', 'Maven', 'Tomcat'],
  },
];

export type EarlyRole = { title: string; detail: string };

/** Foundational years, condensed. Same rule: role and substance, no employer. */
export const RESUME_EARLY: EarlyRole[] = [
  {
    title: 'Web Developer',
    detail:
      'Built web applications with Java, Spring Boot, Vaadin, Hibernate, JDBC, and MySQL, and supported two junior developers.',
  },
  {
    title: 'Associate Software Engineer',
    detail:
      'Delivered features on enterprise Java applications using JSP, Servlets, Spring, JavaScript, HTML, and CSS.',
  },
  {
    title: 'Web Developer',
    detail:
      'Handled requirements analysis and internal automation for a banking client using Microsoft Access, Visual Basic, and Java Swing.',
  },
  {
    title: 'Database Administrator Trainee',
    detail:
      'Worked with Oracle, SQL, and stored procedures, and built a C# desktop tracking tool.',
  },
];

export type ResumeProject = { title: string; detail: string };

export const RESUME_PROJECTS: ResumeProject[] = [
  {
    title: 'Healthcare Management System',
    detail: 'Built with Spring Boot and Vaadin, packaged with Docker and deployed to AWS.',
  },
  {
    title: 'Enterprise CRM Modernization',
    detail:
      'Maintained a Java and Vaadin 8 CRM for an overseas client and led upgrade planning, development, and deployment.',
  },
  {
    title: 'MERN Application Suite',
    detail: 'Developed and managed applications using MongoDB, Express, React, and Node.js.',
  },
  {
    title: 'Messaging Blast Platform',
    detail: 'Built a text-messaging blast tool for bulk communication and automation use cases.',
  },
];

export const RESUME_EDUCATION = {
  degree: 'Bachelor of Science in Computer Engineering',
  school: 'Pamantasan ng Lungsod ng Maynila, Manila',
  honors: [
    'Academic Top Three, College of Engineering and Technology',
    'Top 10 Finalist, Smart Sweep Contest ("Smart Reserve")',
    'Ericsson Award Prize',
  ],
} as const;
