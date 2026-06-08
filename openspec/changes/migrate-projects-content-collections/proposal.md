# Proposal: Migrate Projects to Content Collections

## Intent

Migrate projects data from a static TypeScript array to Astro Content Collections using Markdown files. This decouples content from UI rendering logic, supports markdown styling in case studies, and enforces schema safety via Zod.

## Scope

### In Scope
- Create `src/content/projects/` directory containing Markdown files for the 4 existing projects.
- Configure `src/content.config.ts` to define the `projects` collection with a Zod validation schema.
- Update `src/components/CaseStudy.astro` to render markdown body using `render(entry)` and apply custom styling for typography tags.
- Update `src/components/Projects.astro` and `src/pages/projects/[slug].astro` to query the content collection instead of the static `PROJECTS` array.
- Update `src/data/projects.ts` to expose the lowercased tag mapping and icons, deprecating the `PROJECTS` array.

### Out of Scope
- Adding the `@tailwindcss/typography` plugin.
- Redesigning the UI layout or visual styles.
- Creating new case studies for projects that currently do not have one.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- None

## Approach

Define the `projects` collection in `src/content.config.ts` using the glob loader and a Zod schema validating frontmatter metadata. Convert static projects into Markdown files, placing the case study body in the markdown content. Query the collection in listing and slug pages, sorting by the `order` field.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/content.config.ts` | New | Schema validation definition via Zod. |
| `src/content/projects/` | New | Markdown data files representing the 4 projects. |
| `src/data/projects.ts` | Modified | Deprecate `PROJECTS` array, retain tag mapping and icons. |
| `src/components/Projects.astro` | Modified | Query projects collection for listing. |
| `src/components/CaseStudy.astro` | Modified | Render case study markdown and apply typography styles. |
| `src/pages/projects/[slug].astro` | Modified | Query projects collection to dynamically load slug paths. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Image loading breakage | Low | Verify that dynamic import mapping for `src/assets/projects/` works with the frontmatter string values. |
| Styling regressions | Med | Carefully scope CSS styles inside `CaseStudy.astro` to format headings, paragraphs, lists, and code blocks. |
| TypeScript check failures | Low | Ensure Zod schema type-matches expected tags enum and verify build with `npx astro check`. |

## Rollback Plan

Discard workspace changes using `git checkout -- src/` and delete `src/content.config.ts` and `src/content/projects/`, restoring the static array structure.

## Dependencies

- None

## Success Criteria

- [ ] `npm run build` and `npx astro check` compile successfully.
- [ ] Home page correctly lists the projects with icons and links.
- [ ] Case study page `/projects/dental-clinic` displays markdown sections with proper styling.
- [ ] Static `PROJECTS` array is completely removed from `src/data/projects.ts`.
