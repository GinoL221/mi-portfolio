import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
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

export const collections = { projects };
