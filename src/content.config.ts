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
  }),
});

export const collections = { projects };
