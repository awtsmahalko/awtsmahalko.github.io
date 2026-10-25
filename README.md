# Eduard Rino Q. Carton — Developer Portfolio

A responsive single-page portfolio for Eduard Rino Q. Carton, a senior full-stack developer and part-time IT instructor based in Bacolod City, Philippines. Built with Vue 3, TypeScript, and Vite, and deployed with GitHub Pages.

## Features

- Portrait hero with availability, experience, and local-time details
- Technology marquee, project tags, and skill logos using locally hosted SVG assets
- Filterable professional and independent project case studies
- Services, expertise, experience timeline, teaching roles, and education
- Downloadable CV and real contact/social links
- SEO metadata, Open Graph/Twitter card, JSON-LD Person schema, `robots.txt`, and `sitemap.xml`
- Accessible navigation, focus states, reduced-motion support, and responsive layouts

## Project structure

```
src/App.vue          Content, data arrays, and page interactions
src/style.css        Design system and responsive styles
public/images/       Profile photo (WebP) and social preview image
public/logos/        Locally hosted technology and company logos
public/              CV PDF, favicon, robots, sitemap
index.html           Metadata and structured data
```

## Run locally

Install Node.js 20+ (Node.js 22 is used in the GitHub Actions workflow).

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Editing content

Most content lives in typed data arrays at the top of `src/App.vue`:

- `projects`, `services`, `skills`, `technologies`
- `experiences`, `teaching`, `education`

Contact details, social links, and the CV path are used directly in the template. Keep `index.html` metadata and JSON-LD in sync when changing the page title, role, or contact information.

## Deploy to GitHub Pages

1. Push the project to a repository named `awtsmahalko.github.io`.
2. In the repository, open **Settings → Pages**.
3. Under build and deployment, choose **GitHub Actions**.
4. Wait for the workflow to finish. The site will be published at `https://awtsmahalko.github.io/`.

`vite.config.ts` uses `base: '/'`, which is correct for a root user site. For a project site such as `username.github.io/portfolio/`, update `base` to `/portfolio/`.

## Content notes

- Employment dates, teaching roles, education, and project descriptions should be verified before publishing.
- Do not publish employer or client code, private screenshots, internal architecture, credentials, or client data without authorization.
- Independent projects are labeled as such; keep that distinction accurate when editing.
- Institution and company logos are trademarks of their respective owners and are used here for identification.
