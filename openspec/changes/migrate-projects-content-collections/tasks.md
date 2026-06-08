# Tasks: Migrate Projects to Content Collections

## Review Workload Forecast

<!-- review-workload-forecast-start -->
- **Estimated changed lines**: ~450
- **Chained PRs recommended**: Yes
- **400-line budget risk**: High
- **Decision needed before apply**: Yes
- <!-- review-workload-forecast-end -->

## Phase 1: Infrastructure / Foundation
- [x] Create content collections config: [src/content.config.ts](file:///home/ginopc/Desarrollo/mi-portfolio/src/content.config.ts) with `projects` collection definition and Zod schema.
- [x] Create project content files directory: `src/content/projects/`.
- [x] Create Dental Clinic content: [src/content/projects/dental-clinic.md](file:///home/ginopc/Desarrollo/mi-portfolio/src/content/projects/dental-clinic.md) containing frontmatter metrics and case study markdown.
- [x] Create Movies App content: [src/content/projects/movies-app.md](file:///home/ginopc/Desarrollo/mi-portfolio/src/content/projects/movies-app.md) containing project metadata frontmatter.
- [x] Create Spotify Clone content: [src/content/projects/spotify-clone.md](file:///home/ginopc/Desarrollo/mi-portfolio/src/content/projects/spotify-clone.md) containing project metadata frontmatter.
- [x] Create Mercado Liebre content: [src/content/projects/mercado-liebre.md](file:///home/ginopc/Desarrollo/mi-portfolio/src/content/projects/mercado-liebre.md) containing project metadata frontmatter.

## Phase 2: Core Implementation
- [x] Refactor static data: [src/data/projects.ts](file:///home/ginopc/Desarrollo/mi-portfolio/src/data/projects.ts) to remove `PROJECTS` array and obsolete TypeScript types/interfaces.
- [x] Standardize keys: [src/data/projects.ts](file:///home/ginopc/Desarrollo/mi-portfolio/src/data/projects.ts) to use lowercase string-based keys for the `TAGS` map matching Zod schema.
- [x] Refactor listing page: [src/components/Projects.astro](file:///home/ginopc/Desarrollo/mi-portfolio/src/components/Projects.astro) to fetch and display projects using Astro's `getCollection("projects")`.

## Phase 3: Integration / Wiring
- [x] Refactor routing page: [src/pages/projects/[slug].astro](file:///home/ginopc/Desarrollo/mi-portfolio/src/pages/projects/[slug].astro) to generate paths from collections entries and pass entry to template.
- [x] Refactor detail template: [src/components/CaseStudy.astro](file:///home/ginopc/Desarrollo/mi-portfolio/src/components/CaseStudy.astro) to accept entry, map tags, and render the markdown content using the `render` helper.
- [x] Add layout typography styles: [src/components/CaseStudy.astro](file:///home/ginopc/Desarrollo/mi-portfolio/src/components/CaseStudy.astro) styling markdown elements (`h2`, `p`, `ul`, `code`, `strong`) since Tailwind Typography is out of scope.

## Phase 4: Testing / Verification
- [x] Validate Astro files and collection frontmatter types: Run `npx astro check`.
- [x] Run global TypeScript check: Run `npx tsc --noEmit`.
- [x] Run production static site build: Run `npm run build`.
- [x] Verify paths visually: Validate homepage `/` rendering and case study route `/projects/dental-clinic` locally.

## Phase 5: Cleanup / Documentation
- [x] Inspect git diff: Ensure no residual test logs or unused imports remain in modified files.
