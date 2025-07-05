// src/utils/getMediumPosts.ts
import Parser from 'rss-parser';

const MEDIUM_RSS_URL = 'https://medium.com/feed/@kosankarankit';

// Simple in-memory cache
let cachedPosts: any[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getMediumPosts(limit = 5) {
  // Check cache first
  const now = Date.now();
  if (cachedPosts && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedPosts.slice(0, limit);
  }

  try {
    const parser = new Parser();
    const feed = await parser.parseURL(MEDIUM_RSS_URL);
    
    const posts = feed.items.slice(0, limit).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: new Date(item.pubDate ?? Date.now()),
      // pubDate: new Date(item.pubDate ?? 0),
      source: 'medium',
    }));

    // Update cache
    cachedPosts = posts;
    cacheTimestamp = now;
    
    return posts;
  } catch (error) {
    console.warn('Failed to fetch Medium posts:', error);
    
    // Return cached data if available, otherwise empty array
    if (cachedPosts) {
      return cachedPosts.slice(0, limit);
    }
    
    return [];
  }
}