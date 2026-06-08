# Archive Report: migrate-projects-content-collections

**Change**: migrate-projects-content-collections
**Status**: COMPLETE
**Archived**: 2026-06-08
**Mode**: hybrid (openspec files + engram)

## Executive Summary

Migrated all project data from a static TypeScript array (`src/data/projects.ts`) to Astro Content
Collections using Markdown files. Implemented via antigravity CLI, then synced to engram manually.

## Verification Results

| Gate | Result |
|------|--------|
| `npx astro check` | PASS (0 errors, 0 warnings) |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS (all routes generated) |

## Key Technical Decisions

1. Keep `TAGS` map in TS — can't import Astro components in MD frontmatter.
2. Tag keys lowercased to match Zod schema strings.
3. Case study body in markdown body (not frontmatter) — rendered via `render(entry)`.
4. Scoped CSS with `@apply` + `:global` for typography (no `@tailwindcss/typography`).
5. `src/env.d.ts` wildcard needed for `tsc --noEmit` to pass with `.astro` imports.
