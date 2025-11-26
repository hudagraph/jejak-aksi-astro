import { defineCollection, z } from 'astro:content';

// 1. Schema untuk CERITA (Blog)
const ceritaCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: z.string(),
    // Tambahkan field author (optional/default)
    author: z.string().default('Tim Jejak Aksi'),
  }),
});

// 2. Schema untuk BELAJAR
const belajarCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    description: z.string(),
    image: z.string(),
    link: z.string().optional(),
  }),
});

// 3. Schema untuk KARYA
const karyaCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
  }),
});

// 4. Schema untuk PROYEK
const proyekCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    image: z.string(),
  }),
});

export const collections = {
  'cerita': ceritaCollection,
  'belajar': belajarCollection,
  'karya': karyaCollection,
  'proyek': proyekCollection,
};