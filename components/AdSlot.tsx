'use client';

import React, { useState } from 'react';
import { ExternalLink, Info, ShieldAlert } from 'lucide-react';

interface AdSlotProps {
  position?: 'header' | 'in-article' | 'sidebar' | 'sticky-bottom';
  slotId?: string;
  className?: string;
}

export default function AdSlot({ position = 'in-article', slotId = '0000000000', className = '' }: AdSlotProps) {
  const [closed, setClosed] = useState(false);

  if (closed && position === 'sticky-bottom') return null;

  if (position === 'header') {
    return (
      <div className={`w-full max-w-5xl mx-auto my-4 ${className}`}>
        <div className="relative overflow-hidden rounded-xl bg-slate-900/60 border border-slate-800 p-4 text-center group transition-all">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-1">
            <span className="flex items-center gap-1"><Info className="w-3 h-3 text-emerald-400" /> SPONSORED ADVERTISEMENT</span>
            <span>Google AdSense Ready • Header Banner (728x90)</span>
          </div>
          <div className="h-16 flex items-center justify-center rounded bg-slate-950/80 border border-dashed border-slate-800 group-hover:border-emerald-500/30 transition-colors">
            <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-mono">Ad Slot #{slotId}</span>
              <span>Premium Finance Partners & Credit Offers</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (position === 'sidebar') {
    return (
      <div className={`w-full my-6 ${className}`}>
        <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-3">
            <span>SPONSORED</span>
            <span>AdSlot #{slotId}</span>
          </div>
          <div className="min-h-[250px] rounded-xl bg-slate-950 flex flex-col items-center justify-center p-6 text-center border border-dashed border-slate-800">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-200 mb-1">Looking for Low Interest Loans?</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">Compare top pre-approved personal loan rates starting at 8.99% p.a.</p>
            <button className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors w-full">
              Check Eligibility (Sponsored)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (position === 'sticky-bottom') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 shadow-2xl flex items-center justify-between text-xs text-slate-300 px-4 md:px-8">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[10px]">AD</span>
          <span className="hidden sm:inline text-slate-400">Sponsored:</span>
          <span className="font-medium text-slate-200">Zero annual fee reward credit cards with 5% cashback on all travel bookings.</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors">
            Apply Now
          </button>
          <button
            onClick={() => setClosed(true)}
            className="text-slate-500 hover:text-slate-300 p-1 text-sm font-mono"
            aria-label="Close Ad"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  // Default: In-Article Rectangle
  return (
    <div className={`my-8 w-full ${className}`}>
      <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
          <span>ADVERTISEMENT</span>
          <span>Google AdSense Banner (In-Article)</span>
        </div>
        <div className="min-h-[120px] rounded-lg bg-slate-950/90 border border-dashed border-slate-800/80 flex items-center justify-center p-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-semibold text-slate-400 block">AdSense Slot ID: {slotId}</span>
            <span className="text-xs text-slate-500 block">Targeted financial offer banner automatically rendered here</span>
          </div>
        </div>
      </div>
    </div>
  );
}
