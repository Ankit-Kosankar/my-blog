import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

const BLOGS_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

export const DELETE: APIRoute = async ({ params }) => {
	try {
		const { id } = params;
		
		if (!id) {
			return new Response(JSON.stringify({ error: 'Blog ID is required' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
		
		// Find the file with the given ID
		const files = await fs.readdir(BLOGS_DIR);
		const targetFile = files.find(file => 
			file.replace(/\.(md|mdx)$/, '') === id
		);
		
		if (!targetFile) {
			return new Response(JSON.stringify({ error: 'Blog post not found' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
		
		const filePath = path.join(BLOGS_DIR, targetFile);
		await fs.unlink(filePath);
		
		return new Response(JSON.stringify({ 
			success: true, 
			message: 'Blog post deleted successfully' 
		}), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to delete blog post' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};

export const PUT: APIRoute = async ({ params, request }) => {
	try {
		const { id } = params;
		const body = await request.json();
		const { title, description, content, heroImage } = body;
		
		if (!id) {
			return new Response(JSON.stringify({ error: 'Blog ID is required' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
		
		// Find the file with the given ID
		const files = await fs.readdir(BLOGS_DIR);
		const targetFile = files.find(file => 
			file.replace(/\.(md|mdx)$/, '') === id
		);
		
		if (!targetFile) {
			return new Response(JSON.stringify({ error: 'Blog post not found' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
		
		const filePath = path.join(BLOGS_DIR, targetFile);
		
		// Create updated frontmatter
		const frontmatter = `---
title: "${title || ''}"
description: "${description || ''}"
pubDate: ${new Date().toISOString()}
updatedDate: ${new Date().toISOString()}
heroImage: "${heroImage || ''}"
---

`;
		
		// Write updated file
		await fs.writeFile(filePath, frontmatter + (content || ''));
		
		return new Response(JSON.stringify({ 
			success: true, 
			message: 'Blog post updated successfully' 
		}), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to update blog post' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}; 