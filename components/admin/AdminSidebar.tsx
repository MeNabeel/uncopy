'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  FolderTree, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  TrendingUp, 
  X,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function AdminSidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Posts Management', href: '/admin/posts', icon: FileText },
    { label: 'Create New Post', href: '/admin/posts/new', icon: PlusCircle },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { label: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignored
    } finally {
      router.push('/admin/login');
      router.refresh();
    }
  };

  const closeMobile = () => {
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={closeMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-950 border-r border-slate-800/80 
        flex flex-col justify-between p-4 z-50 transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 pt-2">
            <Link href="/admin" onClick={closeMobile} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl gradient-emerald flex items-center justify-center text-slate-950 font-extrabold shadow-lg">
                <TrendingUp className="w-4 h-4 text-slate-950" />
              </div>
              <div>
                <div className="text-base font-black text-slate-100 leading-tight">
                  Unstory<span className="text-emerald-400">.</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">CMS Admin</div>
              </div>
            </Link>
            {setMobileOpen && (
              <button onClick={closeMobile} className="lg:hidden text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className={`
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all
                    ${isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-2 pt-4 border-t border-slate-800/80 px-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-emerald-400 hover:bg-slate-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> View Live Website
            </span>
            <span className="text-[10px] font-mono bg-slate-900 px-1.5 py-0.5 rounded text-slate-500">Live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 border border-transparent transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
