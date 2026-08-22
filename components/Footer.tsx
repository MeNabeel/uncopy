'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 sm:mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Col */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl gradient-emerald flex items-center justify-center text-slate-950 font-extrabold shadow-lg">
                <TrendingUp className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-xl font-black text-slate-100">
                Unstory<span className="text-emerald-400">.</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unstory is a modern multi-topic blog and publishing platform delivering in-depth articles, technology guides, business insights, and editorial stories.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Optimized for Cloudflare & Vercel</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/technology" className="hover:text-emerald-400 transition-colors">Technology & AI</Link></li>
              <li><Link href="/business" className="hover:text-emerald-400 transition-colors">Business & Growth</Link></li>
              <li><Link href="/design" className="hover:text-emerald-400 transition-colors">Design & Product</Link></li>
              <li><Link href="/lifestyle" className="hover:text-emerald-400 transition-colors">Lifestyle & Habits</Link></li>
            </ul>
          </div>

          {/* Tools & Platform */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Platform & Admin</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/admin" className="hover:text-emerald-400 transition-colors font-semibold text-emerald-400">Admin CMS Dashboard</Link></li>
              <li><Link href="/admin/posts/new" className="hover:text-emerald-400 transition-colors">Create New Article</Link></li>
              <li><Link href="/admin/categories" className="hover:text-emerald-400 transition-colors">Manage Categories</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-emerald-400 transition-colors">Sitemap & RSS Feed</Link></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Stay Ahead in Tech & Growth</h4>
            <p className="text-xs text-slate-400 mb-3">Get our weekly breakdown of modern technology trends, design systems, and startup strategies.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" /> Subscribe Free
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-3 leading-relaxed">
          <p>
            <strong>Publication Note:</strong> Unstory is an open digital publishing platform. All content and articles are managed dynamically via Supabase CMS with full editorial control over categories, tags, and articles.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 text-[10px] text-slate-600 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Unstory. All rights reserved. Built with Next.js 15, MDX & Supabase.</span>
            <span>Unstory Platform - Modern Stories Across Every Field</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
