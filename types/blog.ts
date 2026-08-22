export type PostStatus = 'draft' | 'published' | 'archived';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  post_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  cover_image_alt?: string;
  author_id?: string;
  author?: Profile;
  category_id?: string;
  category?: Category;
  tags?: Tag[];
  status: PostStatus;
  published: boolean;
  featured: boolean;
  reading_time: string;
  views: number;
  rating: number;
  
  // SEO
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  focus_keyword?: string;
  canonical_url?: string;
  
  // Social
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  
  // AIO (AI Search Optimization)
  ai_summary?: string;
  key_takeaways?: string[];
  primary_question?: string;
  direct_answer?: string;
  faq_items?: FaqItem[];
  
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size?: number;
  type?: string;
  created_at: string;
}

export interface SeoAnalysis {
  score: number;
  checks: {
    passed: boolean;
    label: string;
    type: 'success' | 'warning' | 'error';
    detail?: string;
  }[];
}
