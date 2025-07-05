import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

const BLOGS_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

export const GET: APIRoute = async () => {
	try {
		const files = await fs.readdir(BLOGS_DIR);
		const markdownFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
		
		const blogs = await Promise.all(
			markdownFiles.map(async (file) => {
				const filePath = path.join(BLOGS_DIR, file);
				const content = await fs.readFile(filePath, 'utf-8');
				const id = file.replace(/\.(md|mdx)$/, '');
				
				// Extract frontmatter (simple parsing)
				const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
				const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
				
				// Parse frontmatter
				const metadata: any = {};
				frontmatter.split('\n').forEach(line => {
					const [key, ...valueParts] = line.split(':');
					if (key && valueParts.length > 0) {
						metadata[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
					}
				});
				
				return {
					id,
					title: metadata.title || 'Untitled',
					description: metadata.description || '',
					pubDate: metadata.pubDate || new Date().toISOString(),
					updatedDate: metadata.updatedDate || null,
					heroImage: metadata.heroImage || null,
					content: content.replace(/^---\n[\s\S]*?\n---/, '').trim()
				};
			})
		);
		
		return new Response(JSON.stringify(blogs), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch blogs' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();
		const { title, description, content, heroImage } = body;
		
		if (!title || !content) {
			return new Response(JSON.stringify({ error: 'Title and content are required' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
		
		// Generate filename from title
		const filename = title
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.trim();
		
		const timestamp = new Date().toISOString().split('T')[0];
		const finalFilename = `${timestamp}-${filename}.md`;
		const filePath = path.join(BLOGS_DIR, finalFilename);
		
		// Create frontmatter
		const frontmatter = `---
title: "${title}"
description: "${description || ''}"
pubDate: ${new Date().toISOString()}
heroImage: "${heroImage || ''}"
---

`;
		
		// Write file
		await fs.writeFile(filePath, frontmatter + content);
		
		return new Response(JSON.stringify({ 
			success: true, 
			id: finalFilename.replace('.md', ''),
			message: 'Blog post created successfully' 
		}), {
			status: 201,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to create blog post' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}; 