import React from 'react';
import { AlertCircle, CheckCircle2, XCircle, Lightbulb, ShieldAlert, Star } from 'lucide-react';
import EmiCalculator from './EmiCalculator';
import AdSlot from './AdSlot';

export function Callout({ type = 'tip', title, children }: { type?: 'tip' | 'warning' | 'info'; title?: string; children: React.ReactNode }) {
  const styles = {
    tip: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      icon: <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0" />,
      defaultTitle: 'Pro Tip',
    },
    warning: {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      icon: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
      defaultTitle: 'Warning',
    },
    info: {
      bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
      icon: <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0" />,
      defaultTitle: 'Financial Note',
    },
  };

  const activeStyle = styles[type] || styles.tip;

  return (
    <div className={`my-6 p-4 rounded-xl border ${activeStyle.bg} flex gap-3 text-sm leading-relaxed`}>
      {activeStyle.icon}
      <div>
        <h5 className="font-bold text-slate-100 mb-1 m-0">{title || activeStyle.defaultTitle}</h5>
        <div className="text-slate-300">{children}</div>
      </div>
    </div>
  );
}

export function ProsCons({ pros = [], cons = [] }: { pros: string[]; cons: string[] }) {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
        <h4 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2 m-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Pros & Strengths
        </h4>
        <ul className="space-y-2 text-sm text-slate-300 p-0 m-0 list-none">
          {pros.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 m-0">
              <span className="text-emerald-400 font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20">
        <h4 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2 m-0">
          <XCircle className="w-5 h-5 text-rose-400" /> Cons & Limitations
        </h4>
        <ul className="space-y-2 text-sm text-slate-300 p-0 m-0 list-none">
          {cons.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 m-0">
              <span className="text-rose-400 font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function KeyTakeaways({ items = [] }: { items: string[] }) {
  return (
    <div className="my-6 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
      <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2 m-0">
        <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" /> Key Takeaways
      </h4>
      <ul className="space-y-2 text-sm text-slate-200 p-0 m-0 list-none">
        {items.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2.5 m-0">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20 shrink-0">
              {idx + 1}
            </span>
            <span className="leading-snug">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const MDXComponents = {
  Callout,
  ProsCons,
  KeyTakeaways,
  EmiCalculator,
  AdSlot,
};

export default MDXComponents;
