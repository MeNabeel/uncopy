'use client';

import React from 'react';
import Image from 'next/image';
import { Post } from '@/types/blog';
import { Share2, Globe, Twitter } from 'lucide-react';

interface SocialPreviewProps {
  post: Partial<Post>;
  onChange: (fields: Partial<Post>) => void;
}

export default function SocialPreview({ post, onChange }: SocialPreviewProps) {
  const ogTitle = post.og_title || post.title || 'Article Title Preview';
  const ogDesc = post.og_description || post.excerpt || 'Article summary description snippet will appear here...';
  const ogImage = post.og_image || post.cover_image || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80';

  const twitterTitle = post.twitter_title || ogTitle;
  const twitterDesc = post.twitter_description || ogDesc;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-100">Social Open Graph & Twitter Cards</h4>
            <p className="text-xs text-slate-400">Preview how links appear when shared on LinkedIn, Facebook, and Twitter/X</p>
          </div>
        </div>

        {/* Facebook / LinkedIn Open Graph Card Preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
            <Globe className="w-3.5 h-3.5 text-cyan-400" /> Facebook & LinkedIn Open Graph Preview
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl max-w-lg">
            <div className="relative h-44 w-full bg-slate-950">
              <Image src={ogImage} alt="OG Card" fill className="object-cover" />
            </div>
            <div className="p-4 space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase">UNSTORY.PAGES.DEV</div>
              <div className="text-sm font-bold text-slate-100 line-clamp-1">{ogTitle}</div>
              <div className="text-xs text-slate-400 line-clamp-2">{ogDesc}</div>
            </div>
          </div>
        </div>

        {/* Twitter / X Summary Large Image Card Preview */}
        <div className="space-y-3 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
            <Twitter className="w-3.5 h-3.5 text-sky-400" /> Twitter / X Card Preview
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl max-w-lg p-3 space-y-2">
            <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-900">
              <Image src={ogImage} alt="Twitter Card" fill className="object-cover" />
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-100 line-clamp-1">{twitterTitle}</div>
              <div className="text-[11px] text-slate-400 line-clamp-2">{twitterDesc}</div>
              <div className="text-[10px] font-mono text-slate-500">unstory.pages.dev</div>
            </div>
          </div>
        </div>

        {/* Custom Override Inputs */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <h5 className="text-xs font-bold text-slate-300">Custom Social Overrides (Optional)</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Custom OG Title</label>
              <input
                type="text"
                value={post.og_title || ''}
                onChange={(e) => onChange({ og_title: e.target.value })}
                placeholder="Defaults to SEO Title"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Custom OG Description</label>
              <input
                type="text"
                value={post.og_description || ''}
                onChange={(e) => onChange({ og_description: e.target.value })}
                placeholder="Defaults to Excerpt"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
