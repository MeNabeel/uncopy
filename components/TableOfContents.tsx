'use client';

import React, { useEffect, useState } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Scan all H2 and H3 elements inside article prose container
    const articleElement = document.querySelector('article');
    if (!articleElement) return;

    const headingNodes = articleElement.querySelectorAll('h2, h3');
    const parsedHeadings: Heading[] = [];

    headingNodes.forEach((node, index) => {
      const el = node as HTMLElement;
      if (!el.id) {
        // Generate an ID from heading text if missing
        el.id = el.textContent
          ? el.textContent
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          : `heading-${index}`;
      }
      parsedHeadings.push({
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      });
    });

    setHeadings(parsedHeadings);

    // ScrollSpy observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -40% 0px' }
    );

    headingNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="rounded-2xl glass-panel p-5 sticky top-24 border border-slate-800 shadow-lg">
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-800/80 text-emerald-400 font-semibold text-sm">
        <List className="w-4 h-4" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-2 text-xs max-h-[70vh] overflow-y-auto pr-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveId(heading.id);
              }}
              className={`block py-1.5 transition-all duration-200 flex items-center gap-1.5 ${
                heading.level === 3 ? 'pl-4 text-slate-400 hover:text-slate-200' : 'font-medium text-slate-300 hover:text-emerald-400'
              } ${
                isActive
                  ? 'text-emerald-400 font-semibold translate-x-1'
                  : ''
              }`}
            >
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
              <span className="truncate">{heading.text}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
