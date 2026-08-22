'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAdminPosts } from '@/lib/db/posts';
import { createClient } from '@/lib/supabase/client';
import { Post, PostStatus } from '@/types/blog';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Eye, 
  Trash2, 
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function PostsManagementPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getAdminPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleTogglePublish = async (post: Post) => {
    try {
      const supabase = createClient();
      const newPublished = !post.published;
      const newStatus: PostStatus = newPublished ? 'published' : 'draft';

      await supabase
        .from('posts')
        .update({
          published: newPublished,
          status: newStatus,
          published_at: newPublished ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', post.id);

      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, published: newPublished, status: newStatus } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const supabase = createClient();
      await supabase.from('posts').delete().eq('id', deleteId);
      setPosts((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category?.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'published') return matchesSearch && post.published;
    if (filterStatus === 'draft') return matchesSearch && !post.published;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Posts & Articles Management</h2>
          <p className="text-xs text-slate-400">View, edit, filter, and publish articles across all financial categories</p>
        </div>

        <Link
          href="/admin/posts/new"
          className="px-5 py-2.5 rounded-xl gradient-emerald text-slate-950 font-bold text-xs shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Post</span>
        </Link>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs w-full sm:w-auto">
          {[
            { id: 'all', label: `All (${posts.length})` },
            { id: 'published', label: `Published (${posts.filter((p) => p.published).length})` },
            { id: 'draft', label: `Drafts (${posts.filter((p) => !p.published).length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterStatus === tab.id
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or category..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      {/* Posts Table Container */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5 rounded-l-xl">Article Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Views</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500 font-mono">
                    Loading post catalog...
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500 font-mono">
                    No matching posts found.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-200">
                      <div className="line-clamp-1">{post.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono font-normal">/{post.slug}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] uppercase bg-slate-900 text-emerald-400 border border-slate-800">
                        {post.category?.name || 'Category'}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold cursor-pointer transition-colors ${
                          post.published
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="p-3.5 text-slate-400 font-mono">{(post.views || 0).toLocaleString()}</td>
                    <td className="p-3.5 text-slate-500 font-mono">{post.published_at?.split('T')[0] || post.created_at.split('T')[0]}</td>
                    <td className="p-3.5 text-right space-x-1.5">
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
                      <button
                        onClick={() => setDeleteId(post.id)}
                        className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800 inline-block"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 max-w-sm w-full space-y-4 border border-slate-800 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-100">Delete Post?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to delete this article? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-slate-950 font-bold text-xs transition-colors"
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
