'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Search, Menu, X, Sparkles, CreditCard, Landmark, Wallet } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
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
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl gradient-emerald flex items-center justify-center text-slate-950 font-extrabold shadow-lg group-hover:scale-105 transition-transform shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
              </div>
              <span className="text-lg sm:text-2xl font-black text-slate-100 tracking-tight leading-none">
                Unstory<span className="text-emerald-400">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
              <Link
                href="/credit-cards"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                Credit Cards
              </Link>
              <Link
                href="/personal-loans"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <Landmark className="w-3.5 h-3.5 text-teal-400" />
                Personal Loans
              </Link>
              <Link
                href="/investing"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                Investing
              </Link>
              <Link
                href="/budgeting"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <Wallet className="w-3.5 h-3.5 text-amber-400" />
                Budgeting
              </Link>
            </nav>

            {/* Actions: Search, Theme Toggle, Admin CMS & Mobile Trigger */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
                aria-label="Search articles"
              >
                <Search className="w-4 h-4 text-emerald-400" />
                <span className="hidden md:inline">Search guides...</span>
                <kbd className="hidden lg:inline text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                  ⌘K
                </kbd>
              </button>

              <ThemeToggle />

              <Link
                href="/admin"
                className="hidden sm:flex px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 text-xs font-bold transition-all items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Admin CMS</span>
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
          <div className="md:hidden border-t border-slate-800/80 bg-slate-950 p-4 space-y-2.5">
            <Link
              href="/credit-cards"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" /> Credit Cards
            </Link>
            <Link
              href="/personal-loans"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800"
            >
              <Landmark className="w-4 h-4 text-teal-400" /> Personal Loans
            </Link>
            <Link
              href="/investing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800"
            >
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Investing
            </Link>
            <Link
              href="/budgeting"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800"
            >
              <Wallet className="w-4 h-4 text-amber-400" /> Budgeting
            </Link>

            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold"
              >
                <Search className="w-4 h-4 text-emerald-400" /> Search All Articles
              </button>

              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-emerald text-slate-950 text-xs font-extrabold shadow-md"
              >
                <Sparkles className="w-4 h-4" /> Open Admin CMS
              </Link>
            </div>
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
