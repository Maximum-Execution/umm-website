import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    images: z.array(z.string()).optional(),
    tags: z.array(z.string()),
    date: z.date(),
    featured: z.boolean().default(false),
    client: z.string().optional(),
    location: z.string().optional(),
    materials: z.string().optional(),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    author: z.string().default('Spencer Bennett'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects, journal };
