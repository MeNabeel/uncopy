import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts, getCategories, getFeaturedPosts } from '@/lib/db/posts';
import AdSlot from '@/components/AdSlot';
import EmiCalculator from '@/components/EmiCalculator';
import JsonLd from '@/components/JsonLd';
import { Sparkles, ArrowRight, TrendingUp, Star, Timer, Cpu, Briefcase, Palette, Compass } from 'lucide-react';

export default async function HomePage() {
  const [posts, categories, featuredPosts] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
    getFeaturedPosts(),
  ]);

  return (
    <>
      <JsonLd type="website" />

      {/* Header Banner Ad Slot */}
      <AdSlot position="header" slotId="home-top-728" />

      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-16 overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-[#0b0f19] border border-slate-800/80 shadow-2xl p-5 sm:p-8 md:p-10 mb-8 sm:mb-12">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-72 sm:w-96 h-72 sm:h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Multi-Topic Publishing & CMS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-[1.15]">
            Smart Insights & Modern Stories <span className="gradient-text">Across Every Field.</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Unstory is a modern publishing platform for in-depth articles, technology breakdowns, design principles, business strategy, and lifestyle guides — managed dynamically via Supabase.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/technology"
              className="px-6 py-3.5 rounded-xl gradient-emerald text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group text-center"
            >
              <span>Explore Latest Stories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin"
              className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/40 text-slate-200 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Open Admin CMS</span>
            </Link>
          </div>

          {/* Key Metrics Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 sm:pt-8 border-t border-slate-800/80 text-center sm:text-left">
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{posts.length}</div>
              <div className="text-xs text-slate-400 font-mono">Published Articles</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-teal-400 font-mono">{categories.length}</div>
              <div className="text-xs text-slate-400 font-mono">Curated Fields</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">2026</div>
              <div className="text-xs text-slate-400 font-mono">Updated Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Selector */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Browse By Field</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {categories.map((cat) => {
            const count = posts.filter((p) => p.category?.slug.toLowerCase() === cat.slug.toLowerCase()).length;
            return (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="p-4 rounded-2xl glass-card flex items-center gap-3.5 group"
              >
                <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shrink-0">
                  {cat.slug === 'technology' ? <Cpu className="w-5 h-5" /> :
                   cat.slug === 'business' ? <Briefcase className="w-5 h-5" /> :
                   cat.slug === 'design' ? <Palette className="w-5 h-5" /> :
                   <Compass className="w-5 h-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors truncate">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-mono">{count} Articles</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="mb-12 sm:mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" /> Featured Editorial Guides
            </h2>
            <p className="text-xs text-slate-400">Hand-picked detailed analysis and technical breakdowns</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {featuredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.category?.slug || 'technology'}/${post.slug}`}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
                <Image
                  src={post.cover_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                    {post.category?.name || 'Category'}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1 font-mono text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {post.rating || 4.9}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5 text-slate-500" /> {post.reading_time}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mt-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 overflow-hidden border border-slate-700 relative shrink-0">
                      <Image
                        src={post.author?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={post.author?.name || 'Nabeel Ijaz'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-slate-300 font-medium text-xs">{post.author?.name || 'Nabeel Ijaz'}</span>
                  </div>

                  <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Embedded Interactive Tool Showcase */}
      <section className="mb-12 sm:mb-16">
        <EmiCalculator />
      </section>

      {/* In-Feed Ad Slot */}
      <AdSlot position="in-article" slotId="home-mid-feed" className="mb-12 sm:mb-16" />

      {/* Latest Posts Grid */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> All Latest Articles & Insights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.category?.slug || 'technology'}/${post.slug}`}
              className="glass-card rounded-2xl p-5 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-3">
                  <span className="px-2.5 py-0.5 rounded-md font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700">
                    {post.category?.name || 'Category'}
                  </span>
                  <span className="text-slate-500 font-mono">{post.reading_time}</span>
                </div>

                <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>{post.published_at?.split('T')[0] || post.created_at.split('T')[0]}</span>
                <span className="text-emerald-400 font-semibold group-hover:underline">Read Story →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
