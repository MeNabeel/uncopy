import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-400 mb-6 flex-wrap gap-y-1">
      <Link href="/" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            {isLast || !item.href ? (
              <span className="text-slate-200 font-medium truncate max-w-[200px] sm:max-w-[300px]">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-emerald-400 capitalize transition-colors">
                {item.label.replace(/-/g, ' ')}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
