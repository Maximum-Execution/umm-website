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
    // Service category — used to filter projects onto scoped galleries
    // on /work/murals, /work/hand-painted-signs, /work/sign-restoration,
    // and /work/brand-mark. 'public-art' projects surface in the mural
    // gallery and the /work hub unified gallery.
    service: z.enum(['mural', 'sign', 'restoration', 'brand-mark', 'public-art']),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    dateModified: z.date().optional(),
    tags: z.array(z.string()),
    author: z.string().default('Untitled Mixed Media'),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    faqItems: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

export const collections = { projects, journal };
