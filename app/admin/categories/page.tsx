'use client';

import React, { useEffect, useState } from 'react';
import { getCategories } from '@/lib/db/posts';
import { createClient } from '@/lib/supabase/client';
import { Category } from '@/types/blog';
import { FolderTree, Plus, Edit3, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!editingId) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
      );
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    try {
      const supabase = createClient();
      if (editingId) {
        await supabase
          .from('categories')
          .update({ name, slug, description, updated_at: new Date().toISOString() })
          .eq('id', editingId);
      } else {
        await supabase.from('categories').insert([{ name, slug, description }]);
      }

      setShowModal(false);
      setName('');
      setSlug('');
      setDescription('');
      setEditingId(null);
      fetchCategories();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const supabase = createClient();
      await supabase.from('categories').delete().eq('id', id);
      fetchCategories();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Category Taxonomies</h2>
          <p className="text-xs text-slate-400">Organize credit card reviews, loan guides, and investment topics</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setName('');
            setSlug('');
            setDescription('');
            setShowModal(true);
          }}
          className="px-4 py-2.5 rounded-xl gradient-emerald text-slate-950 font-bold text-xs shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-12 text-center text-xs text-slate-500 font-mono">
            Loading categories...
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    /{cat.slug}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 border border-slate-800"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-100">{cat.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{cat.description || 'No description provided.'}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Category Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveCategory} className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 border border-slate-800 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100">
              {editingId ? 'Edit Category' : 'Create New Category'}
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Category Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. Crypto & DeFi"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">URL Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="crypto-defi"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief category description for header and search..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl gradient-emerald text-slate-950 font-bold text-xs transition-colors"
              >
                Save Category
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
