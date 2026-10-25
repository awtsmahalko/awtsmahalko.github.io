<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type ProjectKind = 'Professional experience' | 'Independent project'
type Project = {
  title: string
  category: ProjectKind
  type: string
  description: string
  stack: string[]
  highlights: string[]
  status: string
  featured?: boolean
  note: string
}

type Service = {
  title: string
  description: string
  tags: string[]
  paths: string[]
}

const activeFilter = ref<'All' | ProjectKind>('All')
const mobileMenuOpen = ref(false)
const localTime = ref('')
const currentYear = new Date().getFullYear()
const projectFilters = ['All', 'Professional experience', 'Independent project'] as const

function setFilter(filter: typeof projectFilters[number]) {
  activeFilter.value = filter
}

const projects: Project[] = [
  {
    title: 'Partner Integration Platform',
    category: 'Independent project',
    type: 'API engineering · Middleware',
    description: 'A portfolio-built integration platform that normalizes events from simulated partner systems into a consistent internal API.',
    stack: ['Laravel', 'Vue 3', 'REST API', 'Queues', 'Webhooks'],
    highlights: ['Partner adapter pattern', 'Webhook validation and idempotency', 'Retry and synchronization visibility'],
    status: 'Planned build',
    featured: true,
    note: 'Independent demonstration project. Features are planned and must not be represented as completed until implemented.'
  },
  {
    title: 'SME ERP & Inventory',
    category: 'Independent project',
    type: 'Business systems · ERP',
    description: 'A focused business application for purchasing, stock movements, sales, and operational reporting.',
    stack: ['Laravel', 'Filament', 'Vue 3', 'MySQL'],
    highlights: ['Purchasing-to-inventory workflow', 'Stock movement ledger', 'Roles, audit trail, and reports'],
    status: 'Planned build',
    featured: true,
    note: 'Independent demonstration project. Screenshots and live-demo links can be added after implementation.'
  },
  {
    title: 'Getko PH',
    category: 'Professional experience',
    type: 'Backend engineering · Architecture',
    description: 'Professional project experience involving a Laravel-based codebase and modern backend engineering practices, as listed in my résumé.',
    stack: ['Laravel', 'DDD', 'Hexagonal Architecture', 'GraphQL', 'PostgreSQL / MySQL', 'Docker'],
    highlights: ['Backend architecture and modularity', 'API and data-layer engineering', 'Development workflow and testing tools'],
    status: 'Professional experience',
    featured: true,
    note: 'Summary based on my résumé. Detailed functionality, personal contributions, diagrams, and outcomes will be added only where approved for public disclosure.'
  },
  {
    title: 'Energy Vision',
    category: 'Professional experience',
    type: 'Backend engineering · REST API',
    description: 'Professional experience with a Symfony/PHP application and REST API development.',
    stack: ['Symfony', 'PHP', 'REST API', 'MySQL', 'DDD', 'Docker', 'Twig'],
    highlights: ['Backend feature development', 'API implementation and validation', 'Maintainable application structure'],
    status: 'Professional experience',
    note: 'Summary based on my résumé. Specific features and achievements require verification and disclosure approval before publication.'
  },
  {
    title: 'Petcheckr',
    category: 'Professional experience',
    type: 'Full-stack · Web and mobile',
    description: 'Professional project experience listed with web and mobile technologies.',
    stack: ['Laravel', 'Vue.js', 'Inertia.js', 'React Native', 'MySQL', 'Tailwind CSS'],
    highlights: ['Full-stack feature development', 'Web and mobile technology exposure', 'API and application integration'],
    status: 'Professional experience',
    note: 'Résumé-listed technologies do not establish that every technology was used in the same feature. Detailed claims and visuals will be added after verification and approval.'
  },
  {
    title: 'Pakske',
    category: 'Professional experience',
    type: 'Full-stack application development',
    description: 'Professional project experience with a Laravel, Filament, and Vue.js technology stack.',
    stack: ['Laravel', 'Filament', 'Vue.js', 'Tailwind CSS', 'MySQL'],
    highlights: ['Full-stack feature work', 'Administrative interface development', 'Database-backed application features'],
    status: 'Additional experience',
    note: 'High-level summary based on my résumé. Add only specific contributions that accurately reflect my work and can be shared publicly.'
  },
  {
    title: 'CauseUCan',
    category: 'Professional experience',
    type: 'Full-stack · REST API',
    description: 'Professional project experience using Laravel, Vue.js, and REST APIs.',
    stack: ['Laravel', 'Vue.js', 'REST API', 'MySQL', 'Tailwind CSS'],
    highlights: ['Frontend and backend feature work', 'API integration', 'Application maintenance and testing'],
    status: 'Additional experience',
    note: 'High-level summary based on my résumé. Specific business details and contributions should be confirmed before publication.'
  }
]

const filteredProjects = computed(() =>
  activeFilter.value === 'All'
    ? projects
    : projects.filter((project) => project.category === activeFilter.value)
)

const skills = [
  {
    title: 'Backend & APIs',
    items: 'PHP 8+, Laravel, Symfony, REST APIs, GraphQL, queues, webhooks, middleware',
    logos: ['/logos/php.svg', '/logos/laravel.svg', '/logos/symfony.svg', '/logos/graphql.svg']
  },
  {
    title: 'Architecture',
    items: 'DDD, Hexagonal / Clean Architecture, CQRS, SOLID, event-driven design',
    logos: ['/logos/phpstorm.svg', '/logos/docker.svg']
  },
  {
    title: 'Frontend & mobile',
    items: 'Vue.js, React, TypeScript, Tailwind CSS, Inertia.js, React Native, Ionic',
    logos: ['/logos/vuedotjs.svg', '/logos/react.svg', '/logos/typescript.svg', '/logos/tailwindcss.svg']
  },
  {
    title: 'Data & delivery',
    items: 'MySQL, PostgreSQL, Docker, Git, Postman, testing, AI-assisted development workflows',
    logos: ['/logos/mysql.svg', '/logos/postgresql.svg', '/logos/git.svg', '/logos/postman.svg']
  }
]

const technologies = [
  { name: 'PHP', logo: '/logos/php.svg' },
  { name: 'Laravel', logo: '/logos/laravel.svg' },
  { name: 'Symfony', logo: '/logos/symfony.svg' },
  { name: 'Vue.js', logo: '/logos/vuedotjs.svg' },
  { name: 'Filament', logo: '/logos/filament.svg' },
  { name: 'React', logo: '/logos/react.svg' },
  { name: 'React Native', logo: '/logos/react.svg' },
  { name: 'TypeScript', logo: '/logos/typescript.svg' },
  { name: 'Tailwind CSS', logo: '/logos/tailwindcss.svg' },
  { name: 'Inertia.js', logo: '/logos/inertia.svg' },
  { name: 'Next.js', logo: '/logos/nextdotjs.svg' },
  { name: 'MySQL', logo: '/logos/mysql.svg' },
  { name: 'PostgreSQL', logo: '/logos/postgresql.svg' },
  { name: 'GraphQL', logo: '/logos/graphql.svg' },
  { name: 'Docker', logo: '/logos/docker.svg' },
  { name: 'Git', logo: '/logos/git.svg' },
  { name: 'Postman', logo: '/logos/postman.svg' },
  { name: 'Claude', logo: '/logos/claude.svg' }
]

const tagLogos: Record<string, string> = {
  Laravel: '/logos/laravel.svg',
  Symfony: '/logos/symfony.svg',
  PHP: '/logos/php.svg',
  'Vue 3': '/logos/vuedotjs.svg',
  'Vue.js': '/logos/vuedotjs.svg',
  Filament: '/logos/filament.svg',
  MySQL: '/logos/mysql.svg',
  'PostgreSQL / MySQL': '/logos/postgresql.svg',
  PostgreSQL: '/logos/postgresql.svg',
  Docker: '/logos/docker.svg',
  GraphQL: '/logos/graphql.svg',
  'Tailwind CSS': '/logos/tailwindcss.svg',
  'React Native': '/logos/react.svg',
  'Inertia.js': '/logos/inertia.svg',
  TypeScript: '/logos/typescript.svg'
}

function tagLogo(tag: string) {
  return tagLogos[tag]
}

const services: Service[] = [
  {
    title: 'Full-stack product development',
    description: 'End-to-end web applications, admin panels, and internal tools built with Laravel, Vue.js, Filament, and modern frontend tooling.',
    tags: ['Laravel', 'Vue.js', 'Filament', 'React Native'],
    paths: ['m16 18 6-6-6-6', 'm8 6-6 6 6 6']
  },
  {
    title: 'Backend architecture & APIs',
    description: 'Modular backend systems with clear boundaries, REST or GraphQL APIs, authentication, validation, and testable domain logic.',
    tags: ['DDD', 'Hexagonal', 'CQRS', 'REST / GraphQL'],
    paths: ['M4 4h16v6H4z', 'M4 14h16v6H4z', 'M8 7h.01', 'M8 17h.01']
  },
  {
    title: 'System integration & middleware',
    description: 'Partner APIs, webhooks, queues, idempotency, retries, and synchronization flows that keep separate systems aligned.',
    tags: ['Webhooks', 'Queues', 'Retries', 'Observability'],
    paths: ['M12 2v4', 'M12 18v4', 'M6 12H2', 'M22 12h-4', 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z']
  },
  {
    title: 'ERP & business systems',
    description: 'Purchasing, inventory, sales, reporting, roles, and audit trails shaped around the way your operation actually works.',
    tags: ['ERP', 'Inventory', 'Reporting', 'Audit trails'],
    paths: ['m12 2 9 5-9 5-9-5 9-5Z', 'm3 12 9 5 9-5', 'm3 17 9 5 9-5']
  },
  {
    title: 'Database design & performance',
    description: 'Schemas, indexing, query optimization, migrations, and data integrity work for MySQL and PostgreSQL environments.',
    tags: ['MySQL', 'PostgreSQL', 'Indexing', 'Migrations'],
    paths: ['M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Z', 'M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6', 'M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3']
  },
  {
    title: 'Legacy modernization',
    description: 'Incremental refactoring, framework upgrades, and architecture improvements that reduce risk without stopping delivery.',
    tags: ['Refactoring', 'Upgrades', 'Testing', 'Migration'],
    paths: ['M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M3 21v-5h5', 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5']
  },
  {
    title: 'Technical consulting & audits',
    description: 'Architecture reviews, code audits, delivery guidance, and practical documentation for teams that need a clear next step.',
    tags: ['Architecture', 'Code review', 'Documentation'],
    paths: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z', 'm9 12 2 2 4-4']
  },
  {
    title: 'Teaching, training & mentoring',
    description: 'College instruction, team upskilling, and workshops on backend development, system design, and modern engineering practice.',
    tags: ['Instruction', 'Workshops', 'Mentoring'],
    paths: ['M22 10 12 5 2 10l10 5 10-5Z', 'M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5']
  }
]

const experiences = [
  {
    role: 'Senior Full Stack Developer',
    company: 'Exocoder Inc.',
    dates: 'Jan 2024 – Present',
    details: 'Architecting and shipping Laravel, Symfony, Vue.js, Filament, and React Native products; building middleware and partner API integrations; shaping DDD-aligned backend systems and performance improvements.',
    initials: 'EX',
    logo: '/logos/exocoder.png'
  },
  {
    role: 'Fullstack Developer',
    company: 'Zech Solutions',
    dates: 'Aug 2022 – Feb 2024',
    details: 'Built and maintained ERP modules with Vue.js and Laravel, integrated backend APIs, and delivered full-stack features across multiple business modules.',
    initials: 'ZS'
  },
  {
    role: 'IT Programmer',
    company: 'Bacolod Prosperity Feedmill Corp.',
    dates: 'Jan 2018 – Jan 2024',
    details: 'Developed internal business applications and backend systems, designed database structures, optimized queries, and automated operational workflows.',
    initials: 'BPF'
  }
]

const teaching = [
  {
    institution: 'Bacolod City College',
    role: 'Part-Time IT Instructor',
    dates: '2026 – Present',
    details: 'Teaching application development and information systems, preparing learning materials, and mentoring students through project-based work.',
    initials: 'BCC',
    logo: '/logos/schools/bcc.png',
    current: true
  },
  {
    institution: 'Fellowship Baptist College',
    role: 'Part-Time IT Instructor',
    dates: '2024 – 2025',
    details: 'Delivered lectures on backend development and system design, and guided students through real-world software project implementation.',
    initials: 'FBC',
    logo: '/logos/schools/fbc.png',
    current: false
  },
  {
    institution: 'Carlos Hilado Memorial State University',
    role: 'Part-Time IT Instructor',
    dates: '2023 – 2024',
    details: 'Supported programming and information systems courses, prepared instructional materials, and mentored student capstone projects.',
    initials: 'CHMSU',
    logo: '/logos/schools/chmsu.png',
    current: false
  }
]

const education = [
  {
    credential: 'Doctor in Information Technology · Ongoing',
    school: 'State University of Northern Negros',
    dates: '2024 – Present',
    initials: 'SUNN',
    logo: '/logos/schools/sunn.png'
  },
  {
    credential: 'Master in Information Technology',
    school: 'State University of Northern Negros',
    dates: '2021 – 2023',
    initials: 'SUNN',
    logo: '/logos/schools/sunn.png'
  },
  {
    credential: 'BS Information Systems · Cum Laude',
    school: 'Carlos Hilado Memorial State University',
    dates: '2014 – 2018',
    initials: 'CHMSU',
    logo: '/logos/schools/chmsu.png'
  }
]

let revealObserver: IntersectionObserver | undefined
let clockTimer: ReturnType<typeof setInterval> | undefined

function observeReveals() {
  if (!revealObserver) return
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
    if (!element.classList.contains('is-visible')) revealObserver?.observe(element)
  })
}

function updateLocalTime() {
  localTime.value = new Intl.DateTimeFormat('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
    hour12: true
  }).format(new Date())
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') mobileMenuOpen.value = false
}

const desktopQuery = window.matchMedia('(min-width: 901px)')

function handleDesktopChange(event: MediaQueryListEvent) {
  if (event.matches) mobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  desktopQuery.addEventListener('change', handleDesktopChange)
  updateLocalTime()
  clockTimer = setInterval(updateLocalTime, 30000)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  document.documentElement.classList.add('reveal-enabled')
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        revealObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  )
  observeReveals()
})

watch(filteredProjects, async () => {
  await nextTick()
  document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => card.classList.add('is-visible'))
})

watch(mobileMenuOpen, (isOpen) => {
  document.body.classList.toggle('menu-open', isOpen)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  desktopQuery.removeEventListener('change', handleDesktopChange)
  revealObserver?.disconnect()
  if (clockTimer) clearInterval(clockTimer)
  document.documentElement.classList.remove('reveal-enabled')
  document.body.classList.remove('menu-open')
})
</script>

<template>
  <svg class="svg-sprite" aria-hidden="true" focusable="false">
    <symbol id="icon-github" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.18c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .96-.31 3.14 1.18a10.9 10.9 0 0 1 5.72 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
    </symbol>
    <symbol id="icon-linkedin" viewBox="0 0 24 24">
      <path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/>
    </symbol>
    <symbol id="icon-mail" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/>
      <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>
    <symbol id="icon-download" viewBox="0 0 24 24">
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>
    <symbol id="icon-pin" viewBox="0 0 24 24">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/>
    </symbol>
  </svg>

  <div>
    <a class="skip-link" href="#main-content">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="#home" aria-label="Eduard Rino Q. Carton home">
        <span class="brand-mark">EC</span>
        <span>EDUARD RINO Q. CARTON<span class="brand-dot">.</span></span>
      </a>
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="mobileMenuOpen"
        aria-controls="primary-navigation"
        :aria-label="mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        {{ mobileMenuOpen ? 'Close' : 'Menu' }}
      </button>
      <nav id="primary-navigation" :class="{ 'nav-open': mobileMenuOpen }" aria-label="Main navigation">
        <a href="#work" @click="mobileMenuOpen = false">Work</a>
        <a href="#services" @click="mobileMenuOpen = false">Services</a>
        <a href="#expertise" @click="mobileMenuOpen = false">Expertise</a>
        <a href="#experience" @click="mobileMenuOpen = false">Experience</a>
        <a href="#about" @click="mobileMenuOpen = false">About</a>
        <a class="nav-contact" href="#contact" @click="mobileMenuOpen = false">Let's talk <span>↗</span></a>
      </nav>
    </header>

    <main id="main-content">
      <section id="home" class="hero section-wrap">
        <div class="hero-copy" data-reveal>
          <div class="eyebrow"><span class="status-dot"></span> SENIOR FULL-STACK DEVELOPER · EDUCATOR</div>
          <h1>Building software <br />that <span class="gradient-text">works beyond</span> <br />the happy path.</h1>
          <p class="hero-lead">I'm Eduard Rino Q. Carton — a Philippines-based full-stack developer and part-time IT instructor focused on business applications, reliable APIs, system integrations, and maintainable backend architecture.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#work">Explore selected work <span>↘</span></a>
            <a class="button button-quiet" href="/Eduard-Carton-CV.pdf" download>
              Download CV <svg class="icon" aria-hidden="true"><use href="#icon-download" /></svg>
            </a>
          </div>
          <div class="hero-meta">
            <div><strong>8+ years</strong><span>Building production systems</span></div>
            <div><strong>Laravel · Vue · Symfony</strong><span>Core full-stack stack</span></div>
            <div><strong>3 institutions</strong><span>Teaching IT part-time</span></div>
          </div>
          <p class="micro-note"><span class="status-dot"></span> Based in Bacolod City, Philippines · Available for full-time, freelance, and consulting work.</p>
        </div>

        <div class="hero-visual" data-reveal style="--reveal-delay: 120ms">
          <div class="visual-grid"></div>
          <div class="visual-orbit orbit-one"></div>
          <div class="visual-orbit orbit-two"></div>
          <div class="portrait-glow"></div>
          <figure class="portrait-card">
            <div class="portrait-image">
              <img
                src="/images/eduard-carton.webp"
                alt="Portrait of Eduard Rino Q. Carton"
                width="600"
                height="600"
                fetchpriority="high"
              />
            </div>
            <figcaption class="portrait-caption">
              <span class="portrait-name">Eduard Rino Q. Carton</span>
              <span class="portrait-role">Full-Stack Developer · IT Instructor</span>
            </figcaption>
            <span class="portrait-badge"><span class="status-dot"></span> Open to work</span>
          </figure>
          <div class="float-card card-api">
            <span class="mini-icon purple">8+</span>
            <div><b>Years shipping</b><small>Business systems &amp; APIs</small></div>
          </div>
          <div class="float-card card-architecture">
            <span class="mini-icon green">⌘</span>
            <div><b>3 institutions</b><small>Teaching &amp; mentoring</small></div>
          </div>
          <div class="float-card card-delivery">
            <span class="mini-icon orange">PH</span>
            <div><b>Bacolod, PH</b><small>Remote · GMT+8</small></div>
          </div>
        </div>
      </section>

      <section class="trust-strip" aria-label="Technologies I work with">
        <div class="section-wrap trust-inner">
          <div class="trust-label" data-reveal>
            <span>MY TOOLKIT</span>
            <p>Technologies I use to design, build, and ship.</p>
          </div>
          <div class="logo-marquee" data-reveal style="--reveal-delay: 80ms">
            <div class="logo-track">
              <div class="logo-group">
                <span v-for="tech in technologies" :key="tech.name" class="logo-item">
                  <img :src="tech.logo" alt="" width="20" height="20" loading="lazy" />
                  <b>{{ tech.name }}</b>
                </span>
              </div>
              <div class="logo-group" aria-hidden="true">
                <span v-for="tech in technologies" :key="`${tech.name}-clone`" class="logo-item">
                  <img :src="tech.logo" alt="" width="20" height="20" loading="lazy" />
                  <b>{{ tech.name }}</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" class="section-wrap section-block">
        <div class="section-heading" data-reveal>
          <div><div class="eyebrow">SELECTED WORK</div><h2>Projects with a purpose.</h2></div>
          <p>Professional experience and independent builds, presented with clear context about my role and what can be shared.</p>
        </div>
        <div class="filter-row" role="group" aria-label="Filter projects">
          <button v-for="filter in projectFilters" :key="filter" class="filter-button" :class="{ active: activeFilter === filter }" :aria-pressed="activeFilter === filter" @click="setFilter(filter)">
            {{ filter === 'Professional experience' ? 'Professional work' : filter === 'Independent project' ? 'Independent builds' : filter }}
          </button>
        </div>
        <div class="project-grid">
          <article v-for="(project, index) in filteredProjects" :key="project.title" class="project-card" :class="{ 'project-featured': project.featured }" data-reveal :style="`--reveal-delay:${index * 60}ms`">
            <div class="project-art" :class="'art-' + (projects.indexOf(project) + 1)">
              <div class="art-topline"><span>{{ project.category === 'Independent project' ? 'INDEPENDENT BUILD' : 'PROFESSIONAL EXPERIENCE' }}</span><span>0{{ projects.indexOf(project) + 1 }}</span></div>
              <div v-if="project.title.includes('Integration')" class="integration-art">
                <div class="node node-partner">Partner APIs</div><div class="node-link"></div><div class="node node-core">Integration<br />Core</div><div class="node-link"></div><div class="node node-data">Events + logs</div>
              </div>
              <div v-else-if="project.title.includes('ERP')" class="erp-art">
                <div class="mock-window"><div class="mock-sidebar"></div><div class="mock-main"><i></i><i></i><i></i><div class="mock-chart"></div></div></div>
              </div>
              <div v-else class="abstract-art"><span>{{ project.title === 'Getko PH' ? 'DDD' : project.title === 'Energy Vision' ? 'API' : project.title === 'Petcheckr' ? 'APP' : project.title === 'Pakske' ? 'WEB' : 'SYS' }}</span><div class="abstract-line"></div><div class="abstract-line short"></div></div>
              <span class="art-corner">{{ project.category === 'Independent project' ? 'CONCEPT / BUILD' : 'SELECTED EXPERIENCE' }}</span>
            </div>
            <div class="project-content">
              <div class="project-type">{{ project.type }}</div>
              <div class="project-title-row"><h3>{{ project.title }}</h3><span class="project-arrow">↗</span></div>
              <p>{{ project.description }}</p>
              <div class="tag-list">
                <span v-for="tag in project.stack.slice(0, 5)" :key="tag">
                  <img v-if="tagLogo(tag)" :src="tagLogo(tag)" alt="" width="12" height="12" loading="lazy" />
                  {{ tag }}
                </span>
              </div>
              <details class="project-details">
                <summary>View project notes <span>＋</span></summary>
                <ul><li v-for="item in project.highlights" :key="item">{{ item }}</li></ul>
                <p class="disclosure-note">{{ project.note }}</p>
              </details>
              <div class="project-status">{{ project.status }}</div>
            </div>
          </article>
        </div>
        <p class="section-footnote">Professional project summaries are intentionally high-level. No employer source code, confidential implementation details, or client data are included.</p>
      </section>

      <section id="services" class="services-section">
        <div class="section-wrap section-block">
          <div class="section-heading" data-reveal>
            <div><div class="eyebrow">SERVICES</div><h2>How I can help.</h2></div>
            <p>From a focused API integration to a complete business application, I can help scope, build, and maintain the system around your operation.</p>
          </div>
          <div class="service-grid">
            <article v-for="(service, index) in services" :key="service.title" class="service-card" data-reveal :style="`--reveal-delay:${index * 40}ms`">
              <div class="service-top">
                <span class="service-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path v-for="path in service.paths" :key="path" :d="path" />
                  </svg>
                </span>
                <span class="service-index">0{{ index + 1 }}</span>
              </div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <ul class="service-tags">
                <li v-for="tag in service.tags" :key="tag">{{ tag }}</li>
              </ul>
            </article>
          </div>
          <div class="service-cta" data-reveal>
            <div>
              <span class="eyebrow">HAVE SOMETHING IN MIND?</span>
              <p>Tell me what you're building, what's slowing you down, or where the architecture needs clarity.</p>
            </div>
            <a class="button button-primary" href="#contact">Discuss a project <span>↗</span></a>
          </div>
        </div>
      </section>

      <section id="expertise" class="expertise-section">
        <div class="section-wrap section-block">
          <div class="section-heading" data-reveal>
            <div><div class="eyebrow">WHAT I BRING</div><h2>Thoughtful engineering. <br /><span class="muted-heading">Practical outcomes.</span></h2></div>
            <p>I care about the decisions behind the code: clear boundaries, predictable behavior, useful tests, and systems that are easier to change.</p>
          </div>
          <div class="expertise-grid">
            <article v-for="(skill, i) in skills" :key="skill.title" class="expertise-card" data-reveal :style="`--reveal-delay:${i * 70}ms`">
              <span class="expertise-number">0{{ i + 1 }}</span>
              <h3>{{ skill.title }}</h3>
              <p>{{ skill.items }}</p>
              <div class="skill-logos">
                <img v-for="logo in skill.logos" :key="logo" :src="logo" alt="" width="16" height="16" loading="lazy" />
              </div>
            </article>
          </div>
          <div class="principles" data-reveal>
            <div><span>01</span><b>Clarity over cleverness</b><p>Design for the next developer who needs to understand and change the system.</p></div>
            <div><span>02</span><b>Reliability is a feature</b><p>Consider validation, failure handling, observability, and repeatable tests.</p></div>
            <div><span>03</span><b>Architecture serves the problem</b><p>Use patterns where they help, not just because they are fashionable.</p></div>
          </div>
        </div>
      </section>

      <section id="experience" class="section-wrap section-block">
        <div class="section-heading" data-reveal>
          <div><div class="eyebrow">CAREER</div><h2>Experience that compounds.</h2></div>
          <p>A career spanning internal business applications, ERP development, full-stack engineering, and part-time teaching.</p>
        </div>
        <div class="timeline">
          <article v-for="(job, index) in experiences" :key="job.company" class="timeline-item" data-reveal :style="`--reveal-delay:${index * 60}ms`">
            <div class="timeline-marker" :class="{ 'has-logo': job.logo }">
              <img v-if="job.logo" :src="job.logo" :alt="`${job.company} logo`" width="48" height="48" loading="lazy" />
              <span v-else>{{ job.initials }}</span>
            </div>
            <div class="timeline-body">
              <div class="timeline-top"><h3>{{ job.role }}</h3><span>{{ job.dates }}</span></div>
              <h4>{{ job.company }}</h4>
              <p>{{ job.details }}</p>
            </div>
          </article>
        </div>

        <div class="teaching-block" data-reveal>
          <div class="teaching-heading">
            <div>
              <div class="eyebrow">ACADEME</div>
              <h3>Teaching &amp; mentorship</h3>
            </div>
            <p>I teach part-time because explaining hard ideas clearly makes me a better engineer — and it keeps me connected to the next generation of developers.</p>
          </div>
          <div class="teaching-grid">
            <article v-for="role in teaching" :key="role.institution" class="teaching-card" :class="{ 'is-current': role.current }">
              <div class="teaching-top">
                <span class="org-mark" :class="{ 'has-logo': role.logo }">
                  <img v-if="role.logo" :src="role.logo" alt="" width="44" height="44" loading="lazy" />
                  <template v-else>{{ role.initials }}</template>
                </span>
                <span v-if="role.current" class="current-badge"><span class="status-dot"></span> Current</span>
                <span v-else class="teaching-dates">{{ role.dates }}</span>
              </div>
              <h3>{{ role.institution }}</h3>
              <p class="teaching-role">{{ role.role }}</p>
              <span v-if="role.current" class="teaching-dates">{{ role.dates }}</span>
              <p class="teaching-detail">{{ role.details }}</p>
            </article>
          </div>
        </div>

      </section>

      <section id="about" class="about-section">
        <div class="section-wrap about-layout">
          <div data-reveal><div class="eyebrow">A LITTLE ABOUT ME</div><h2>Business context <br />meets engineering.</h2></div>
          <div class="about-copy" data-reveal style="--reveal-delay: 100ms">
            <p>I work where software meets real operational needs: internal business tools, ERP workflows, APIs, and integrations between systems. My approach is to understand the problem, choose a proportionate design, and build something that can be tested, understood, and maintained.</p>
            <p>My background includes a Bachelor of Science in Information Systems (Cum Laude), a Master in Information Technology, and ongoing doctoral study. I also teach part-time at Bacolod City College, which keeps me sharp at explaining technical ideas clearly and mentoring people through real project work.</p>
            <div class="education-list">
              <div v-for="item in education" :key="item.credential" class="education-row">
                <span class="education-icon" :class="{ 'has-logo': item.logo }">
                  <img v-if="item.logo" :src="item.logo" alt="" width="46" height="46" loading="lazy" />
                  <template v-else>{{ item.initials }}</template>
                </span>
                <div><b>{{ item.credential }}</b><small>{{ item.school }} · {{ item.dates }}</small></div>
              </div>
            </div>
            <div class="about-actions">
              <a class="text-link" href="#contact">Let's discuss a project <span>↗</span></a>
              <a class="text-link" href="/Eduard-Carton-CV.pdf" download>Download my CV <svg class="icon" aria-hidden="true"><use href="#icon-download" /></svg></a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="section-wrap contact-section">
        <div class="contact-panel" data-reveal>
          <div class="contact-main">
            <div class="eyebrow">LET'S CONNECT</div>
            <h2>Have a system to build <br />or a problem to solve?</h2>
            <p>I'm open to full-time engineering roles, freelance builds, technical consulting, and teaching collaborations involving business applications, backend systems, and integrations.</p>
            <div class="contact-actions">
              <a class="button button-primary" href="mailto:eduard16carton@gmail.com">Email me <span>↗</span></a>
              <a class="button button-outline" href="https://www.linkedin.com/in/eduard-rino-carton-65a15623b/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
              <a class="button button-outline" href="https://github.com/awtsmahalko" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
              <a class="button button-outline" href="/Eduard-Carton-CV.pdf" download>
                Download CV <svg class="icon" aria-hidden="true"><use href="#icon-download" /></svg>
              </a>
            </div>
          </div>
          <div class="contact-aside">
            <div class="contact-detail">
              <span class="contact-label">Email</span>
              <a href="mailto:eduard16carton@gmail.com">eduard16carton@gmail.com</a>
            </div>
            <div class="contact-detail">
              <span class="contact-label">Phone</span>
              <a href="tel:+639912236408">+63 991 223 6408</a>
            </div>
            <div class="contact-detail">
              <span class="contact-label">Location</span>
              <span><svg class="icon" aria-hidden="true"><use href="#icon-pin" /></svg> Bacolod City, Philippines</span>
            </div>
            <div class="contact-detail">
              <span class="contact-label">Local time</span>
              <span class="local-time">{{ localTime }} · GMT+8</span>
            </div>
            <div class="availability-badge"><span class="status-dot"></span> Available for new work</div>
          </div>
          <div class="contact-decoration" aria-hidden="true">EC<span>.</span></div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-main">
        <a class="brand footer-brand" href="#home"><span class="brand-mark">EC</span><span>EDUARD RINO Q. CARTON<span class="brand-dot">.</span></span></a>
        <p>Full-stack developer &amp; educator building dependable business systems from Bacolod City.</p>
      </div>
      <div class="footer-socials">
        <a href="mailto:eduard16carton@gmail.com" aria-label="Email Eduard Rino Q. Carton"><svg class="icon" aria-hidden="true"><use href="#icon-mail" /></svg></a>
        <a href="https://github.com/awtsmahalko" target="_blank" rel="noreferrer" aria-label="GitHub profile"><svg class="icon" aria-hidden="true"><use href="#icon-github" /></svg></a>
        <a href="https://www.linkedin.com/in/eduard-rino-carton-65a15623b/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><svg class="icon" aria-hidden="true"><use href="#icon-linkedin" /></svg></a>
        <a href="/Eduard-Carton-CV.pdf" download aria-label="Download CV"><svg class="icon" aria-hidden="true"><use href="#icon-download" /></svg></a>
      </div>
      <div class="footer-meta">
        <span>© {{ currentYear }} Eduard Rino Q. Carton</span>
        <span>Designed &amp; built with Vue 3</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  </div>
</template>
