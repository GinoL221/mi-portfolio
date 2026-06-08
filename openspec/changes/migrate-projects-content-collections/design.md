# Technical Design: Migrate Projects to Content Collections

This design document outlines the migration of projects data from a static TypeScript array in `src/data/projects.ts` to Astro Content Collections. This migration improves type safety, separation of concerns, and content maintainability.

## 1. Technical Approach

We will define a new `projects` content collection using Astro 5's `defineCollection` and `glob` loader.
1. **Content Schema & Files**: We will create `src/content.config.ts` and define the Zod schema for `projects` to validate frontmatter fields. Each project will have a Markdown file in `src/content/projects/`.
2. **Refactoring Data**: We will refactor `src/data/projects.ts` to keep only the `TAGS` mapping, which maps keys to Astro icon components and CSS classes. The `PROJECTS` array and other interfaces will be removed.
3. **Component Refactoring**:
   - `Projects.astro` will fetch the projects using `getCollection("projects")`, sort them by `order`, and resolve the tag strings using the `TAGS` map.
   - `CaseStudy.astro` will receive `CollectionEntry<"projects">`, render markdown narrative using Astro's `render(entry)` utility, and apply scoped CSS for markdown elements (lists, code blocks, etc.).
4. **Dynamic Routing**: `src/pages/projects/[slug].astro` will use `getCollection` to filter and map paths based on the `projects` collection entry `id`.

---

## 2. Architecture Decisions

| Decision | Option Selected | Tradeoffs / Rationale |
| :--- | :--- | :--- |
| **Data Storage** | Markdown files in `src/content/projects/` | **Pros**: Fits Astro's content collection system; enables rich text styling without custom HTML/JSX mapping. <br>**Cons**: Requires markdown parsing overhead (negligible). |
| **Tag Resolution** | Keep `TAGS` map in `src/data/projects.ts` | **Pros**: Cannot import Astro components dynamically inside Markdown frontmatter; keeping mapping in TS maintains type safety and asset compilation. |
| **Case Study Body** | Markdown body with `render(project)` | **Pros**: Replaces complex array-of-objects structure with standard Markdown, simplifying authoring. |

---

## 3. Data Flow

```text
Markdown Files (src/content/projects/*.md)
        │
        ▼ (Astro glob loader + Zod validation)
src/content.config.ts (Collection definition)
        │
        ├─────────────────────────────────────────┐
        ▼ (getCollection + sort)                  ▼ (render & getStaticPaths)
src/components/Projects.astro             src/pages/projects/[slug].astro
        │ (resolve tags via TAGS map)             │
        │                                         ▼
        │                                 src/components/CaseStudy.astro
        │                                         │
        ▼                                         ▼ (Render markdown content)
   HTML Output                               HTML + Scoped Markdown CSS
```

---

## 4. File Changes

- **`src/content.config.ts`**: Create file to define and export the `projects` collection using `glob` loader.
- **`src/content/projects/`**: Create directory and 4 markdown files:
  - `dental-clinic.md`
  - `movies-app.md`
  - `spotify-clone.md`
  - `mercado-liebre.md`
- **`src/data/projects.ts`**: Delete `PROJECTS` array, `Project`, `CaseStudy`, `CaseStudySection`, `CaseStudyMetric`, and `Tag` interfaces. Keep only `TAGS` map.
- **`src/components/Projects.astro`**: Refactor to use `getCollection`, sort by `order`, and resolve tags with `TAGS` map.
- **`src/components/CaseStudy.astro`**: Update props to accept `CollectionEntry<"projects">`, use `render`, resolve tags, and add scoped CSS for markdown content.
- **`src/pages/projects/[slug].astro`**: Update `getStaticPaths` to filter and return project collection entries, and use entry `id` as slug.

---

## 5. Interfaces / Contracts

### Content Collection Schema (`src/content.config.ts`)
```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string(),
    github: z.string(),
    image: z.string(),
    order: z.number(),
    tags: z.array(z.string()),
    tagline: z.string().optional(),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ).optional(),
  }),
});
```

---

## 6. Testing Strategy

1. **Schema Validation**: Run `npm run astro check` or build to verify frontmatter fields against Zod constraints.
2. **Page & Route Verification**: Access `/` and `/projects/dental-clinic` to verify metadata, lists, images, and links are rendering identically.
3. **Case Study Styles**: Visually inspect list elements and inline code blocks in the Dental Clinic case study to ensure styles match design requirements.

---

## 7. Migration / Rollout

1. Implement `src/content.config.ts`.
2. Extract projects from `src/data/projects.ts` into Markdown files.
3. Remove `PROJECTS` and unused interfaces from `src/data/projects.ts`.
4. Refactor `Projects.astro`, `[slug].astro`, and `CaseStudy.astro`.
5. Run dev server, check console for loader issues, and visually verify site.

---

## 8. Open Questions

- *Should tag keys be constrained to a TypeScript/Zod Enum?*
  - **Resolution**: While a Zod enum ensures frontend alignment, a simple string array is more future-proof and keeps the schema decoupled from the icon mapping code. We will resolve them dynamically and return null if a tag is missing.
