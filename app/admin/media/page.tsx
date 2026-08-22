'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Image as ImageIcon, UploadCloud, Copy, Check, Trash2 } from 'lucide-react';

export default function MediaLibraryPage() {
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [mediaList, setMediaList] = useState<Array<{ name: string; url: string }>>([
    { name: 'credit-card-hero.jpg', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80' },
    { name: 'loan-calculator-bg.jpg', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80' },
    { name: 'index-funds-chart.jpg', url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80' },
  ]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setMediaList((prev) => [
        { name: file.name, url: publicUrlData.publicUrl },
        ...prev,
      ]);
    } catch (err: any) {
      alert(`Upload error: ${err.message || 'Ensure Supabase Storage bucket "blog-images" exists.'}`);
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Supabase Media Library</h2>
          <p className="text-xs text-slate-400">Upload and manage image assets hosted on Supabase Storage</p>
        </div>

        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
          />
          <button className="px-5 py-2.5 rounded-xl gradient-emerald text-slate-950 font-bold text-xs shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2">
            <UploadCloud className="w-4 h-4" />
            <span>{uploading ? 'Uploading Asset...' : 'Upload Image'}</span>
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaList.map((item, idx) => (
          <div key={idx} className="glass-card rounded-3xl overflow-hidden border border-slate-800 group flex flex-col justify-between">
            <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
              <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>

            <div className="p-4 space-y-3">
              <div className="text-xs font-bold text-slate-200 truncate" title={item.name}>
                {item.name}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(item.url)}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:text-emerald-400 flex items-center justify-center gap-1 transition-colors"
                >
                  {copiedUrl === item.url ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
