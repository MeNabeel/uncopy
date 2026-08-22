import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  publishedAt: string;
  updatedAt?: string;
  keywords: string[];
  featured?: boolean;
  heroImage?: string;
  rating?: number;
}

export interface MdxPost {
  slug: string;
  category: string;
  frontmatter: PostFrontmatter;
  content: string;
  readTime: string;
}

const CONTENT_PATH = path.join(process.cwd(), 'content');

export function getAllCategories(): string[] {
  if (!fs.existsSync(CONTENT_PATH)) return [];
  return fs.readdirSync(CONTENT_PATH).filter((file) => {
    return fs.statSync(path.join(CONTENT_PATH, file)).isDirectory();
  });
}

export function getAllPosts(): MdxPost[] {
  if (!fs.existsSync(CONTENT_PATH)) return [];
  const categories = getAllCategories();
  let allPosts: MdxPost[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(CONTENT_PATH, category);
    const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith('.mdx'));

    files.forEach((file) => {
      const filePath = path.join(categoryPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const stats = readingTime(content);

      const slug = data.slug || file.replace(/\.mdx$/, '');

      allPosts.push({
        slug,
        category,
        frontmatter: {
          title: data.title || 'Untitled',
          slug,
          description: data.description || '',
          category: data.category || category,
          author: data.author || 'Unstory Finance Team',
          authorRole: data.authorRole || 'Senior Financial Analyst',
          authorAvatar: data.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
          updatedAt: data.updatedAt,
          keywords: Array.isArray(data.keywords) ? data.keywords : [],
          featured: Boolean(data.featured),
          heroImage: data.heroImage || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
          rating: data.rating || 4.8,
        },
        content,
        readTime: stats.text,
      });
    });
  });

  return allPosts.sort((a, b) => {
    return new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime();
  });
}

export function getPostsByCategory(category: string): MdxPost[] {
  return getAllPosts().filter((post) => post.category.toLowerCase() === category.toLowerCase());
}

export function getPostBySlug(category: string, slug: string): MdxPost | undefined {
  const posts = getAllPosts();
  return posts.find(
    (post) => post.category.toLowerCase() === category.toLowerCase() && post.slug.toLowerCase() === slug.toLowerCase()
  );
}

export function getFeaturedPosts(): MdxPost[] {
  return getAllPosts().filter((post) => post.frontmatter.featured);
}
