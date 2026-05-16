'use client';
import { useState } from 'react';
import type { PageBlueprint } from '@/types';

interface Props { pages: PageBlueprint[]; }

const pageTypeColors: Record<string, string> = {
  homepage: 'badge-blue',
  service: 'badge-green',
  location: 'badge-purple',
  about: 'badge-yellow',
  contact: 'badge-yellow',
  blog: 'badge-blue',
  faq: 'badge-purple',
  landing: 'badge-green',
};

export default function PagesPanel({ pages }: Props) {
  const [selected, setSelected] = useState(0);
  const page = pages[selected];

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-white mb-4">Page Blueprints</h3>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {pages.map((p, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`flex-shrink-0 px-3 py-1.5 text-xs rounded-lg border transition-all ${
              selected === i
                ? 'border-sky-500 bg-sky-500/10 text-sky-300'
                : 'border-white/10 text-gray-500 hover:border-gray-600'
            }`}
          >
            {p.pageType}
          </button>
        ))}
      </div>

      {page && (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={pageTypeColors[page.pageType] || 'badge-blue'}>{page.pageType}</span>
                <span className="text-gray-600 text-xs">{page.slug}</span>
              </div>
              <h4 className="text-lg font-bold text-white">{page.title}</h4>
              <p className="text-sm text-gray-400 mt-1">{page.h1}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Est. Words</p>
              <p className="text-lg font-bold text-sky-400">{page.estimatedWordCount?.toLocaleString()}</p>
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Meta Description</p>
            <p className="text-sm text-gray-300">{page.metaDescription}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Keywords</p>
            <div className="flex flex-wrap gap-2">
              {page.seoKeywords?.map((kw, i) => (
                <span key={i} className="badge-blue text-xs">{kw}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">Page Sections</p>
            <div className="space-y-3">
              {page.sections?.map((section, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-md bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="text-xs font-medium text-sky-400 uppercase tracking-wider">{section.sectionType}</span>
                  </div>
                  <p className="font-semibold text-gray-200 text-sm mb-1">{section.headline}</p>
                  {section.subheadline && <p className="text-gray-400 text-xs mb-2">{section.subheadline}</p>}
                  <p className="text-gray-500 text-xs leading-relaxed">{section.body}</p>
                  {section.cta && (
                    <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-sky-500/10 border border-sky-500/30 rounded-lg text-sky-300 text-xs">
                      CTA: {section.cta}
                    </div>
                  )}
                  {section.designNotes && (
                    <p className="mt-2 text-xs text-purple-400 italic">Design: {section.designNotes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Conversion Goal</p>
            <p className="text-sm text-green-300">{page.conversionGoal}</p>
          </div>
        </div>
      )}
    </div>
  );
}
