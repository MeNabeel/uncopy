'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Mail, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl gradient-emerald flex items-center justify-center text-slate-950 font-extrabold shadow-lg">
                <TrendingUp className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-xl font-black text-slate-100">
                Unstory<span className="text-emerald-400">.</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unstory is a static-first financial media platform delivering unbiased credit card reviews, loan comparison guides, and wealth building strategies.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Optimized for Cloudflare Pages</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/credit-cards" className="hover:text-emerald-400 transition-colors">Credit Card Reviews</Link></li>
              <li><Link href="/personal-loans" className="hover:text-emerald-400 transition-colors">Personal Loan Guides</Link></li>
              <li><Link href="/investing" className="hover:text-emerald-400 transition-colors">Index Funds & Stocks</Link></li>
              <li><Link href="/budgeting" className="hover:text-emerald-400 transition-colors">Budgeting & Savings</Link></li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Financial Tools</h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-slate-400 hover:text-emerald-400 cursor-pointer">Loan EMI Calculator</span></li>
              <li><span className="text-slate-400 hover:text-emerald-400 cursor-pointer">Credit Card Finder</span></li>
              <li><span className="text-slate-400 hover:text-emerald-400 cursor-pointer">Compound Interest Tool</span></li>
              <li><span className="text-slate-400 hover:text-emerald-400 cursor-pointer">Sitemap & Feed</span></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Stay Ahead in Finance</h4>
            <p className="text-xs text-slate-400 mb-3">Get our weekly breakdown of high-yield credit offers and interest rate moves.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" /> Subscribe Free
              </button>
            </form>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-3 leading-relaxed">
          <p>
            <strong>Financial Disclaimer:</strong> Unstory is an independent educational finance publication. The information provided does not constitute personalized investment advice or credit endorsement. Rates, terms, and terms are subject to change by financial institutions without notice. Always verify card rewards and loan APRs directly with issuer disclosures.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 text-[10px] text-slate-600">
            <span>© {new Date().getFullYear()} Unstory. All rights reserved. Built with Next.js 15 & MDX.</span>
            <span>Unstory Platform - Built for financial clarity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
