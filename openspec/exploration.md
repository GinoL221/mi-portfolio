# Exploration: Migrating Projects to Astro Content Collections

This document explores the migration of projects data in `mi-portfolio` to Astro Content Collections using the modern Content Layer API introduced in Astro v5.

## 1. Context & Objectives
Currently, projects are defined as a static TypeScript array in [projects.ts](file:///home/ginopc/Desarrollo/mi-portfolio/src/data/projects.ts). The data structure mixes content (texts, metrics, case study sections) and UI/rendering concerns (Astro component icons, CSS class references).

The objective is to migrate this data into Astro Content Collections (`src/content/projects`) to:
- Decouple raw content from layout/rendering logic.
- Support markdown formatting inside case studies.
- Ensure strict type safety and data validation with Zod.

---

## 2. Option Comparison

### Option 1: Markdown Files (.md) with Case Study Body
Projects are converted to markdown files under `src/content/projects/`. Metadata is stored in the frontmatter, and the case study narrative is written directly in the markdown body.

#### File Structure
```text
src/
├── content/
│   └── projects/
│       ├── dental-clinic.md
│       ├── movies-app.md
│       ├── spotify-clone.md
│       └── mercado-liebre.md
```

#### Example Content File (`src/content/projects/dental-clinic.md`)
```markdown
---
order: 1
title: "Dental Clinic - Sistema de Gestión Full Stack"
description: "Sistema integral para la gestión de clínicas dentales con Java..."
link: "https://github.com/GinoL221/Dental-Clinic"
github: "https://github.com/GinoL221/Dental-Clinic"
image: "home-dental-clinic.webp"
tags:
  - java
  - springboot
  - react
  - mysql
  - jwt
caseStudy:
  slug: "dental-clinic"
  tagline: "Cómo encontré un eval() sobre HTML del servidor en el flujo de login y lo rediseñé limpio."
  metrics:
    - label: "eval() eliminados"
      value: "0"
    - label: "Tests en main"
      value: "37"
    - label: "Bugs corregidos"
      value: "5"
    - label: "Archivos de código muerto eliminados"
      value: "7"
---
## El problema

Durante una auditoría sistemática del frontend de Dental Clinic encontré que el flujo de login ejecutaba eval() sobre HTML crudo devuelto por el servidor...

## El enfoque

Reemplacé el contrato implícito por un contrato JSON explícito...
```

#### Collection Schema (`src/content.config.ts`)
```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro:loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    description: z.string(),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
    image: z.string(),
    tags: z.array(z.enum(["next", "astro", "tailwindcss", "javascript", "react", "java", "springboot", "mysql", "jwt", "css"])),
    caseStudy: z.object({
      slug: z.string(),
      tagline: z.string(),
      metrics: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      ),
    }).optional(),
  }),
});

export const collections = { projects };
```

#### Rationale for UI Mapping
Frontmatter cannot store reference imports like `AstroIcon` or CSS class strings directly. We resolve this by converting the `TAGS` dictionary in `projects.ts` to map lowercase keys (string-based identifiers) to UI elements:
```typescript
import AstroIcon from "@/icons/AstroIcon.astro";
// ... other imports

export const TAGS = {
  astro: {
    name: "Astro",
    class: "bg-[#00040a] text-white",
    icon: AstroIcon,
  },
  // ...
} as const;
```
In the template:
```astro
---
const projectTags = tags.map(tagKey => TAGS[tagKey]).filter(Boolean);
---
```

---

### Option 2: JSON/YAML Data Files
Projects are defined in JSON or YAML files under `src/content/projects/`. We use a data collection schema (`type: 'data'` or standard glob loader targeting `.yaml` / `.json` files), preserving the exact JSON structure of case study sections.

#### File Structure
```text
src/
├── content/
│   └── projects/
│       ├── dental-clinic.yaml
│       ├── movies-app.yaml
│       ├── spotify-clone.yaml
│       └── mercado-liebre.yaml
```

#### Example Content File (`src/content/projects/dental-clinic.yaml`)
```yaml
order: 1
title: "Dental Clinic - Sistema de Gestión Full Stack"
description: "Sistema integral para la gestión de clínicas dentales..."
link: "https://github.com/GinoL221/Dental-Clinic"
github: "https://github.com/GinoL221/Dental-Clinic"
image: "home-dental-clinic.webp"
tags:
  - java
  - springboot
caseStudy:
  slug: "dental-clinic"
  tagline: "Cómo encontré un eval() sobre HTML..."
  metrics:
    - label: "eval() eliminados"
      value: "0"
  sections:
    - heading: "El problema"
      body:
        - "Durante una auditoría sistemática..."
        - "El problema de raíz era..."
    - heading: "El enfoque"
      body:
        - "Reemplacé el contrato implícito..."
```

---

## 3. Tradeoffs & Recommendation

| Criteria | Option 1 (Markdown) | Option 2 (JSON/YAML) |
|---|---|---|
| **Authoring Experience** | **Excellent**. Case study narrative is written directly in standard markdown paragraphs. | **Poor**. Content must be written in nested yaml strings or arrays of strings, making styling and layout changes painful. |
| **Rich Text Support** | **Built-in**. Supports bold, italics, code blocks, tables, and lists out of the box. | **None/Manual**. Requires parsing html or embedding markdown processors inside json string values. |
| **Render Template Complexity** | Slightly modified to use Astro's `<Content />` renderer and CSS styling for headings/paragraphs. | Unchanged. The template continues to loop over `.sections` and `.body`. |
| **Extensibility** | **High**. Easy migration to MDX if we want dynamic components or interactive charts inside case studies later. | **Low**. Restricted by JSON structure. |

### Recommendation: Option 1 (Markdown Collection)
We recommend **Option 1**. Case studies are editorial narrative documents, not database tables. Storing paragraphs inside JSON/YAML lists is a design anti-pattern. Writing case studies in markdown is standard practice, provides native formatting tools, and prepares the portfolio for MDX integration in the future.

---

## 4. Implementation Details

### Rendering Markdown Case Studies in Astro v5
To render the markdown body in `CaseStudy.astro`:
1. Use `render(entry)` from `astro:content`.
2. Wrap it with scoped tailwind styles for markdown headings, paragraphs, and lists.

```astro
---
// src/components/CaseStudy.astro
import { render } from "astro:content";
import { TAGS } from "@/data/projects";

const { projectEntry } = Astro.props;
const { title, github, link, tags, caseStudy } = projectEntry.data;
const { Content } = await render(projectEntry);
---

<article class="flex flex-col gap-y-12">
  <!-- Header & Metrics -->
  ...
  
  <!-- Narrative Content rendered from Markdown -->
  <div class="case-study-content">
    <Content />
  </div>
</article>

<style is:global>
.case-study-content h2 {
  @apply text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-8 mb-4;
}
.case-study-content p {
  @apply text-gray-700 dark:text-gray-400 text-pretty leading-relaxed mb-4;
}
</style>
```

### Schema Validation
We will use Zod schemas in `src/content.config.ts`.
Astro v5's type safety checks our collection keys against `TAGS` values.

---

## 5. Risks & Mitigation

1. **Broken Glob Imports for Images**:
   - Both options use dynamic image imports via `import.meta.glob`.
   - *Mitigation*: The image path validation in `Projects.astro` must remain intact, throwing descriptive errors if an image file doesn't exist in `src/assets/projects/`.
2. **Missing Case Study Pages**:
   - `[slug].astro` uses `getStaticPaths` which must only generate pages for projects with a case study.
   - *Mitigation*: Filter the collection using `project.data.caseStudy !== undefined`.
3. **Typography Styling**:
   - Since `@tailwindcss/typography` is not installed, custom scoped CSS styles in `CaseStudy.astro` must style native markdown tags (h2, p, code, strong) to match current layout guidelines.
