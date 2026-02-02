import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
			schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional().nullable(),
		tags: z.array(z.string()).optional().default([]),
		slug: z.string().optional(),
		draft: z.boolean().optional().default(false),
		targetKeyword: z.string().optional(),
		seoTitle: z.string().optional(),
		seoDescription: z.string().optional(),
		ogImage: image().optional().nullable(),
		author: z.object({
			name: z.string(),
			url: z.string().url().optional(),
			avatar: image().optional().nullable(),
		}).optional(),
		// Content taxonomy fields
		type: z.enum(['essay', 'note', 'opinion', 'tutorial', 'log']).optional(),
		category: z.string().optional(),
		series: z.string().optional(),
		seriesPart: z.number().optional(),
		difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
	}),
});

export const collections = { blog };
