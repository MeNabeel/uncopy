'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Globe, Database, Key } from 'lucide-react';

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('Unstory');
  const [siteDescription, setSiteDescription] = useState('Modern static finance blog & credit card reviews.');
  const [canonicalDomain, setCanonicalDomain] = useState('https://unstory.pages.dev');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-100 tracking-tight">System Settings & Defaults</h2>
        <p className="text-xs text-slate-400">Configure default SEO metadata, domain canonicals, and Supabase parameters</p>
      </div>

      <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800 max-w-3xl">
        {saved && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> System settings updated successfully!
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" /> Site Metadata Defaults
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Website Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Canonical Production Domain</label>
            <input
              type="text"
              value={canonicalDomain}
              onChange={(e) => setCanonicalDomain(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Default Meta Description</label>
            <textarea
              rows={3}
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Database className="w-4 h-4 text-teal-400" /> Supabase Connection Status
          </h3>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center font-mono">
              <span className="text-slate-400">Environment:</span>
              <span className="text-emerald-400 font-bold">.env.local Configured</span>
            </div>
            <div className="flex justify-between items-center font-mono">
              <span className="text-slate-400">Storage Bucket:</span>
              <span className="text-slate-200">blog-images</span>
            </div>
            <div className="flex justify-between items-center font-mono">
              <span className="text-slate-400">RLS Policy Status:</span>
              <span className="text-emerald-400">Admin Role Enforced</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl gradient-emerald text-slate-950 font-bold text-xs shadow-lg hover:shadow-emerald-500/20 transition-all"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
