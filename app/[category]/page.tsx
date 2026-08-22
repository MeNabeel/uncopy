import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getCategories } from '@/lib/db/posts';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import { Timer, Star, ArrowRight, TrendingUp } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);
  const categories = await getCategories();
  const catObj = categories.find((c) => c.slug.toLowerCase() === category.toLowerCase());

  if (!posts || posts.length === 0) {
    if (!catObj) notFound();
  }

  const categoryTitle = catObj ? catObj.name : category.replace('-', ' ').toUpperCase();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: categoryTitle }]} />

      <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
          Category Archive
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">{categoryTitle}</h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          {catObj?.description || `Explore our comprehensive, rate-checked guides and calculators under ${categoryTitle}.`}
        </p>
      </div>

      <AdSlot position="header" slotId="category-top" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/${category}/${post.slug}`}
            className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between"
          >
            <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
              <Image
                src={post.cover_image || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
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

                <h2 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mt-1">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                <span className="text-slate-500 font-mono">{post.published_at?.split('T')[0] || post.created_at.split('T')[0]}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
