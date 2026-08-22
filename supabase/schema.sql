-- ========================================================
-- UNSTORY CMS - FULL SUPABASE DATABASE SCHEMA & RLS POLICIES
-- Execute this script in your Supabase SQL Editor
-- ========================================================

-- 1. Create Post Status Enum
DO $$ BEGIN
    CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tags Table
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Posts Table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  cover_image_alt TEXT,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  status post_status DEFAULT 'draft',
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  reading_time TEXT DEFAULT '5 min read',
  views INT DEFAULT 0,
  rating NUMERIC(2,1) DEFAULT 4.8,
  
  -- SEO Metadata
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  focus_keyword TEXT,
  canonical_url TEXT,
  
  -- Social Open Graph & Twitter
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  
  -- AIO (AI Search Optimization)
  ai_summary TEXT,
  key_takeaways TEXT[],
  primary_question TEXT,
  direct_answer TEXT,
  faq_items JSONB DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- 6. Post Tags Join Table
CREATE TABLE IF NOT EXISTS public.post_tags (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- 7. Media Table
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size INT,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check Admin Role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies: Public Read for Published Content
DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
CREATE POLICY "Public can view published posts" ON public.posts
  FOR SELECT USING (status = 'published' AND published = true);

DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories" ON public.categories
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view tags" ON public.tags;
CREATE POLICY "Public can view tags" ON public.tags
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view post_tags" ON public.post_tags;
CREATE POLICY "Public can view post_tags" ON public.post_tags
  FOR SELECT USING (true);

-- RLS Policies: Admin Full Access (SELECT, INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Admins have full access to profiles" ON public.profiles;
CREATE POLICY "Admins have full access to profiles" ON public.profiles FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins have full access to posts" ON public.posts;
CREATE POLICY "Admins have full access to posts" ON public.posts FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins have full access to categories" ON public.categories;
CREATE POLICY "Admins have full access to categories" ON public.categories FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins have full access to tags" ON public.tags;
CREATE POLICY "Admins have full access to tags" ON public.tags FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins have full access to post_tags" ON public.post_tags;
CREATE POLICY "Admins have full access to post_tags" ON public.post_tags FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins have full access to media" ON public.media;
CREATE POLICY "Admins have full access to media" ON public.media FOR ALL USING (public.is_admin());

-- Storage Bucket Setup Script for blog-images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
DROP POLICY IF EXISTS "Public can view blog-images" ON storage.objects;
CREATE POLICY "Public can view blog-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Admins can upload blog-images" ON storage.objects;
CREATE POLICY "Admins can upload blog-images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can delete blog-images" ON storage.objects;
CREATE POLICY "Admins can delete blog-images" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-images' AND public.is_admin());

-- Seed Initial Categories
INSERT INTO public.categories (name, slug, description) VALUES
('Credit Cards', 'credit-cards', 'In-depth reward card reviews, annual fee math, and point maximization strategy.'),
('Personal Loans', 'personal-loans', 'Low APR personal loans, debt consolidation guides, and EMI calculators.'),
('Investing', 'investing', 'Index funds, ETF strategies, and wealth accumulation guides.'),
('Budgeting', 'budgeting', 'Zero-based budgeting, emergency fund rules, and smart money habits.')
ON CONFLICT (slug) DO NOTHING;
