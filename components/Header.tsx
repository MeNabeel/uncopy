'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Search, Menu, X, Sparkles, CreditCard, Landmark, Wallet } from 'lucide-react';
import SearchModal from './SearchModal';
import { Post } from '@/types/blog';

interface HeaderProps {
  posts?: Post[];
}

export default function Header({ posts = [] }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl gradient-emerald flex items-center justify-center text-slate-950 font-extrabold shadow-lg group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5 text-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight leading-none">
                  Unstory<span className="text-emerald-400">.</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase">
                  Finance & Credit Media
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
              <Link
                href="/credit-cards"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                Credit Cards
              </Link>
              <Link
                href="/personal-loans"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <Landmark className="w-3.5 h-3.5 text-teal-400" />
                Personal Loans
              </Link>
              <Link
                href="/investing"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                Investing
              </Link>
              <Link
                href="/budgeting"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <Wallet className="w-3.5 h-3.5 text-amber-400" />
                Budgeting
              </Link>
            </nav>

            {/* Search Trigger & Admin CMS Link */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
                aria-label="Search articles"
              >
                <Search className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Search guides...</span>
                <kbd className="hidden sm:inline text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                  ⌘K
                </kbd>
              </button>

              <Link
                href="/admin"
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin CMS</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 md:hidden"
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/80 bg-slate-950 p-4 space-y-2">
            <Link
              href="/credit-cards"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" /> Credit Cards
            </Link>
            <Link
              href="/personal-loans"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              <Landmark className="w-4 h-4 text-teal-400" /> Personal Loans
            </Link>
            <Link
              href="/investing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Investing
            </Link>
            <Link
              href="/budgeting"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              <Wallet className="w-4 h-4 text-amber-400" /> Budgeting
            </Link>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={posts}
      />
    </>
  );
}
