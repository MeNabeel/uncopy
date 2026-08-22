'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { Post } from '@/types/blog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
}

export default function SearchModal({ isOpen, onClose, posts }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredPosts = query.trim() === ''
    ? posts.slice(0, 4)
    : posts.filter((post) => {
        const q = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          (post.category?.name || '').toLowerCase().includes(q) ||
          (post.seo_keywords || []).some((kw) => kw.toLowerCase().includes(q))
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-800 flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cards, APR rates, loan calculators, index funds..."
            className="w-full bg-transparent text-xs sm:text-base font-medium text-slate-100 placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 shrink-0"
            aria-label="Close search"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 sm:p-4 space-y-2.5 sm:space-y-3 flex-1">
          <div className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-500 font-bold px-2">
            {query.trim() === '' ? 'Suggested Financial Guides' : `Found ${filteredPosts.length} Results`}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="p-6 sm:p-8 text-center text-slate-500 text-xs font-mono">
              No matching articles found for "{query}".
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/${post.category?.slug || 'credit-cards'}/${post.slug}`}
                onClick={onClose}
                className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 flex items-center justify-between group transition-colors gap-2"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 truncate">
                      {post.category?.name || 'Category'}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono shrink-0">{post.reading_time}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{post.excerpt}</p>
                </div>

                <div className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all pl-2 shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
