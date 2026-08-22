import { createClient } from '@/lib/supabase/client';
import { Post, Category, Tag, PostStatus } from '@/types/blog';

// Static fallback post data (Pure JS objects, no Node.js fs dependencies)
const STATIC_FALLBACK_POSTS: Post[] = [
  {
    id: 'static-1',
    title: 'Top 5 Student Credit Cards with Zero Annual Fee in 2026',
    slug: 'best-student-cards',
    excerpt: 'Detailed breakdown of the top 5 student credit cards offering cashback, reward points, zero annual fee, and easy approval for young adults building credit.',
    content: `## Why Student Credit Cards Matter

Building credit early in your financial life is one of the highest leverage moves a young adult can make.

### Key Factors When Choosing a Student Card

1. **Zero Annual Fee**: Never pay an upfront annual fee on your first card.
2. **Cashback on Category Spend**: Look for rewards on dining, groceries, and digital subscriptions.
3. **Low Credit Score Requirement**: Most student cards require minimal credit history.`,
    cover_image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    cover_image_alt: 'Student Credit Cards',
    author_id: 'admin-1',
    author: {
      id: 'admin-1',
      name: 'Unstory Finance Team',
      email: 'team@unstory.com',
      role: 'admin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    category_id: 'cat-credit-cards',
    category: {
      id: 'cat-credit-cards',
      name: 'Credit Cards',
      slug: 'credit-cards',
      description: 'Credit card reviews & reward strategies',
    },
    status: 'published',
    published: true,
    featured: true,
    reading_time: '6 min read',
    views: 2450,
    rating: 4.9,
    seo_title: 'Top 5 Student Credit Cards with Zero Annual Fee in 2026',
    seo_description: 'Detailed breakdown of the top 5 student credit cards offering cashback, reward points, zero annual fee, and easy approval.',
    seo_keywords: ['student credit cards', 'zero annual fee', 'credit card rewards'],
    focus_keyword: 'student credit cards',
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-02-15T00:00:00Z',
    published_at: '2026-02-01T00:00:00Z',
  },
  {
    id: 'static-2',
    title: 'Axis Magnus Credit Card Review 2026: Is It Still Worth the Fee?',
    slug: 'axis-magnus-review',
    excerpt: 'An exhaustive analysis of the Axis Bank Magnus credit card rewards devaluation, milestone benefits, airport lounge access, and net value math.',
    content: `## Executive Overview

The Axis Bank Magnus Credit Card has undergone significant reward structure updates.

### Reward Point Transfer Rates

The transfer ratio to international airline partners is now recalibrated.`,
    cover_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    cover_image_alt: 'Axis Magnus Credit Card',
    author_id: 'admin-1',
    author: {
      id: 'admin-1',
      name: 'Unstory Finance Team',
      email: 'team@unstory.com',
      role: 'admin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    category_id: 'cat-credit-cards',
    category: {
      id: 'cat-credit-cards',
      name: 'Credit Cards',
      slug: 'credit-cards',
      description: 'Credit card reviews & reward strategies',
    },
    status: 'published',
    published: true,
    featured: false,
    reading_time: '8 min read',
    views: 1890,
    rating: 4.7,
    seo_title: 'Axis Magnus Credit Card Review 2026',
    seo_description: 'Exhaustive analysis of the Axis Bank Magnus credit card rewards devaluation and milestone benefits.',
    seo_keywords: ['axis magnus review', 'premium credit cards'],
    focus_keyword: 'axis magnus review',
    created_at: '2026-01-20T00:00:00Z',
    updated_at: '2026-02-10T00:00:00Z',
    published_at: '2026-01-20T00:00:00Z',
  },
  {
    id: 'static-3',
    title: 'Instant Personal Loans Guide: APR Comparison & EMI Math',
    slug: 'instant-loans-guide',
    excerpt: 'Everything you need to know before applying for an instant personal loan. Compare interest rates, processing fees, pre-closure charges, and calculate monthly EMIs.',
    content: `## Understanding Personal Loan Interest Rates

Personal loans provide fast liquidity without pledging collateral.

### Fixed vs Floating APR

Calculate your total interest obligation before signing digital loan agreements.`,
    cover_image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    cover_image_alt: 'Instant Personal Loans',
    author_id: 'admin-1',
    author: {
      id: 'admin-1',
      name: 'Unstory Finance Team',
      email: 'team@unstory.com',
      role: 'admin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    category_id: 'cat-personal-loans',
    category: {
      id: 'cat-personal-loans',
      name: 'Personal Loans',
      slug: 'personal-loans',
      description: 'Loan comparison guides & EMI math',
    },
    status: 'published',
    published: true,
    featured: true,
    reading_time: '7 min read',
    views: 3120,
    rating: 4.8,
    seo_title: 'Instant Personal Loans Guide: APR Comparison & EMI Math',
    seo_description: 'Compare personal loan interest rates, processing fees, and calculate monthly EMIs.',
    seo_keywords: ['instant personal loans', 'emi calculator', 'personal loan apr'],
    focus_keyword: 'instant personal loans',
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-02-05T00:00:00Z',
    published_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'static-4',
    title: 'Index Funds 101: Building Long-Term Passive Wealth',
    slug: 'index-funds-101',
    excerpt: 'A complete beginner guide to low-cost S&P 500 and total market index fund investing for long-term compound growth.',
    content: `## Why Index Funds Outperform Active Management

Over 15 to 20-year horizons, broad-market index funds outperform over 90% of actively managed mutual funds.

### The Power of Low Expense Ratios

A 0.03% expense ratio preserves hundreds of thousands of dollars in compound growth over a 30-year investing journey.`,
    cover_image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    cover_image_alt: 'Index Funds Investing',
    author_id: 'admin-1',
    author: {
      id: 'admin-1',
      name: 'Unstory Finance Team',
      email: 'team@unstory.com',
      role: 'admin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    category_id: 'cat-investing',
    category: {
      id: 'cat-investing',
      name: 'Investing',
      slug: 'investing',
      description: 'Index funds & long-term wealth',
    },
    status: 'published',
    published: true,
    featured: false,
    reading_time: '10 min read',
    views: 4500,
    rating: 5.0,
    seo_title: 'Index Funds 101: Building Long-Term Passive Wealth',
    seo_description: 'Complete beginner guide to low-cost S&P 500 index fund investing for long-term compound growth.',
    seo_keywords: ['index funds 101', 'passive investing', 'compound growth'],
    focus_keyword: 'index funds 101',
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-02-01T00:00:00Z',
    published_at: '2026-01-10T00:00:00Z',
  },
];

// Helper to map DB rows
function mapDbPostToPost(row: any): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    cover_image: row.cover_image || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    cover_image_alt: row.cover_image_alt || row.title,
    author_id: row.author_id,
    author: row.profiles
      ? {
          id: row.profiles.id,
          name: row.profiles.name,
          email: row.profiles.email,
          role: row.profiles.role,
          avatar_url: row.profiles.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        }
      : {
          id: 'admin-1',
          name: 'Unstory Finance Team',
          email: 'editor@unstory.com',
          role: 'admin',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        },
    category_id: row.category_id,
    category: row.categories
      ? {
          id: row.categories.id,
          name: row.categories.name,
          slug: row.categories.slug,
          description: row.categories.description,
        }
      : {
          id: 'cat-1',
          name: row.category_slug ? row.category_slug.replace('-', ' ') : 'Finance',
          slug: row.category_slug || 'credit-cards',
        },
    status: row.status as PostStatus,
    published: Boolean(row.published),
    featured: Boolean(row.featured),
    reading_time: row.reading_time || '5 min read',
    views: row.views || 0,
    rating: Number(row.rating) || 4.8,
    seo_title: row.seo_title || row.title,
    seo_description: row.seo_description || row.excerpt,
    seo_keywords: Array.isArray(row.seo_keywords) ? row.seo_keywords : [],
    focus_keyword: row.focus_keyword || '',
    canonical_url: row.canonical_url || '',
    og_title: row.og_title || row.title,
    og_description: row.og_description || row.excerpt,
    og_image: row.og_image || row.cover_image,
    twitter_title: row.twitter_title || row.title,
    twitter_description: row.twitter_description || row.excerpt,
    twitter_image: row.twitter_image || row.cover_image,
    ai_summary: row.ai_summary || '',
    key_takeaways: Array.isArray(row.key_takeaways) ? row.key_takeaways : [],
    primary_question: row.primary_question || '',
    direct_answer: row.direct_answer || '',
    faq_items: Array.isArray(row.faq_items) ? row.faq_items : [],
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString(),
    published_at: row.published_at || row.created_at,
  };
}

// Fetch all published posts
export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id(*),
        categories:category_id(*)
      `)
      .eq('status', 'published')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return STATIC_FALLBACK_POSTS;
    }

    return data.map(mapDbPostToPost);
  } catch {
    return STATIC_FALLBACK_POSTS;
  }
}

// Fetch single published post by category & slug
export async function getPostBySlug(categorySlug: string, slug: string): Promise<Post | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id(*),
        categories:category_id(*)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .eq('published', true)
      .single();

    if (error || !data) {
      const match = STATIC_FALLBACK_POSTS.find(
        (p) => p.category?.slug.toLowerCase() === categorySlug.toLowerCase() && p.slug.toLowerCase() === slug.toLowerCase()
      );
      return match || null;
    }

    return mapDbPostToPost(data);
  } catch {
    const match = STATIC_FALLBACK_POSTS.find(
      (p) => p.category?.slug.toLowerCase() === categorySlug.toLowerCase() && p.slug.toLowerCase() === slug.toLowerCase()
    );
    return match || null;
  }
}

// Fetch published posts by category
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.category?.slug.toLowerCase() === categorySlug.toLowerCase());
}

// Fetch featured posts
export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.featured);
}

// Fetch categories from DB or fallback
export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error || !data || data.length === 0) {
      return [
        { id: 'cat-credit-cards', name: 'Credit Cards', slug: 'credit-cards', description: 'Credit card reviews & reward strategies' },
        { id: 'cat-personal-loans', name: 'Personal Loans', slug: 'personal-loans', description: 'Loan comparison guides & EMI math' },
        { id: 'cat-investing', name: 'Investing', slug: 'investing', description: 'Index funds & long-term wealth' },
        { id: 'cat-budgeting', name: 'Budgeting', slug: 'budgeting', description: 'Personal finance & savings tips' },
      ];
    }
    return data;
  } catch {
    return [
      { id: 'cat-credit-cards', name: 'Credit Cards', slug: 'credit-cards', description: 'Credit card reviews & reward strategies' },
      { id: 'cat-personal-loans', name: 'Personal Loans', slug: 'personal-loans', description: 'Loan comparison guides & EMI math' },
      { id: 'cat-investing', name: 'Investing', slug: 'investing', description: 'Index funds & long-term wealth' },
      { id: 'cat-budgeting', name: 'Budgeting', slug: 'budgeting', description: 'Personal finance & savings tips' },
    ];
  }
}

// Admin: Fetch all posts (drafts + published)
export async function getAdminPosts(): Promise<Post[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id(*),
        categories:category_id(*)
      `)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return STATIC_FALLBACK_POSTS;
    }

    return data.map(mapDbPostToPost);
  } catch {
    return STATIC_FALLBACK_POSTS;
  }
}

// Admin: Fetch post by ID for editing
export async function getPostById(id: string): Promise<Post | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id(*),
        categories:category_id(*)
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      const fallback = STATIC_FALLBACK_POSTS.find((p) => p.id === id || p.slug === id);
      return fallback || null;
    }

    return mapDbPostToPost(data);
  } catch {
    return null;
  }
}
