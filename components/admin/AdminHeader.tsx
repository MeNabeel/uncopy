'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Plus, Bell, ShieldCheck, User } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function AdminHeader({ onMenuClick, title = 'CMS Control Panel' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-100">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <Link
          href="/admin/posts/new"
          className="px-3.5 py-1.5 rounded-xl gradient-emerald text-slate-950 font-bold text-xs shadow-md hover:shadow-emerald-500/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Post</span>
        </Link>

        {/* Profile Pill */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
          <div className="w-7 h-7 rounded-full gradient-emerald flex items-center justify-center text-slate-950 font-bold text-xs">
            A
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-slate-200 leading-none">Admin</div>
            <div className="text-[10px] text-emerald-400 font-mono">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
