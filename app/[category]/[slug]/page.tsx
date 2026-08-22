import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getPublishedPosts } from '@/lib/db/posts';
import Breadcrumbs from '@/components/Breadcrumbs';
import TableOfContents from '@/components/TableOfContents';
import MDXComponents from '@/components/MDXComponents';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import { Timer, CalendarDays, Share2, Star, ShieldCheck, ArrowRight, User } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  if (!post) {
    return {
      title: 'Article Not Found | Unstory',
    };
  }

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt;
  const canonical = post.canonical_url || `https://unstory.pages.dev/${category}/${slug}`;

  return {
    title: `${title} | Unstory`,
    description,
    keywords: post.seo_keywords || [],
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.og_title || title,
      description: post.og_description || description,
      images: [
        {
          url: post.og_image || post.cover_image || '',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitter_title || title,
      description: post.twitter_description || description,
      images: [post.twitter_image || post.cover_image || ''],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // Convert post to legacy model for JsonLd component compatibility
  const legacyPost = {
    slug: post.slug,
    category: post.category?.slug || category,
    frontmatter: {
      title: post.title,
      slug: post.slug,
      description: post.excerpt,
      category: post.category?.name || category,
      author: post.author?.name || 'Unstory Team',
      authorRole: 'Senior Financial Analyst',
      authorAvatar: post.author?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      publishedAt: post.published_at?.split('T')[0] || post.created_at.split('T')[0],
      updatedAt: post.updated_at.split('T')[0],
      keywords: post.seo_keywords || [],
      heroImage: post.cover_image,
      rating: post.rating,
    },
    content: post.content,
    readTime: post.reading_time,
  };

  return (
    <>
      <JsonLd post={legacyPost} type="article" />

      {/* Render FAQ JsonLd Schema if FAQ items exist */}
      {post.faq_items && post.faq_items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faq_items.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      )}

      <div className="space-y-6 sm:space-y-8">
        <Breadcrumbs
          items={[
            { label: post.category?.name || category, href: `/${post.category?.slug || category}` },
            { label: post.title },
          ]}
        />

        {/* Article Header Container */}
        <header className="space-y-4 pb-6 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {post.category?.name || category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
              <Timer className="w-3.5 h-3.5 text-slate-500" /> {post.reading_time}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
              <CalendarDays className="w-3.5 h-3.5 text-slate-500" /> Updated {post.updated_at.split('T')[0]}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal max-w-4xl">
            {post.excerpt}
          </p>

          {/* Author Meta Box */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden relative shrink-0">
                <Image
                  src={post.author?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={post.author?.name || 'Author'}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-200">{post.author?.name || 'Unstory Team'}</div>
                <div className="text-[11px] sm:text-xs text-slate-400">Senior Financial Analyst</div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Featured Image */}
        {post.cover_image && (
          <div className="relative h-56 sm:h-80 lg:h-96 w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Main Content Grid: Sidebar + Article Prose + TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Main Article Content */}
          <article className="lg:col-span-8 prose-custom min-w-0 max-w-full overflow-hidden">
            {post.content.trim().startsWith('<') ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <MDXRemote source={post.content} components={MDXComponents} />
            )}

            {/* Bottom Article Author Bio */}
            <div className="my-8 sm:my-10 p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 overflow-hidden relative shrink-0">
                <Image
                  src={post.author?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={post.author?.name || 'Author'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono text-emerald-400 font-bold">Written & Verified By</span>
                <h4 className="text-base font-bold text-slate-100 m-0">{post.author?.name || 'Unstory Team'}</h4>
                <p className="text-xs text-slate-400 leading-relaxed m-0">
                  Senior Financial Analyst at Unstory. Specializing in retail banking analysis, credit card point optimization, and rate disclosures.
                </p>
              </div>
            </div>
          </article>

          {/* Right Sidebar Column */}
          <aside className="lg:col-span-4 space-y-6">
            <TableOfContents />
            <AdSlot position="sidebar" slotId="article-sidebar-300" />
          </aside>
        </div>

        {/* Related Posts Section */}
        <section className="pt-8 sm:pt-12 border-t border-slate-800/80">
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-6">More Recommended Financial Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.id}
                href={`/${rPost.category?.slug || category}/${rPost.slug}`}
                className="glass-card rounded-2xl p-5 group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-2">
                    {rPost.category?.name || category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {rPost.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {rPost.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
                  <span>{rPost.reading_time}</span>
                  <span className="text-emerald-400 font-semibold">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
