import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts, getCategories, getFeaturedPosts } from '@/lib/db/posts';
import AdSlot from '@/components/AdSlot';
import EmiCalculator from '@/components/EmiCalculator';
import JsonLd from '@/components/JsonLd';
import { Sparkles, ArrowRight, Shield, Zap, TrendingUp, Star, Timer, CreditCard, Landmark, Wallet } from 'lucide-react';

export default async function HomePage() {
  const [posts, categories, featuredPosts] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
    getFeaturedPosts(),
  ]);

  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <>
      <JsonLd type="website" />

      {/* Header Banner Ad Slot */}
      <AdSlot position="header" slotId="home-top-728" />

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-[#0b0f19] border border-slate-800/80 shadow-2xl p-6 sm:p-10 mb-12">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Supabase Dynamic CMS & Media</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-[1.1]">
            Smart Financial Clarity for <span className="gradient-text">Modern Investors.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Unstory delivers lightning-fast credit card breakdowns, personal loan calculators, and passive index fund strategies — managed dynamically via Supabase.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/credit-cards"
              className="px-6 py-3.5 rounded-xl gradient-emerald text-slate-950 font-extrabold text-sm shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2 group"
            >
              <span>Explore Top Credit Cards</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/personal-loans/instant-loans-guide"
              className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/40 text-slate-200 font-bold text-sm transition-all flex items-center gap-2"
            >
              <Landmark className="w-4 h-4 text-emerald-400" />
              <span>Calculate Loan EMI</span>
            </Link>
          </div>

          {/* Key Metrics Stats Bar */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80">
            <div>
              <div className="text-2xl font-black text-emerald-400 font-mono">{posts.length}</div>
              <div className="text-xs text-slate-400 font-mono">Published Articles</div>
            </div>
            <div>
              <div className="text-2xl font-black text-teal-400 font-mono">$0</div>
              <div className="text-xs text-slate-400 font-mono">Annual Fee Guides</div>
            </div>
            <div>
              <div className="text-2xl font-black text-cyan-400 font-mono">2026</div>
              <div className="text-xs text-slate-400 font-mono">Updated APR Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Selector */}
      <section className="mb-12">
        <h2 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Browse By Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const count = posts.filter((p) => p.category?.slug.toLowerCase() === cat.slug.toLowerCase()).length;
            return (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="p-4 rounded-2xl glass-card flex items-center gap-3.5 group"
              >
                <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors m-0">
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
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" /> Featured Financial Guides
            </h2>
            <p className="text-xs text-slate-400">Hand-picked detailed reviews and calculators</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.category?.slug || 'credit-cards'}/${post.slug}`}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <Image
                  src={post.cover_image || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'}
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

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1 font-mono text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {post.rating || 4.8}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5 text-slate-500" /> {post.reading_time}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mt-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 overflow-hidden border border-slate-700 relative">
                      <Image
                        src={post.author?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={post.author?.name || 'Author'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-slate-300 font-medium">{post.author?.name || 'Unstory Team'}</span>
                  </div>

                  <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Embedded Interactive Tool Showcase */}
      <section className="mb-16">
        <EmiCalculator />
      </section>

      {/* In-Feed Ad Slot */}
      <AdSlot position="in-article" slotId="home-mid-feed" className="mb-16" />

      {/* Latest Posts Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-black text-slate-100 tracking-tight mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> All Latest Financial Reviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.category?.slug || 'credit-cards'}/${post.slug}`}
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
                <span className="text-emerald-400 font-semibold group-hover:underline">Read Article →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
