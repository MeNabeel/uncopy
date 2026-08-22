'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAdminPosts, getCategories } from '@/lib/db/posts';
import { Post, Category } from '@/types/blog';
import { 
  FileText, 
  CheckCircle, 
  FileClock, 
  FolderTree, 
  Eye, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Sparkles,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getAdminPosts(),
          getCategories(),
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Failed to fetch admin metrics', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.published).length;
  const draftPosts = posts.filter((p) => !p.published).length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unstory CMS Dashboard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Financial Content Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage articles, draft reviews, optimize SEO scores, and deploy updates.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="px-5 py-3 rounded-xl gradient-emerald text-slate-950 font-extrabold text-xs shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Article</span>
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Posts</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-100">{totalPosts}</div>
          <div className="text-[10px] text-slate-500 font-mono">All Articles</div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Published</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">{publishedPosts}</div>
          <div className="text-[10px] text-slate-500 font-mono">Live on Website</div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Drafts</span>
            <FileClock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-400">{draftPosts}</div>
          <div className="text-[10px] text-slate-500 font-mono">Unpublished</div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Categories</span>
            <FolderTree className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono text-cyan-400">{categories.length}</div>
          <div className="text-[10px] text-slate-500 font-mono">Active Taxonomies</div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Views</span>
            <Eye className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-100">{totalViews.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 font-mono">Cumulative Readers</div>
        </div>
      </div>

      {/* Recent Posts Table */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-100">Recent Articles</h3>
            <p className="text-xs text-slate-400">Overview of latest articles and status</p>
          </div>
          <Link href="/admin/posts" className="text-xs font-bold text-emerald-400 hover:underline">
            View All Posts →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5 rounded-l-xl">Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Author</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                    Loading recent articles...
                  </td>
                </tr>
              ) : recentPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                    No articles found. Click "Create New Article" to write your first post.
                  </td>
                </tr>
              ) : (
                recentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-200">
                      <div className="line-clamp-1">{post.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono font-normal">/{post.slug}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] uppercase bg-slate-900 text-emerald-400 border border-slate-800">
                        {post.category?.name || 'General'}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                        post.published 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400">{post.author?.name || 'Admin'}</td>
                    <td className="p-3.5 text-slate-500 font-mono">{post.published_at?.split('T')[0] || post.created_at.split('T')[0]}</td>
                    <td className="p-3.5 text-right space-x-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-emerald-400 border border-slate-800 inline-block"
                        title="Edit Article"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                      {post.published && (
                        <Link
                          href={`/${post.category?.slug}/${post.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800 inline-block"
                          title="View Live"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
