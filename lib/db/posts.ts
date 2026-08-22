import { createClient } from '@/lib/supabase/client';
import { Post, Category, Tag, PostStatus } from '@/types/blog';

// Static fallback post data representing multi-topic fields
const STATIC_FALLBACK_POSTS: Post[] = [
  {
    id: 'static-1',
    title: 'The Future of Generative AI: Architecture, Agents, and Real-World Impact',
    slug: 'future-of-generative-ai',
    excerpt: 'An in-depth look at state-of-the-art AI architectures, agentic workflows, and how modern engineering teams are deploying AI models into production.',
    content: `## The Next Era of Artificial Intelligence

Artificial Intelligence has transitioned from simple pattern recognition to multi-agent autonomous reasoning engines.

### Key Architectural Shifts

1. **Agentic Workflows**: Systems that iterate, use tools, and self-correct.
2. **Local Model Performance**: High efficiency models running directly on-device.
3. **Retrieval-Augmented Generation (RAG)**: Pairing knowledge bases with generative models for zero hallucination answers.`,
    cover_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    cover_image_alt: 'Future of Generative AI',
    author_id: 'admin-1',
    author: {
      id: 'admin-1',
      name: 'Nabeel Ijaz',
      email: 'nabeelijaz559@gmail.com',
      role: 'admin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    category_id: 'cat-technology',
    category: {
      id: 'cat-technology',
      name: 'Technology',
      slug: 'technology',
      description: 'Artificial intelligence, web engineering & software trends',
    },
    status: 'published',
    published: true,
    featured: true,
    reading_time: '6 min read',
    views: 3450,
    rating: 4.9,
    seo_title: 'The Future of Generative AI: Architecture & Agentic Workflows',
    seo_description: 'An in-depth look at state-of-the-art AI architectures, agentic workflows, and production deployments.',
    seo_keywords: ['generative ai', 'ai agents', 'web architecture'],
    focus_keyword: 'generative ai',
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-02-15T00:00:00Z',
    published_at: '2026-02-01T00:00:00Z',
  },
  {
    id: 'static-2',
    title: 'Building Scalable Digital Products: Strategies for Early Stage Startups',
    slug: 'building-scalable-startups',
    excerpt: 'Essential frameworks for product-market fit, sustainable unit economics, and rapid engineering iteration in competitive markets.',
    content: `## Product-Market Fit & Scale

Building successful software products requires rapid execution combined with rigorous customer feedback loops.

### core Pillars of Product Scalability

- **Minimal Viable Complexity**: Avoid premature optimization.
- **Data-Driven Iteration**: Measure retention over raw user acquisition.`,
    cover_image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    cover_image_alt: 'Scalable Startups',
    author_id: 'admin-1',
    author: {
      id: 'admin-1',
      name: 'Nabeel Ijaz',
      email: 'nabeelijaz559@gmail.com',
      role: 'admin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    category_id: 'cat-business',
    category: {
      id: 'cat-business',
      name: 'Business',
      slug: 'business',
      description: 'Entrepreneurship, product strategy & startup growth',
    },
    status: 'published',
    published: true,
    featured: false,
    reading_time: '8 min read',
    views: 2890,
    rating: 4.8,
    seo_title: 'Building Scalable Digital Products for Startups',
    seo_description: 'Essential frameworks for product-market fit, sustainable unit economics, and rapid iteration.',
    seo_keywords: ['startup growth', 'product design', 'entrepreneurship'],
    focus_keyword: 'startup growth',
    created_at: '2026-01-20T00:00:00Z',
    updated_at: '2026-02-10T00:00:00Z',
    published_at: '2026-01-20T00:00:00Z',
  },
  {
    id: 'static-3',
    title: 'Modern UI/UX Design Systems: Crafting Clean & Accessible Interfaces',
    slug: 'modern-ui-ux-design-systems',
    excerpt: 'How leading design teams construct cohesive design tokens, glassmorphism UI elements, and accessible component libraries.',
    content: `## The Anatomy of Modern Design Tokens

Design systems bridge the gap between design vision and frontend execution.

### Design Principles

- **Semantic Color Tokens**: Theme-aware color structures for dark and light modes.
- **Fluid Typography**: Dynamic clamp sizing across viewports.`,
    cover_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    cover_image_alt: 'UI UX Design Systems',
    author_id: 'admin-1',
    author: {
      id: 'admin-1',
      name: 'Nabeel Ijaz',
      email: 'nabeelijaz559@gmail.com',
      role: 'admin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    category_id: 'cat-design',
    category: {
      id: 'cat-design',
      name: 'Design',
      slug: 'design',
      description: 'UI/UX design, visual identity & digital aesthetics',
    },
    status: 'published',
    published: true,
    featured: true,
    reading_time: '7 min read',
    views: 4120,
    rating: 4.9,
    seo_title: 'Modern UI/UX Design Systems & Micro-Interactions',
    seo_description: 'Construct cohesive design tokens, glassmorphism UI elements, and accessible component libraries.',
    seo_keywords: ['ui design', 'design tokens', 'ux design'],
    focus_keyword: 'ui design',
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-02-05T00:00:00Z',
    published_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'static-4',
    title: 'Mastering Deep Work & Remote Productivity Habits in 2026',
    slug: 'deep-work-productivity-habits',
    excerpt: 'Actionable routines, focus protocols, and digital minimalism strategies for knowledge workers and remote teams.',
    content: `## Protecting Focus in a Hyper-Connected World

Cognitive clarity is the primary competitive advantage for modern creators and engineers.

### Focus Protocols

1. **Time-Blocking**: Dedicated 90-minute deep focus sprints.
2. **Asynchronous Communication**: Reducing real-time chat distractions.`,
    cover_image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    cover_image_alt: 'Deep Work Productivity Habits',
    author_id: 'admin-1',
    author: {
      id: 'admin-1',
      name: 'Nabeel Ijaz',
      email: 'nabeelijaz559@gmail.com',
      role: 'admin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    category_id: 'cat-lifestyle',
    category: {
      id: 'cat-lifestyle',
      name: 'Lifestyle',
      slug: 'lifestyle',
      description: 'Productivity routines, personal growth & modern culture',
    },
    status: 'published',
    published: true,
    featured: false,
    reading_time: '9 min read',
    views: 5200,
    rating: 5.0,
    seo_title: 'Mastering Deep Work & Remote Productivity Habits in 2026',
    seo_description: 'Actionable routines, focus protocols, and digital minimalism strategies for remote professionals.',
    seo_keywords: ['deep work', 'productivity habits', 'remote work'],
    focus_keyword: 'deep work',
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
    cover_image: row.cover_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
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
          name: 'Nabeel Ijaz',
          email: 'nabeelijaz559@gmail.com',
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
          name: row.category_slug ? row.category_slug.replace('-', ' ') : 'General',
          slug: row.category_slug || 'technology',
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

// Fetch categories from DB or multi-topic fallback
export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error || !data || data.length === 0) {
      return [
        { id: 'cat-technology', name: 'Technology', slug: 'technology', description: 'Artificial intelligence, web engineering & software trends' },
        { id: 'cat-business', name: 'Business', slug: 'business', description: 'Entrepreneurship, product strategy & startup growth' },
        { id: 'cat-design', name: 'Design', slug: 'design', description: 'UI/UX design, visual identity & digital aesthetics' },
        { id: 'cat-lifestyle', name: 'Lifestyle', slug: 'lifestyle', description: 'Productivity routines, personal growth & modern culture' },
      ];
    }
    return data;
  } catch {
    return [
      { id: 'cat-technology', name: 'Technology', slug: 'technology', description: 'Artificial intelligence, web engineering & software trends' },
      { id: 'cat-business', name: 'Business', slug: 'business', description: 'Entrepreneurship, product strategy & startup growth' },
      { id: 'cat-design', name: 'Design', slug: 'design', description: 'UI/UX design, visual identity & digital aesthetics' },
      { id: 'cat-lifestyle', name: 'Lifestyle', slug: 'lifestyle', description: 'Productivity routines, personal growth & modern culture' },
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
