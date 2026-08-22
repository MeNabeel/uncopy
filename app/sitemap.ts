import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://unstory.pages.dev';
  const posts = getAllPosts();
  const categories = getAllCategories();

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/${post.category}/${post.slug}`,
    lastModified: new Date(post.frontmatter.updatedAt || post.frontmatter.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryEntries = categories.map((cat) => ({
    url: `${baseUrl}/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...categoryEntries,
    ...postEntries,
  ];
}
