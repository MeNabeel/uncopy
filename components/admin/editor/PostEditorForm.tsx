'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCategories } from '@/lib/db/posts';
import { createClient } from '@/lib/supabase/client';
import { Post, Category, PostStatus } from '@/types/blog';
import RichTextEditor from './RichTextEditor';
import SeoPanel from './SeoPanel';
import SocialPreview from './SocialPreview';
import { 
  Save, 
  Eye, 
  Send, 
  ArrowLeft, 
  UploadCloud, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  Loader2,
  FileText,
  Search,
  Share2,
  Smartphone,
  Monitor
} from 'lucide-react';

interface PostEditorFormProps {
  initialPost?: Partial<Post>;
  isEditing?: boolean;
}

export default function PostEditorForm({ initialPost, isEditing = false }: PostEditorFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<'editor' | 'seo' | 'social'>('editor');
  const [saving, setSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [postData, setPostData] = useState<Partial<Post>>({
    title: initialPost?.title || '',
    slug: initialPost?.slug || '',
    excerpt: initialPost?.excerpt || '',
    content: initialPost?.content || '',
    cover_image: initialPost?.cover_image || '',
    cover_image_alt: initialPost?.cover_image_alt || '',
    category_id: initialPost?.category_id || '',
    status: initialPost?.status || 'draft',
    published: initialPost?.published || false,
    featured: initialPost?.featured || false,
    seo_title: initialPost?.seo_title || '',
    seo_description: initialPost?.seo_description || '',
    focus_keyword: initialPost?.focus_keyword || '',
    ai_summary: initialPost?.ai_summary || '',
    key_takeaways: initialPost?.key_takeaways || [],
    primary_question: initialPost?.primary_question || '',
    direct_answer: initialPost?.direct_answer || '',
    faq_items: initialPost?.faq_items || [],
  });

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
      if (!postData.category_id && data.length > 0) {
        setPostData((prev) => ({ ...prev, category_id: data[0].id }));
      }
    }
    loadCategories();
  }, []);

  // Title to Slug Generator
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const autoSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    setPostData((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : autoSlug,
      seo_title: prev.seo_title || title,
    }));
  };

  // Supabase Storage Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setPostData((prev) => ({
        ...prev,
        cover_image: publicUrlData.publicUrl,
        cover_image_alt: prev.cover_image_alt || prev.title,
      }));
    } catch (err: any) {
      alert(`Image upload error: ${err.message || 'Make sure storage bucket "blog-images" exists.'}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (shouldPublish = false) => {
    if (!postData.title || !postData.slug || !postData.content) {
      alert('Please fill out the Title, Slug, and Article Content before saving.');
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const status: PostStatus = shouldPublish ? 'published' : postData.status || 'draft';
      const isPub = shouldPublish ? true : Boolean(postData.published);

      const recordPayload = {
        title: postData.title,
        slug: postData.slug,
        excerpt: postData.excerpt || '',
        content: postData.content,
        cover_image: postData.cover_image || null,
        cover_image_alt: postData.cover_image_alt || null,
        category_id: postData.category_id || null,
        status,
        published: isPub,
        featured: Boolean(postData.featured),
        seo_title: postData.seo_title || postData.title,
        seo_description: postData.seo_description || postData.excerpt,
        focus_keyword: postData.focus_keyword || '',
        ai_summary: postData.ai_summary || '',
        key_takeaways: postData.key_takeaways || [],
        primary_question: postData.primary_question || '',
        direct_answer: postData.direct_answer || '',
        faq_items: postData.faq_items || [],
        updated_at: new Date().toISOString(),
        ...(isPub ? { published_at: new Date().toISOString() } : {}),
      };

      if (isEditing && initialPost?.id) {
        const { error } = await supabase
          .from('posts')
          .update(recordPayload)
          .eq('id', initialPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('posts').insert([recordPayload]);
        if (error) throw error;
      }

      setAutoSaveStatus('Saved just now');
      setTimeout(() => setAutoSaveStatus(null), 3000);

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-100">
              {isEditing ? 'Edit Financial Article' : 'Create New Financial Guide'}
            </h2>
            {autoSaveStatus && (
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" /> {autoSaveStatus}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5 text-amber-400" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-5 py-2 rounded-xl gradient-emerald text-slate-950 font-extrabold text-xs shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>{postData.published ? 'Update & Publish' : 'Publish Article'}</span>
          </button>
        </div>
      </div>

      {/* Main Metadata Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
        {/* Title */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold text-slate-200">Article Title</label>
            <span className="font-mono text-slate-500">{postData.title?.length || 0} characters</span>
          </div>
          <input
            type="text"
            required
            value={postData.title || ''}
            onChange={handleTitleChange}
            placeholder="e.g. Axis Magnus Credit Card Review 2026: Is It Worth the Fee?"
            className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-base font-bold text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Slug & Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">URL Slug</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">/</span>
              <input
                type="text"
                value={postData.slug || ''}
                onChange={(e) => setPostData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="axis-magnus-review"
                className="w-full pl-7 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Category</label>
            <select
              value={postData.category_id || ''}
              onChange={(e) => setPostData((prev) => ({ ...prev, category_id: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Excerpt */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-slate-300">Article Summary Excerpt</label>
            <span className="font-mono text-slate-500">{postData.excerpt?.length || 0} / 160 chars</span>
          </div>
          <textarea
            rows={3}
            value={postData.excerpt || ''}
            onChange={(e) => setPostData((prev) => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Provide a concise 120-160 character summary for cards and search results..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Cover Image Upload */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-emerald-400" /> Cover Image (Supabase Storage)
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="sm:col-span-2 relative border-2 border-dashed border-slate-800 hover:border-emerald-500/40 rounded-2xl p-4 text-center bg-slate-900/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              <div className="space-y-1">
                <UploadCloud className="w-6 h-6 text-emerald-400 mx-auto" />
                <div className="text-xs font-semibold text-slate-200">
                  {uploadingImage ? 'Uploading to Supabase Storage...' : 'Click or Drag & Drop Cover Image'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">PNG, JPG, WEBP up to 5MB</div>
              </div>
            </div>

            {/* Image Preview Box */}
            <div className="h-28 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative flex items-center justify-center text-xs text-slate-500">
              {postData.cover_image ? (
                <img src={postData.cover_image} alt="Cover Preview" className="w-full h-full object-cover" />
              ) : (
                <span>No Image Set</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Workspace Tabs Navbar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('editor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'editor'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Rich Text Content</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'seo'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>SEO & AIO Audit</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'social'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Social Media Cards</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'editor' && (
        <RichTextEditor
          content={postData.content || ''}
          onChange={(html) => setPostData((prev) => ({ ...prev, content: html }))}
        />
      )}

      {activeTab === 'seo' && (
        <SeoPanel
          post={postData}
          onChange={(fields) => setPostData((prev) => ({ ...prev, ...fields }))}
        />
      )}

      {activeTab === 'social' && (
        <SocialPreview
          post={postData}
          onChange={(fields) => setPostData((prev) => ({ ...prev, ...fields }))}
        />
      )}

      {/* Article Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex flex-col p-4 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-100">Live Post Preview</span>
              <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded ${previewDevice === 'desktop' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded ${previewDevice === 'mobile' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPreviewModal(false)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white"
            >
              Close Preview ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pt-6 flex justify-center">
            <div className={`w-full bg-[#0b0f19] p-6 rounded-3xl border border-slate-800 shadow-2xl transition-all ${
              previewDevice === 'mobile' ? 'max-w-sm' : 'max-w-4xl'
            }`}>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-100 mb-4">{postData.title || 'Untitled Post'}</h1>
              <p className="text-sm text-slate-300 mb-6">{postData.excerpt}</p>
              {postData.cover_image && (
                <img src={postData.cover_image} alt="Cover" className="w-full h-64 object-cover rounded-2xl mb-6" />
              )}
              <div
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: postData.content || '<p>No content written yet.</p>' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
