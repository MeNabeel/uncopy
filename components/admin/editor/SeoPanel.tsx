'use client';

import React from 'react';
import { Post, FaqItem } from '@/types/blog';
import { analyzeSeo } from '@/lib/seo/analyzer';
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, Plus, Trash2, HelpCircle } from 'lucide-react';

interface SeoPanelProps {
  post: Partial<Post>;
  onChange: (fields: Partial<Post>) => void;
}

export default function SeoPanel({ post, onChange }: SeoPanelProps) {
  const seoAnalysis = analyzeSeo(post);

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedFaqs = [...(post.faq_items || [])];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    onChange({ faq_items: updatedFaqs });
  };

  const addFaq = () => {
    onChange({
      faq_items: [...(post.faq_items || []), { question: '', answer: '' }],
    });
  };

  const removeFaq = (index: number) => {
    const updatedFaqs = [...(post.faq_items || [])];
    updatedFaqs.splice(index, 1);
    onChange({ faq_items: updatedFaqs });
  };

  return (
    <div className="space-y-8">
      {/* Real-time SEO Score & Checklist Header */}
      <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">SEO & Search Performance</span>
            <h3 className="text-xl font-bold text-slate-100">Search Engine Score & On-Page Audit</h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-black font-mono text-emerald-400">{seoAnalysis.score}/100</div>
              <div className="text-[10px] text-slate-500 font-mono">SEO Quality Score</div>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold font-mono text-lg border ${
              seoAnalysis.score >= 80 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : seoAnalysis.score >= 50
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
              {seoAnalysis.score}
            </div>
          </div>
        </div>

        {/* Real-time Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
          {seoAnalysis.checks.map((check, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                check.passed
                  ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300'
                  : check.type === 'warning'
                  ? 'bg-amber-500/5 border-amber-500/20 text-slate-400'
                  : 'bg-rose-500/5 border-rose-500/20 text-slate-400'
              }`}
            >
              {check.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : check.type === 'warning' ? (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-semibold text-slate-200">{check.label}</div>
                {check.detail && <div className="text-[11px] text-slate-500 mt-0.5">{check.detail}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Basic SEO Metadata Controls */}
      <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-slate-200">SEO Metadata Controls</h4>

        {/* Focus Keyword */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Focus Target Keyword</label>
          <input
            type="text"
            value={post.focus_keyword || ''}
            onChange={(e) => onChange({ focus_keyword: e.target.value })}
            placeholder="e.g. best student credit cards"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Custom SEO Title */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-slate-300">SEO Meta Title</label>
            <span className="font-mono text-slate-500">{post.seo_title?.length || 0} / 60 chars</span>
          </div>
          <input
            type="text"
            value={post.seo_title || ''}
            onChange={(e) => onChange({ seo_title: e.target.value })}
            placeholder="Recommended length: 50-60 characters"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Custom Meta Description */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-slate-300">SEO Meta Description</label>
            <span className="font-mono text-slate-500">{post.seo_description?.length || 0} / 160 chars</span>
          </div>
          <textarea
            rows={3}
            value={post.seo_description || ''}
            onChange={(e) => onChange({ seo_description: e.target.value })}
            placeholder="Recommended length: 140-160 characters"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      {/* AIO (AI Search & Answer Engine Optimization) Panel */}
      <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-100">AI Search & AIO Optimization</h4>
            <p className="text-xs text-slate-400">Optimize content for Perplexity, ChatGPT, and AI Search Snippets</p>
          </div>
        </div>

        {/* AI Summary */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">AI Concise Summary (2-4 sentences)</label>
          <textarea
            rows={3}
            value={post.ai_summary || ''}
            onChange={(e) => onChange({ ai_summary: e.target.value })}
            placeholder="Concise high-density breakdown for AI answer engine indexing..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
          />
        </div>

        {/* Primary Question & Direct Answer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Primary Core Question</label>
            <input
              type="text"
              value={post.primary_question || ''}
              onChange={(e) => onChange({ primary_question: e.target.value })}
              placeholder="e.g. What is the minimum salary for Axis Magnus credit card?"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Direct Definitive Answer</label>
            <input
              type="text"
              value={post.direct_answer || ''}
              onChange={(e) => onChange({ direct_answer: e.target.value })}
              placeholder="e.g. Minimum annual income required is ₹24 Lakhs per annum."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
            />
          </div>
        </div>

        {/* Dynamic FAQ Items Section */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-teal-400" /> FAQ Items (Generates FAQPage JSON-LD Schema)
            </label>
            <button
              type="button"
              onClick={addFaq}
              className="px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold hover:bg-teal-500/20 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add FAQ
            </button>
          </div>

          {(post.faq_items || []).map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 relative group">
              <button
                type="button"
                onClick={() => removeFaq(idx)}
                className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1"
                title="Remove FAQ"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                placeholder="Frequently asked question..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-semibold focus:outline-none focus:border-teal-500/50"
              />
              <textarea
                rows={2}
                value={faq.answer}
                onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                placeholder="Direct clear answer..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-teal-500/50"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
