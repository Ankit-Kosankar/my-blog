// Debug script to check blog posts
import { getCollection } from 'astro:content';

async function debugPosts() {
  try {
    console.log('🔍 Debugging blog posts...\n');
    
    // Get all posts
    const posts = await getCollection('blog');
    console.log(`📊 Total posts found: ${posts.length}\n`);
    
    // Check each post
    posts.forEach((post, index) => {
      console.log(`📝 Post ${index + 1}:`);
      console.log(`   ID: ${post.id}`);
      console.log(`   Title: ${post.data.title}`);
      console.log(`   PubDate: ${post.data.pubDate}`);
      console.log(`   Description: ${post.data.description}`);
      console.log(`   HeroImage: ${post.data.heroImage || 'None'}`);
      console.log(`   Generated URL: /blog/${post.id.replace(/\.mdx?$/, '')}/`);
      console.log('');
    });
    
    // Check for potential issues
    const issues = [];
    
    posts.forEach(post => {
      if (!post.data.title) {
        issues.push(`❌ Post "${post.id}" has no title`);
      }
      if (!post.data.pubDate) {
        issues.push(`❌ Post "${post.id}" has no pubDate`);
      }
      if (!post.data.description) {
        issues.push(`⚠️  Post "${post.id}" has no description`);
      }
    });
    
    if (issues.length > 0) {
      console.log('🚨 Issues found:');
      issues.forEach(issue => console.log(issue));
    } else {
      console.log('✅ All posts look good!');
    }
    
  } catch (error) {
    console.error('❌ Error debugging posts:', error);
  }
}

debugPosts(); 